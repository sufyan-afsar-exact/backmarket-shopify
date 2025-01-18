import axios from "axios";
import { BACKMARKET_API_URL, BACKMARKET_CREDS } from "../config/config";
import { shopify } from "..";

// 🏷️ Define BackMarket product interface
interface BackMarketProduct {
  id: string;
  sku: string;
  quantity: number;
}

export class QuantityMappingService {
  
  // 🛒 Handle Shopify Inventory Updates
  public async handleShopifyInventoryUpdate(): Promise<void> {
    try {
      const products = await shopify.product.list();

      if (products.length === 0) {
        console.warn("No products found in Shopify.");
        return;
      }

      //  Process each product in parallel
      await Promise.all(
        products.map(async (product: any) => {
          const variant = product.variants[0];
          const shopifySku = variant.sku;
          const quantity = variant.inventory_quantity;

          if (!shopifySku) {
            console.warn(`Missing SKU for product: ${product.title}`);
            return;
          }

          const result = await this.mapShopifySkuToBackMarketSkus(shopifySku, quantity);
          console.log(result);
        })
      );

    } catch (error) {
      console.error("Error during Shopify inventory update:", error);
      throw new Error("Shopify inventory update failed.");
    }
  }

  //  Map Shopify SKU to BackMarket and update inventory
  private async mapShopifySkuToBackMarketSkus(shopifySku: string, quantity: number): Promise<string> {
    try {
      const response = await axios.get(`${BACKMARKET_API_URL}/bm/catalog/listings`, {
        headers: {
          Authorization: `Basic ${BACKMARKET_CREDS}`,
          Accept: "application/json",
          "Accept-Language": "fr-fr",
        },
        params: { sku: shopifySku },
      });

      if (![200, 201].includes(response.status)) {
        console.error(`Failed to fetch BackMarket SKUs for ${shopifySku}. Status: ${response.status}`);
        return `Failed to fetch BackMarket SKUs for SKU: ${shopifySku}`;
      }

      const backMarketProducts: { count: number; results: BackMarketProduct[] } = response.data;

      if (backMarketProducts.count === 0) {
        console.warn(`No BackMarket products found for SKU: ${shopifySku}`);
        return `No BackMarket products found for SKU: ${shopifySku}`;
      }

      // ⚡ Update all matched BackMarket SKUs in parallel
      await Promise.all(
        backMarketProducts.results.map(product =>
          this.updateBackMarketInventory(product.id, quantity)
        )
      );

      return `Updated ${backMarketProducts.count} BackMarket listings for SKU: ${shopifySku}`;

    } catch (error) {
      console.error(`Error mapping Shopify SKU to BackMarket: ${error}`);
      return `Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}`;
    }
  }

  //  Update BackMarket inventory
  private async updateBackMarketInventory(productId: string, quantity: number): Promise<void> {
    try {
      const updateUrl = `${BACKMARKET_API_URL}/ws/listings/${productId}`;
      const payload = { quantity };

      const response = await axios.post(updateUrl, payload, {
        headers: {
          Authorization: `Basic ${BACKMARKET_CREDS}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (![200, 201].includes(response.status)) {
        console.error(`Failed to update inventory for ${productId}. Status: ${response.status}`);
        return;
      }

      console.log(`✅ Successfully updated BackMarket inventory for product ID: ${productId} with quantity: ${quantity}`);

    } catch (error) {
      console.error(`Error updating BackMarket inventory for product ID: ${productId}`, error);
    }
  }
}
import axios from "axios";
import { BACKMARKET_API_URL, BACKMARKET_HEADERS } from "../config/config";
import { shopify } from "..";

interface BackMarketProduct {
  id: string;
  sku: string;
  quantity: number;
}

export class QuantityMappingService {
  // 🛠️ Handle Shopify inventory sync
  public async handleShopifyInventoryUpdate(args:any|null): Promise<any> {
    const products = await shopify.product.list();

    if (products.length === 0) {
      console.warn("No products found in Shopify.");
      return { success: false, message: "No products found in Shopify." };
    }

    const results = await Promise.all(
      products.map(async (product: any) => {
        const variant = product.variants[0];
        const shopifySku = variant.sku;
        const shopifyQuantity = variant.inventory_quantity;

        if (!shopifySku) {
          console.warn(`⚠️ Missing SKU for product: ${product.title}`);
          return { success: false, message: `Missing SKU for product: ${product.title}` };
        }

        const result = await this.mapShopifySkuToBackMarketSkus(shopifySku, shopifyQuantity);
        return result;
      })
    );

    return {
      success: true,
      message: "Inventory update process completed.",
      details: results,
    };
  }

  // 🔄 Map Shopify SKU to BackMarket SKUs and update
  private async mapShopifySkuToBackMarketSkus(shopifySku: string, shopifyQuantity: number): Promise<any> {
    try {
      const response = await axios.get(`${BACKMARKET_API_URL}/bm/catalog/listings`, {
        headers: BACKMARKET_HEADERS,
        params: { sku: shopifySku },
      });

      if (![200, 201].includes(response.status)) {
        console.error(`❌ Failed to fetch BackMarket SKUs for ${shopifySku}.`);
        return { success: false, message: `Failed to fetch BackMarket SKUs for SKU: ${shopifySku}` };
      }

      const backMarketProducts: { count: number; results: BackMarketProduct[] } = response.data;

      if (backMarketProducts.count === 0) {
        console.warn(`⚠️ No BackMarket products found for SKU: ${shopifySku}`);
        return { success: false, message: `No BackMarket products found for SKU: ${shopifySku}` };
      }

      const updateResults = await Promise.all(
        backMarketProducts.results.map(product =>
          this.updateBackMarketInventory(product.id, product.quantity, shopifyQuantity)
        )
      );

      return {
        success: true,
        message: `Processed ${backMarketProducts.count} BackMarket listings for SKU: ${shopifySku}`,
        updates: updateResults,
      };

    } catch (error) {
      console.error(`❌ Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}`, error);
      return { success: false, message: `Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}` };
    }
  }

  // 📦 Update BackMarket inventory with proper response
  private async updateBackMarketInventory(productId: string, backMarketQuantity: number, shopifyQuantity: number): Promise<any> {
    try {
      if (backMarketQuantity === shopifyQuantity) {
        console.log(`✔️ No update needed for product ID: ${productId}`);
        return { productId, updated: false, message: `No update needed for product ID: ${productId}` };
      }

      const updateUrl = `${BACKMARKET_API_URL}/ws/listings/${productId}`;
      const payload = { quantity: shopifyQuantity };

      const response = await axios.post(updateUrl, payload, {
        headers: BACKMARKET_HEADERS,
      });

      if (![200, 201].includes(response.status)) {
        console.error(`❌ Failed to update inventory for product ID: ${productId}`);
        return { productId, updated: false, message: `Failed to update inventory for product ID: ${productId}` };
      }

      console.log(`✅ Successfully updated product ID: ${productId} to quantity: ${shopifyQuantity}`);
      return { productId, updated: true, message: `Updated product ID: ${productId} to quantity: ${shopifyQuantity}` };

    } catch (error) {
      console.error(`❌ Error updating inventory for product ID: ${productId}`, error);
      return { productId, updated: false, message: `Error updating inventory for product ID: ${productId}` };
    }
  }
}

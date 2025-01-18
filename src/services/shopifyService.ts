import { shopify } from "..";

export class ShopifyService {

  // Reusable method to handle product listing fetch
  private async fetchProductListings(): Promise<any> {
    try {
      const products = await shopify.product.list();
      if (products.length === 0) {
        return {
          success: false,
          message: "❌ No products found",
        };
      }
      return {
        success: true,
        data: products,
      };
    } catch (error: any) {
      console.error("❌ Error fetching products:", error.message);
      return {
        success: false,
        message: "❌ Failed to fetch product listings. Please try again later.",
      };
    }
  }

  // Show Shopify Product Listings
  public async showProductListing(): Promise<any> {
    return await this.fetchProductListings();
  }

  // Check Shopify Product Listings (similar to showProductListing, just for testing purposes here)
  public async checkShopifyAPI(): Promise<any> {
    return await this.fetchProductListings();
  }
}
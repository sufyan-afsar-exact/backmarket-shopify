import axios from "axios";
import { BACKMARKET_API_URL, BACKMARKET_HEADERS } from "../config/config";

export class BackMarketService {
  // ✅ Reusable method to fetch product listings
  private async fetchProductListings(): Promise<any> {
    return await axios.get(`${BACKMARKET_API_URL}/ws/listings`, {
      headers: BACKMARKET_HEADERS,
    });
  }

  // 📦 Fetch and display BackMarket product listings
  public async showProductListing(): Promise<any> {
    try {
      const response = await this.fetchProductListings();

      if (response.status === 200) {
        return {
          success: true,
          data: {
            result: response.data.results,
          },
        };
      } else {
        console.warn(`⚠️ API responded with status: ${response.status}`);
        return {
          success: false,
          message: `Failed to fetch product listings. Status code: ${response.status}`,
        };
      }
    } catch (error: any) {
      console.error("❌ Error fetching product listings:", error.message);
      return {
        success: false,
        message: "Error fetching product listings. Please try again later.",
      };
    }
  }

  // 🔍 Check BackMarket API connectivity
  public async checkBackMarketAPI(): Promise<void> {
    try {
      const response = await this.fetchProductListings();

      if (response.status === 200) {
        console.log(`✅ Successfully connected to BackMarket API. Status: ${response.status}`);
      } else {
        console.warn(`⚠️ BackMarket API responded with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("❌ Failed to connect to BackMarket API:", error.message);
      throw new Error("Unable to connect to BackMarket API. Check your credentials.");
    }
  }
}
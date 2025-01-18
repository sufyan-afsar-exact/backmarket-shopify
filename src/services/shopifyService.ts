import axios from "axios";
import { BACKMARKET_API_URL, BACKMARKET_CREDS } from "../config/config";
import { shopify } from "..";

export class BackMarketService {
  public async showProductListing(): Promise<any> {
    try {
      const products = await shopify.product.list();
      if(products.length === 0) {
        return {
          success: false,
          message: "Failed to fetch product listing",
        };
      } else {
        return {
          success: true,
          data: {
            products,
          }
        }
      }
      
    } catch (error) {
      const typedError = error as Error;
      console.error("Invalid BackMarket API Token:", typedError.message);
      throw new Error("Invalid BackMarket API Token");
    }
  }
  public async checkBackMarketAPI(): Promise<any> {
    try {
      const products = await shopify.product.list();
      if(products.length === 0) {
        return {
          success: false,
          message: "Failed to fetch product listing",
        };
      } else {
        return {
          success: true,
          data: {
            products,
          }
        }
      }
      
    } catch (error) {
      const typedError = error as Error;
      console.error("Invalid BackMarket API Token:", typedError.message);
      throw new Error("Invalid BackMarket API Token");
    }
  }
  
}

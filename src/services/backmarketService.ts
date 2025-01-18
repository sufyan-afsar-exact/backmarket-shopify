import axios from "axios";
import { BACKMARKET_API_URL, BACKMARKET_CREDS } from "../config/config";

export class BackMarketService {
  public async showProductListing(): Promise<any> {
    try {
      const response = await axios.get(`${BACKMARKET_API_URL}/listings`, {
        headers: {
          Authorization: `Basic ${BACKMARKET_CREDS}`, // Use generated token
          Accept: "application/json",
          "Accept-Language": "fr-fr",
        },
      });
      if(response.status === 200) {
        return {
            success: true,
            data: {
              result: response.data.results,
            },
          };
      }else{
        return {
            success: false,
            message: "Failed to fetch product listing",
          };
      }
      
    } catch (error) {
      const typedError = error as Error;
      console.error("Invalid BackMarket API Token:", typedError.message);
      throw new Error("Invalid BackMarket API Token");
    }

}

// Function to check BackMarket API connection using product listing endpoint
public async checkBackMarketAPI(){
    try {
      const response = await axios.get(`${BACKMARKET_API_URL}/listings`, {
        headers: {
          'Authorization': `Basic ${BACKMARKET_CREDS}`,  // Use generated token
          'Accept': 'application/json',
          'Accept-Language': 'fr-fr'
        }
      });
      console.log(`Connected to BackMarket API : ${response.status}`);
    } catch (error) {
      const typedError = error as Error;
      console.error('Invalid BackMarket API Token:', typedError.message);
      throw new Error('Invalid BackMarket API Token');
    }
  };
}


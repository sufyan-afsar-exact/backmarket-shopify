import Shopify from 'shopify-api-node';
import app from './app';

import dotenv from 'dotenv';
import { BACKMARKET_API_URL, BACKMARKET_CREDS, SHOPIFY_API_TOKEN, SHOPIFY_SHOP_NAME } from './config/config';
import axios from 'axios';
dotenv.config();
const PORT = process.env.PORT

const shopify = new Shopify({
    shopName: SHOPIFY_SHOP_NAME,
    accessToken: SHOPIFY_API_TOKEN
  });

  // Shopify connection check
shopify.shop.get()
.then(shop => {
  console.log(`Connected to Shopify store: ${shop.name}`);
})
.catch(err => {
  console.error('Failed to connect to Shopify:', err.message);
});

// Function to check BackMarket API connection using product listing endpoint
const checkBackMarketAPI = async () => {
  try {
    const response = await axios.get(`${BACKMARKET_API_URL}/listings`, {
      headers: {
        'Authorization': `Basic ${BACKMARKET_CREDS}`,  // Use generated token
        'Accept': 'application/json',
        'Accept-Language': 'fr-fr'
      }
    });
    console.log(`Connected to BackMarket API : ${response.status}`);
    console.log(response.data);
    return response.data;

  } catch (error) {
    const typedError = error as Error;
    console.error('Invalid BackMarket API Token:', typedError.message);
    throw new Error('Invalid BackMarket API Token');
  }
};


// Call BackMarket API check
checkBackMarketAPI();
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
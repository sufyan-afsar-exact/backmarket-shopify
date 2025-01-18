import Shopify from 'shopify-api-node';
import app from './app';
import dotenv from 'dotenv';
import { SHOPIFY_API_TOKEN, SHOPIFY_SHOP_NAME } from './config/config';

import { BackMarketService } from './services/backmarketService';
dotenv.config();
const PORT = process.env.PORT

export const shopify = new Shopify({
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
// Call BackMarket API check
new BackMarketService().checkBackMarketAPI()
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
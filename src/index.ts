import Shopify from 'shopify-api-node';
import app from './app';
import dotenv from 'dotenv';
import { SHOPIFY_API_TOKEN, SHOPIFY_SHOP_NAME } from './config/config';
import { QuantityMappingService } from './services/quantityMappingService';
import { BackMarketService } from './services/backmarketService';

dotenv.config();

const PORT = process.env.PORT || 3000; // Default port if undefined

// Validate critical environment variables
if (!SHOPIFY_SHOP_NAME || !SHOPIFY_API_TOKEN) {
  console.error("❌ Missing Shopify credentials. Please check environment variables.");
  process.exit(1);
}

// Initialize Shopify
export const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  accessToken: SHOPIFY_API_TOKEN
});

//  Start Application
async function startApp() {
  try {
    //  Check Shopify connection
    const shop = await shopify.shop.get();
    console.log(`✅ Connected to Shopify store: ${shop.name}`);

    //  Check BackMarket API
    await new BackMarketService().checkBackMarketAPI();

    //  Start Shopify Inventory Sync
    await new QuantityMappingService().handleShopifyInventoryUpdate();

    //  Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

  } catch (error: any) {
    console.error(`❌ Error during startup: ${error.message}`);
    process.exit(1);
  }
}

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('🛑 Server is shutting down...');
  process.exit(0);
});

startApp();
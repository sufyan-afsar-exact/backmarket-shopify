// Load environment variables
import dotenv from 'dotenv';
import express from 'express';
import Shopify from 'shopify-api-node';
import routes from './routes';
import { SHOPIFY_API_TOKEN, SHOPIFY_SHOP_NAME } from './config/config';
import { QuantityMappingService } from './services/quantityMappingService';
import { BackMarketService } from './services/backmarketService';
dotenv.config();
// Constants
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Shopify app!');
});

app.get('/ping', (req, res) => {
  res.send('pong 🏓')
});


// API Routes
app.use('/api', routes);

// Validate Shopify Credentials
function validateEnv() {
  if (!SHOPIFY_SHOP_NAME || !SHOPIFY_API_TOKEN) {
    console.error('❌ Missing Shopify credentials. Please check environment variables.');
    process.exit(1);
  }
}

// Initialize Shopify
export const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  accessToken: SHOPIFY_API_TOKEN
});


// Start Server
async function startServer(shopify: Shopify) {
  try {
    const shop = await shopify.shop.get();
    console.log(`✅ Connected to Shopify store: ${shop.name}`);

    await new BackMarketService().checkBackMarketAPI();
    await new QuantityMappingService().handleShopifyInventoryUpdate();

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error: any) {
    console.error(`❌ Startup error: ${error.message}`);
    process.exit(1);
  }
}

// Graceful Shutdown
function setupGracefulShutdown() {
  process.on('SIGINT', () => {
    console.log('🛑 Server is shutting down...');
    process.exit(0);
  });
}
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// Main Execution
function main() {
  validateEnv();
  startServer(shopify);
  setupGracefulShutdown();
}

// main();

export default app;
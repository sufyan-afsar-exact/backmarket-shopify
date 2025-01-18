"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopify = void 0;
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const shopify_api_node_1 = __importDefault(require("shopify-api-node"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
// Validate Shopify Credentials
function validateEnv() {
    if (!config_1.SHOPIFY_SHOP_NAME || !config_1.SHOPIFY_API_TOKEN) {
        console.error('❌ Missing Shopify credentials. Please check environment variables.');
        process.exit(1);
    }
}
// Initialize Shopify
exports.shopify = new shopify_api_node_1.default({
    shopName: config_1.SHOPIFY_SHOP_NAME,
    accessToken: config_1.SHOPIFY_API_TOKEN
});
// Start Server
function startServer(shopify) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shop = yield shopify.shop.get();
            console.log(`✅ Connected to Shopify store: ${shop.name}`);
        }
        catch (error) {
            console.error(`❌ Startup error: ${error.message}`);
            process.exit(1);
        }
    });
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
    startServer(exports.shopify);
    setupGracefulShutdown();
}
main();
app.get('/', (req, res) => {
    res.send('Hello, Shopify app!');
});
app.get('/ping', (req, res) => {
    res.send('pong 🏓');
});
// API Routes
app.use('/api', routes_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map
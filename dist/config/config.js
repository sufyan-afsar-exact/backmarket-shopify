"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKMARKET_HEADERS = exports.BACKMARKET_API_URL = exports.BACKMARKET_CREDS = exports.BACKMARKET_API_KEY = exports.SHOPIFY_SHOP_NAME = exports.SHOPIFY_API_TOKEN = exports.SHOPIFY_API_SECRET = exports.SHOPIFY_API_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
exports.SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
exports.SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN || '';
exports.SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME || '';
exports.BACKMARKET_API_KEY = process.env.BACKMARKET_API_KEY || '';
exports.BACKMARKET_CREDS = Buffer.from(`${process.env.BACKMARKET_EMAIL}:${process.env.BACKMARKET_PASSWORD}`).toString('base64');
exports.BACKMARKET_API_URL = process.env.BACKMARKET_API_URL || '';
// Centralized BackMarket API Headers
exports.BACKMARKET_HEADERS = {
    Authorization: `Basic ${exports.BACKMARKET_CREDS}`,
    Accept: 'application/json',
    'Accept-Language': '',
    'Content-Type': 'application/json',
};
//# sourceMappingURL=config.js.map
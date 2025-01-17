
import dotenv from 'dotenv';
dotenv.config();

export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
export const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
export const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN || '';
export const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME || '';
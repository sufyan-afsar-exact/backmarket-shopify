
import dotenv from 'dotenv';
dotenv.config();

export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
export const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
export const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN || '';
export const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME || '';
export const BACKMARKET_API_KEY = process.env.BACKMARKET_API_KEY || '';
export const BACKMARKET_CREDS = Buffer.from(`${process.env.BACKMARKET_EMAIL}:${process.env.BACKMARKET_PASSWORD}`).toString('base64');
export const BACKMARKET_API_URL = process.env.BACKMARKET_API_URL ||'';
// Centralized BackMarket API Headers
export const BACKMARKET_HEADERS = {
    Authorization: `Basic ${BACKMARKET_CREDS}`,
    Accept: 'application/json',
    'Accept-Language': '',
    'Content-Type': 'application/json',
  };




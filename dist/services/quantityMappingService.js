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
exports.QuantityMappingService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const __1 = require("..");
class QuantityMappingService {
    handleShopifySingleProductInventoryUpdate(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const variant = args.variants && args.variants[0];
            if (!variant) {
                throw new Error("❌ No variant data found in the payload.");
            }
            const shopifySku = variant.sku; // Extract SKU
            const shopifyQuantity = variant.inventory_quantity; // Extract inventory quantity
            console.log(`🔎 Extracted SKU: ${shopifySku}, Quantity: ${shopifyQuantity}`);
            const result = yield this.mapShopifySkuToBackMarketSkus(shopifySku, shopifyQuantity);
            return {
                success: true,
                message: "✅ Inventory update process completed.",
                details: result,
            };
        });
    }
    // 🛠️ Handle Shopify inventory sync
    handleShopifyInventoryUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield __1.shopify.product.list();
            if (products.length === 0) {
                console.warn("No products found in Shopify.");
                return { success: false, message: "No products found in Shopify." };
            }
            const results = yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                const variant = product.variants[0];
                const shopifySku = variant.sku;
                const shopifyQuantity = variant.inventory_quantity;
                if (!shopifySku) {
                    console.warn(`⚠️ Missing SKU for product: ${product.title}`);
                    return { success: false, message: `Missing SKU for product: ${product.title}` };
                }
                const result = yield this.mapShopifySkuToBackMarketSkus(shopifySku, shopifyQuantity);
                return result;
            })));
            return {
                success: true,
                message: "Inventory update process completed.",
                details: results,
            };
        });
    }
    // 🔄 Map Shopify SKU to BackMarket SKUs and update
    mapShopifySkuToBackMarketSkus(shopifySku, shopifyQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${config_1.BACKMARKET_API_URL}/bm/catalog/listings`, {
                    headers: config_1.BACKMARKET_HEADERS,
                    params: { sku: shopifySku },
                });
                if (![200, 201].includes(response.status)) {
                    console.error(`❌ Failed to fetch BackMarket SKUs for ${shopifySku}.`);
                    return { success: false, message: `Failed to fetch BackMarket SKUs for SKU: ${shopifySku}` };
                }
                const backMarketProducts = response.data;
                if (backMarketProducts.count === 0) {
                    console.warn(`⚠️ No BackMarket products found for SKU: ${shopifySku}`);
                    return { success: false, message: `No BackMarket products found for SKU: ${shopifySku}` };
                }
                const updateResults = yield Promise.all(backMarketProducts.results.map(product => this.updateBackMarketInventory(product.id, product.quantity, shopifyQuantity)));
                return {
                    success: true,
                    message: `Processed ${backMarketProducts.count} BackMarket listings for SKU: ${shopifySku}`,
                    updates: updateResults,
                };
            }
            catch (error) {
                console.error(`❌ Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}`, error);
                return { success: false, message: `Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}` };
            }
        });
    }
    // 📦 Update BackMarket inventory with proper response
    updateBackMarketInventory(productId, backMarketQuantity, shopifyQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (backMarketQuantity === shopifyQuantity) {
                    console.log(`✔️ No update needed for product ID: ${productId}`);
                    return { productId, updated: false, message: `No update needed for product ID: ${productId}` };
                }
                const updateUrl = `${config_1.BACKMARKET_API_URL}/ws/listings/${productId}`;
                const payload = { quantity: shopifyQuantity };
                const response = yield axios_1.default.post(updateUrl, payload, {
                    headers: config_1.BACKMARKET_HEADERS,
                });
                if (![200, 201].includes(response.status)) {
                    console.error(`❌ Failed to update inventory for product ID: ${productId}`);
                    return { productId, updated: false, message: `Failed to update inventory for product ID: ${productId}` };
                }
                console.log(`✅ Successfully updated product ID: ${productId} to quantity: ${shopifyQuantity}`);
                return { productId, updated: true, message: `Updated product ID: ${productId} to quantity: ${shopifyQuantity}` };
            }
            catch (error) {
                console.error(`❌ Error updating inventory for product ID: ${productId}`, error);
                return { productId, updated: false, message: `Error updating inventory for product ID: ${productId}` };
            }
        });
    }
}
exports.QuantityMappingService = QuantityMappingService;
//# sourceMappingURL=quantityMappingService.js.map
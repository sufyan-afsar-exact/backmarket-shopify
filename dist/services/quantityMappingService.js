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
    // 🛒 Handle Shopify Inventory Updates
    handleShopifyInventoryUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield __1.shopify.product.list();
                if (products.length === 0) {
                    console.warn("No products found in Shopify.");
                    return;
                }
                //  Process each product in parallel
                yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                    const variant = product.variants[0];
                    const shopifySku = variant.sku;
                    const quantity = variant.inventory_quantity;
                    if (!shopifySku) {
                        console.warn(`Missing SKU for product: ${product.title}`);
                        return;
                    }
                    const result = yield this.mapShopifySkuToBackMarketSkus(shopifySku, quantity);
                    console.log(result);
                })));
            }
            catch (error) {
                console.error("Error during Shopify inventory update:", error);
                throw new Error("Shopify inventory update failed.");
            }
        });
    }
    //  Map Shopify SKU to BackMarket and update inventory
    mapShopifySkuToBackMarketSkus(shopifySku, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${config_1.BACKMARKET_API_URL}/bm/catalog/listings`, {
                    headers: config_1.BACKMARKET_HEADERS, // Centralized headers used here
                    params: { sku: shopifySku },
                });
                if (![200, 201].includes(response.status)) {
                    console.error(`Failed to fetch BackMarket SKUs for ${shopifySku}. Status: ${response.status}`);
                    return `Failed to fetch BackMarket SKUs for SKU: ${shopifySku}`;
                }
                const backMarketProducts = response.data;
                if (backMarketProducts.count === 0) {
                    console.warn(`No BackMarket products found for SKU: ${shopifySku}`);
                    return `No BackMarket products found for SKU: ${shopifySku}`;
                }
                // ⚡ Update all matched BackMarket SKUs in parallel
                yield Promise.all(backMarketProducts.results.map(product => this.updateBackMarketInventory(product.id, quantity)));
                return `Updated ${backMarketProducts.count} BackMarket listings for SKU: ${shopifySku}`;
            }
            catch (error) {
                console.error(`Error mapping Shopify SKU to BackMarket: ${error}`);
                return `Error mapping Shopify SKU to BackMarket for SKU: ${shopifySku}`;
            }
        });
    }
    //  Update BackMarket inventory
    updateBackMarketInventory(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUrl = `${config_1.BACKMARKET_API_URL}/ws/listings/${productId}`;
                const payload = { quantity };
                const response = yield axios_1.default.post(updateUrl, payload, {
                    headers: config_1.BACKMARKET_HEADERS, // Centralized headers used here
                });
                if (![200, 201].includes(response.status)) {
                    console.error(`Failed to update inventory for ${productId}. Status: ${response.status}`);
                    return;
                }
                console.log(`✅ Successfully updated BackMarket inventory for product ID: ${productId} with quantity: ${quantity}`);
            }
            catch (error) {
                console.error(`Error updating BackMarket inventory for product ID: ${productId}`, error);
            }
        });
    }
}
exports.QuantityMappingService = QuantityMappingService;
//# sourceMappingURL=quantityMappingService.js.map
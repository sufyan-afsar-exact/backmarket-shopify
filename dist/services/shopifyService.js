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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyService = void 0;
const __1 = require("..");
class ShopifyService {
    // Reusable method to handle product listing fetch
    fetchProductListings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield __1.shopify.product.list();
                if (products.length === 0) {
                    return {
                        success: false,
                        message: "❌ No products found",
                    };
                }
                return {
                    success: true,
                    data: products,
                };
            }
            catch (error) {
                console.error("❌ Error fetching products:", error.message);
                return {
                    success: false,
                    message: "❌ Failed to fetch product listings. Please try again later.",
                };
            }
        });
    }
    // Show Shopify Product Listings
    showProductListing() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetchProductListings();
        });
    }
    // Check Shopify Product Listings (similar to showProductListing, just for testing purposes here)
    checkShopifyAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetchProductListings();
        });
    }
}
exports.ShopifyService = ShopifyService;
//# sourceMappingURL=shopifyService.js.map
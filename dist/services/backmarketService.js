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
exports.BackMarketService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
class BackMarketService {
    // ✅ Reusable method to fetch product listings
    fetchProductListings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(`${config_1.BACKMARKET_API_URL}/ws/listings`, {
                headers: config_1.BACKMARKET_HEADERS,
            });
        });
    }
    // 📦 Fetch and display BackMarket product listings
    showProductListing() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.fetchProductListings();
                if (response.status === 200) {
                    return {
                        success: true,
                        data: {
                            result: response.data.results,
                        },
                    };
                }
                else {
                    console.warn(`⚠️ API responded with status: ${response.status}`);
                    return {
                        success: false,
                        message: `Failed to fetch product listings. Status code: ${response.status}`,
                    };
                }
            }
            catch (error) {
                console.error("❌ Error fetching product listings:", error.message);
                return {
                    success: false,
                    message: "Error fetching product listings. Please try again later.",
                };
            }
        });
    }
    // 🔍 Check BackMarket API connectivity
    checkBackMarketAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.fetchProductListings();
                if (response.status === 200) {
                    console.log(`✅ Successfully connected to BackMarket API. Status: ${response.status}`);
                }
                else {
                    console.warn(`⚠️ BackMarket API responded with status: ${response.status}`);
                }
            }
            catch (error) {
                console.error("❌ Failed to connect to BackMarket API:", error.message);
                throw new Error("Unable to connect to BackMarket API. Check your credentials.");
            }
        });
    }
}
exports.BackMarketService = BackMarketService;
//# sourceMappingURL=backmarketService.js.map
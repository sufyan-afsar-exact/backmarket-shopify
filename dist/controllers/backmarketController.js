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
exports.BackmarketController = void 0;
const backmarketService_1 = require("../services/backmarketService");
const response_wrapper_1 = require("../helpers/response_wrapper");
const quantityMappingService_1 = require("../services/quantityMappingService");
class BackmarketController {
    static showProductListing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const backMarketService = new backmarketService_1.BackMarketService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            return response.ok(yield backMarketService.showProductListing());
        });
    }
    static handleInventoryUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quantityMappingService = new quantityMappingService_1.QuantityMappingService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            return response.ok(yield quantityMappingService.handleShopifyInventoryUpdate());
        });
    }
    static handleInventoryUpdateWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quantityMappingService = new quantityMappingService_1.QuantityMappingService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            const payload = req.body;
            // Log the incoming order data
            console.log("📦 Inventory Updated:", JSON.stringify(payload, null, 2));
            return response.ok(yield quantityMappingService.handleShopifySingleProductInventoryUpdate(Object.assign({}, payload)));
        });
    }
}
exports.BackmarketController = BackmarketController;
//# sourceMappingURL=backmarketController.js.map
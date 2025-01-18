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
exports.shopifyController = void 0;
const response_wrapper_1 = require("../helpers/response_wrapper");
const shopifyService_1 = require("../services/shopifyService");
class shopifyController {
    static showProductListing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopifyService = new shopifyService_1.ShopifyService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            return response.ok(yield shopifyService.showProductListing());
        });
    }
}
exports.shopifyController = shopifyController;
//# sourceMappingURL=shopifyController.js.map
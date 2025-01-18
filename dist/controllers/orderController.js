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
exports.OrderController = void 0;
const response_wrapper_1 = require("../helpers/response_wrapper");
const orderMappeingService_1 = require("../services/orderMappeingService");
class OrderController {
    static handleOrderCreateWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderService = new orderMappeingService_1.OrderService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            const payload = req.body;
            // Log the incoming order data
            console.log("📦 New Order Created:", JSON.stringify(payload, null, 2));
            return response.ok(yield orderService.registerOrderCreateWebhook(Object.assign({}, payload)));
        });
    }
    static viewShopifyOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderService = new orderMappeingService_1.OrderService();
            const response = new response_wrapper_1.ResponseWrapper(res);
            return response.ok(yield orderService.getOrders());
        });
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map
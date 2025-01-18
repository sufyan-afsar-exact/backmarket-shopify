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
exports.OrderService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class OrderService {
    // Function to save order to a file in a temporary directory
    registerOrderCreateWebhook(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use the /tmp directory for saving the orders in a cloud environment
                const tempDirPath = path_1.default.join("/tmp", "order.json");
                let existingOrders = [];
                // Check if the file already exists
                if (fs_1.default.existsSync(tempDirPath)) {
                    const fileContent = fs_1.default.readFileSync(tempDirPath, "utf-8");
                    if (fileContent.trim().length > 0) {
                        existingOrders = JSON.parse(fileContent);
                    }
                }
                else {
                    fs_1.default.writeFileSync(tempDirPath, JSON.stringify([], null, 2)); // Create an empty file if not exists
                }
                const orderWithTimestamp = Object.assign(Object.assign({}, orderData), { saved_at: new Date().toISOString() });
                existingOrders.push(orderWithTimestamp);
                fs_1.default.writeFileSync(tempDirPath, JSON.stringify(existingOrders, null, 2));
                return { success: true, message: "✅ Order saved with timestamp.", data: orderWithTimestamp };
            }
            catch (error) {
                console.error("❌ Error saving order:", error);
                return { success: false, message: "❌ Failed to save order." };
            }
        });
    }
    // Function to view saved orders from the temporary directory
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempDirPath = path_1.default.join("/tmp", "order.json");
                if (!fs_1.default.existsSync(tempDirPath)) {
                    return { success: true, message: "📂 No orders found.", data: [] };
                }
                const fileContent = fs_1.default.readFileSync(tempDirPath, "utf-8");
                const orders = fileContent.trim().length > 0 ? JSON.parse(fileContent) : [];
                return { success: true, message: "📦 Orders retrieved successfully.", data: orders };
            }
            catch (error) {
                console.error("❌ Error reading orders:", error);
                return { success: false, message: "❌ Failed to read orders." };
            }
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderMappeingService.js.map
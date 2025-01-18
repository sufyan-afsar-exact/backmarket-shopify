import fs from "fs";
import path from "path";

export class OrderService {
  // Function to save order to a file in a temporary directory
  public async registerOrderCreateWebhook(orderData: any): Promise<any> {
    try {
      // Use the /tmp directory for saving the orders in a cloud environment
      const tempDirPath = path.join("/tmp", "order.json");
      let existingOrders: any[] = [];

      // Check if the file already exists
      if (fs.existsSync(tempDirPath)) {
        const fileContent = fs.readFileSync(tempDirPath, "utf-8");
        if (fileContent.trim().length > 0) {
          existingOrders = JSON.parse(fileContent);
        }
      } else {
        fs.writeFileSync(tempDirPath, JSON.stringify([], null, 2)); // Create an empty file if not exists
      }

      const orderWithTimestamp = {
        ...orderData,
        saved_at: new Date().toISOString(),
      };

      existingOrders.push(orderWithTimestamp);
      fs.writeFileSync(tempDirPath, JSON.stringify(existingOrders, null, 2));

      return { success: true, message: "✅ Order saved with timestamp.", data: orderWithTimestamp };
    } catch (error) {
      console.error("❌ Error saving order:", error);
      return { success: false, message: "❌ Failed to save order." };
    }
  }

  // Function to view saved orders from the temporary directory
  public async getOrders(): Promise<any> {
    try {
      const tempDirPath = path.join("/tmp", "order.json");

      if (!fs.existsSync(tempDirPath)) {
        return { success: true, message: "📂 No orders found.", data: [] };
      }

      const fileContent = fs.readFileSync(tempDirPath, "utf-8");
      const orders = fileContent.trim().length > 0 ? JSON.parse(fileContent) : [];

      return { success: true, message: "📦 Orders retrieved successfully.", data: orders };
    } catch (error) {
      console.error("❌ Error reading orders:", error);
      return { success: false, message: "❌ Failed to read orders." };
    }
  }
}
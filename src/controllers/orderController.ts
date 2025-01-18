import { ResponseWrapper } from "../helpers/response_wrapper";
import { Request, Response } from "express";
import { OrderService } from "../services/orderMappeingService";

export class OrderController {
  public static async handleOrderCreateWebhook(req: Request, res: Response) {
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    const payload: any = req.body;
    // Log the incoming order data
    
    console.log("📦 New Order Created:", JSON.stringify(payload, null, 2));
    return response.ok(await orderService.registerOrderCreateWebhook({...payload}));
  }

  public static async viewShopifyOrders(req: Request, res: Response) {
    const orderService: OrderService = new OrderService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await orderService.getOrders());
  }
}

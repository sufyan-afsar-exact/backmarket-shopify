import { BackMarketService } from "../services/backmarketService";
import { ResponseWrapper } from "../helpers/response_wrapper";
import { Request, Response } from "express";
import { QuantityMappingService } from "../services/quantityMappingService";

export class BackmarketOrdersController {
  public static async showOrders(req: Request, res: Response) {
    const backMarketService: BackMarketService = new BackMarketService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await backMarketService.showProductListing());
  }

  public static async handleInventoryUpdate(req: Request, res: Response) {
    const quantityMappingService: QuantityMappingService = new QuantityMappingService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await quantityMappingService.handleShopifyInventoryUpdate());
  }

  public static async handleInventoryUpdateWebhook(req: Request, res: Response) {
    const quantityMappingService: QuantityMappingService = new QuantityMappingService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    const payload: any = req.body;
    // Log the incoming order data
    console.log("📦 Inventory Updated:", JSON.stringify(payload, null, 2));
    return response.ok(await quantityMappingService.handleShopifySingleProductInventoryUpdate({...payload}));
  }
}

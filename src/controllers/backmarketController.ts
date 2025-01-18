import { BackMarketService } from "../services/backmarketService";
import { ResponseWrapper } from "../helpers/response_wrapper";
import { Request, Response } from "express";
import { QuantityMappingService } from "../services/quantityMappingService";

export class BackmarketController {
  public static async showProductListing(req: Request, res: Response) {
    const backMarketService: BackMarketService = new BackMarketService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await backMarketService.showProductListing());
  }

  public static async handleInventoryUpdate(req: Request, res: Response) {
    const quantityMappingService: QuantityMappingService = new QuantityMappingService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await quantityMappingService.handleShopifyInventoryUpdate());
  }
}

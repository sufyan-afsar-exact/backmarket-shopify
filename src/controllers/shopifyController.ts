import { ResponseWrapper } from "../helpers/response_wrapper";
import { Request, Response } from "express";
import { ShopifyService } from "../services/shopifyService";

export class shopifyController {
  public static async showProductListing(req: Request, res: Response) {
    const shopifyService: ShopifyService = new ShopifyService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await shopifyService.showProductListing());
  }
}

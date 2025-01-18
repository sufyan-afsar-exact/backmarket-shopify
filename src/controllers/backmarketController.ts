import { BackMarketService } from "../services/backmarketService";
import { ResponseWrapper } from "../helpers/response_wrapper";
import { Request, Response } from "express";

export class BackmarketController {
  public static async showProductListing(req: Request, res: Response) {
    const backMarketService: BackMarketService = new BackMarketService();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.ok(await backMarketService.showProductListing());
  }
}

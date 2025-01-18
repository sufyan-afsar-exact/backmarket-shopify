import { Router } from "express";
import { BackmarketController } from "../controllers/backmarketController";
import { wrapper } from "../helpers/exception_wrapper";
import { shopifyController } from "../controllers/shopifyController";
const router = Router();

router.get(
    "/backmarket/product-listing",
    wrapper(BackmarketController.showProductListing)
  );

  router.get(
    "/shopify/product-listing",
    wrapper(shopifyController.showProductListing)
  );
export default router;

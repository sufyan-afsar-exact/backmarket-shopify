import { Router } from "express";
import { BackmarketController } from "../controllers/backmarketController";
import { wrapper } from "../helpers/exception_wrapper";
import { shopifyController } from "../controllers/shopifyController";
import { OrderController } from "../controllers/orderController";
const router = Router();

router.get(
    "/backmarket/product-listing",
    wrapper(BackmarketController.showProductListing)
  );

  router.get(
    "/shopify/product-listing",
    wrapper(shopifyController.showProductListing)
  );

  router.get(
    "/sync/inventory",
    wrapper(BackmarketController.handleInventoryUpdate)
  );


  router.post(
    "/webhooks/sync/inventory",
    wrapper(BackmarketController.handleInventoryUpdateWebhook)
  );

  router.post(
    "/webhooks/orders/create",
    wrapper(OrderController.handleOrderCreateWebhook)
  );
export default router;

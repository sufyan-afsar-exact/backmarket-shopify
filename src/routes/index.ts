import { Router } from "express";
import { BackmarketController } from "../controllers/backmarketController";
import { wrapper } from "../helpers/exception_wrapper";
import { shopifyController } from "../controllers/shopifyController";
import { OrderController } from "../controllers/orderController";
import { BackmarketOrdersController } from "../controllers/backmarketOrders";
const router = Router();

router.get( 
    "/backmarket/product-listing",
    wrapper(BackmarketController.showProductListing)
  );
  router.get( 
    "/backmarket/sync-orders-to-shopify",
    wrapper(BackmarketOrdersController.showOrders)
  );

  router.get(
    "/shopify/product-listing",
    wrapper(shopifyController.showProductListing)
  );

  router.get(
    "/sync/inventory",
    wrapper(BackmarketController.handleInventoryUpdate)
  );

  router.get(
    "/webhooks/orders/view",
    wrapper(OrderController.viewShopifyOrders)
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

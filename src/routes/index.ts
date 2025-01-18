import { Router } from "express";
import { BackmarketController } from "../controllers/backmarketController";
import { wrapper } from "../helpers/exception_wrapper";
const router = Router();

router.get(
    "/backmarket/product-listing",
    wrapper(BackmarketController.showProductListing)
  );
export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const backmarketController_1 = require("../controllers/backmarketController");
const exception_wrapper_1 = require("../helpers/exception_wrapper");
const shopifyController_1 = require("../controllers/shopifyController");
const router = (0, express_1.Router)();
router.get("/backmarket/product-listing", (0, exception_wrapper_1.wrapper)(backmarketController_1.BackmarketController.showProductListing));
router.get("/shopify/product-listing", (0, exception_wrapper_1.wrapper)(shopifyController_1.shopifyController.showProductListing));
exports.default = router;
//# sourceMappingURL=index.js.map
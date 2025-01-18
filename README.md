# Shopify app with BackMarket

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=3001
   SHOPIFY_API_KEY=XXXXX
   SHOPIFY_API_SECRET=XXXXX
   SHOPIFY_API_TOKEN=XXXXX
   SHOPIFY_SHOP_NAME=XXXXX
   BACKMARKET_API_KEY=XXXXX
   BACKMARKET_EMAIL=XXXXX
   BACKMARKET_PASSWORD=XXXXX
   BACKMARKET_API_URL=XXXXX
   ```

4. Start the application:

   ```bash
   yarn start
   ```
   The server will be running on `http://localhost:3001`.

6. Build the application:

   ```bash
   yarn build
   ```

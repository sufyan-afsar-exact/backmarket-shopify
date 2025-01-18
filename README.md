
# Shopify App with BackMarket

This is a Shopify app built to integrate with BackMarket, designed to process and store orders, manage environment settings, and handle HTTP requests efficiently. The app is structured to use TypeScript, Node.js, and Express, with files stored in a simple JSON format for temporary persistence.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18+)
- **[npm](https://www.npmjs.com/)** or **[yarn](https://yarnpkg.com/)** for managing dependencies

---

## Installation

Follow these steps to get your local development environment up and running:

### 1. Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
yarn install
```

This will install the necessary libraries and packages as defined in the `package.json` file.

### 3. Set up Environment Variables

Create a `.env` file in the root directory to configure environment-specific settings, such as the server's port number.

**Example `.env` file:**

```env
PORT=3001
```

You can add more variables here if needed, depending on the configuration for your project.

### 4. Start the Application

Run the following command to start the app in development mode:

```bash
yarn start
```

The application will start a local server at `http://localhost:3001`.

### 5. Build the Application for Production

To build the application for production (compiling TypeScript into JavaScript), run the following command:

```bash
yarn build
```

This will create a `dist` directory containing the compiled JavaScript files.

---

## Folder Structure

Here’s a breakdown of the project folder structure:

```
shopify-app-backmarket/
│
├── src/
│   ├── assets/
│   │   └── orders.json                # JSON file to store orders
│   │
│   ├── config/
│   │   └── config.ts                  # Configuration file for environment settings
│   │
│   ├── controller/                    # Controller directory for handling HTTP requests
│   │   └── orderController.ts         
│   │   └── backmarketController.ts.ts 
│   │   └── shopifyController.ts.ts    
│   │
│   ├── services/                      # Services directory for business logic
│   │   └── orderMappeingService.ts            # Example service for order-related logic
│   │   └── backmarketService.ts           
│   │   └── quantityMappingService.ts           
│   │   └── shopifyService.ts            
│   │
│   ├── helpers/                       # Helpers for utility functions
│   │   └── exception_wrapper.ts              
│   │   └── response_wrapper.ts             
│   │
│   ├── routes/                        # Routes for API endpoints
│   │   └── index.ts                   # Example routes file for order-related endpoints
│   │
│   └── index.ts                       # Entry point of the application (sets up express server)
├── .env                               # Environment variables file
├── tsconfig.json                      # TypeScript configuration file
├── yarn.lock                          # Yarn lock file (for dependencies)
└── package.json                       # Project dependencies and scripts
```

---

## Project Setup

### Key Files and Directories:

- **`src/assets/orders.json`**: Used for storing orders in a simple JSON file. This file is read and updated by the services.
- **`src/config/config.ts`**: Configuration file for storing environment variables like `PORT`.
- **`src/controller/`**: Contains files responsible for handling requests to the API endpoints.
- **`src/services/`**: Business logic, such as saving and retrieving orders.
- **`src/helpers/`**: Helper utilities for common functions (e.g., file handling).
- **`src/routes/`**: Defines API routes (e.g., order creation, order retrieval).
- **`src/index.ts`**: The entry point that sets up the Express application and initializes the server.
- **`.env`**: Environment variable configuration file for your app (e.g., port number).
- **`tsconfig.json`**: Configuration file for TypeScript to handle code compilation.
- **`package.json`**: Contains project dependencies, scripts, and configuration.

---

## Scripts

The project uses `yarn` as the package manager, and the following scripts are available in `package.json`:

- **`start`**: Runs the application in development mode with `nodemon`, which watches for changes in your TypeScript files and automatically restarts the server.

  ```bash
  yarn start
  ```

- **`build`**: Cleans the `dist` directory (using `rimraf`) and compiles TypeScript files into JavaScript with `tsc`.

  ```bash
  yarn build
  ```

- **`ts.check`**: Runs TypeScript's type-checking to ensure no type errors in the code.

  ```bash
  yarn ts.check
  ```

- **`add-build`**: Stages the generated `dist` folder files for git commit.

  ```bash
  yarn add-build
  ```

- **`test`**: This script is a placeholder. You can later add test scripts or configurations here.

  ```bash
  yarn test
  ```

---

## API Endpoints

### GET `/api/webhooks/orders/view`

### GET `/api/sync/inventory`

### GET `/api/shopify/product-listing`

### GET `/api/backmarket/product-listing`

### POST `/api/webhooks/orders/create`

### POST `/api/webhooks/sync/inventory`

This endpoint is used to create a new order.

## Development Tips

- **Hot Reloading**: While developing, `nodemon` will automatically restart the server whenever you make changes to your code.
- **TypeScript**: This project is written in TypeScript, so you get the benefits of static typing and better editor support. Run `yarn ts.check` to ensure the types are correct.
- **Environment Variables**: Make sure to properly set the environment variables (like `PORT`) in your `.env` file for development.

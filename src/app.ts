
import express from 'express';
import routes from "./routes";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Shopify app!');
});

// Use the user routes
app.use("/api", routes);




export default app;
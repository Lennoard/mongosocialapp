import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.get("/", (_, response) => {
  response.status(200).send("<h1>I am alive!</h1>");
});

app.use(routes);

const port = 3007;

app.listen(port, () => {
  console.log(`Starting at http://localhost:${port}`);
});

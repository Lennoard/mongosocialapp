import express from "express";
import { Response } from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.get("/", (_, response: Response) => {
  response.status(200).send("<h1>I am alive!</h1>");
});

app.use(routes);
// app.use(express.static('auth/signup'));

const port = 3007;

app.listen(port, () => {
  console.log(`Starting at http://localhost:${port}`);
});

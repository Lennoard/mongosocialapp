import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json("Access denied, invalid credentials.");
  }

  const [authType, authValue] = authorization.split(" ");

  if (authType === "Basic") {
    // decodificar user:senha
    // veriicar no banco de dados se usuario e senha estao ok
    // liberar o não a requisicão
    // let data = 'c3RhY2thYnVzZS5jb20=';
    let buff = Buffer.from(authValue, "base64");
    let [email, senha] = buff.toString("ascii").split(":");
    console.log(email, senha);
  }

  if (authType === "Bearer") {
    // Validar o Token para liberar ou não a requisição
  }

  return next();
};

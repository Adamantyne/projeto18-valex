import { NextFunction, Request, Response } from "express";

export default async function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "Unprocessable Entity") {
    return res.status(422).send(error.message);
  } else if (error.type === "unauthorized") {
    return res.status(401).send(error.message);
  } else if (error.type === "Conflict") {
    return res.status(409).send(error.message);
  }

  return res.sendStatus(500);
}

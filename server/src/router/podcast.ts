import { Router } from "express";
import { Request, Response } from "express";

export const podcastRouter: Router = Router();

podcastRouter.post("/", (req: Request, res: Response) => {
  const { body } = req;
  console.log(`body: ${body}`);
  res.status(200).json({
    message: "Podcast created",
    status: 200,
    body: JSON.stringify(body),
  });
});

import { Router } from "express";
import { Request, Response } from "express";
import * as podCostController from "../controllers/podcastController";
const podcastRouter: Router = Router();

type OurResponse = {
  message: string;
  status: number;
  body: any;
};

podcastRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newPodcast = await podCostController.createPodcast(req, res);
    return res.status(200).json({
      message: "Podcast created successfully",
      status: 200,
      body: newPodcast,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
      status: 400,
      body: e,
    });
  }
});

podcastRouter.get("/", async (req: Request, res: Response) => {
  try {
    const podcasts = await podCostController.getPodcasts();
    return res.status(200).json({
      message: "",
      status: 200,
      body: podcasts,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
      status: 400,
      body: e,
    });
  }
});

podcastRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const podcast = await podCostController.getPodcastById(req, res);
    return res.status(200).json({
      message: "",
      status: 200,
      body: podcast,
    });
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
      status: 400,
      body: e,
    });
  }
});

export default podcastRouter;

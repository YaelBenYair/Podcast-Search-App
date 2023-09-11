import { Router } from "express";
import { Request, Response } from "express";
import {
  getByIdPodcast,
  getPodcast,
  postPodcast,
  updatePodcast,
} from "../controllers/podcastController";
import admin from "../middelwares/adminMiddleware";

const podcastRouter: Router = Router();

type OurResponse = {
  message: string;
  status: number;
  body: any;
};

podcastRouter.post("/", admin as any, postPodcast);
podcastRouter.put("/", admin as any, updatePodcast);

// podcastRouter.post("/", postPodcast);

podcastRouter.get("/", getPodcast);

podcastRouter.get("/:id", getByIdPodcast);

export default podcastRouter;

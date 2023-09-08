import { Router } from "express";
import { Request, Response } from "express";
import * as podCostController from "../DAL/podcastDAL";
import {
  getByIdPodcast,
  getPodcast,
  postPodcast,
} from "../controllers/podcastController";
import admin from "../middelwares/adminMiddleware";

const podcastRouter: Router = Router();

type OurResponse = {
  message: string;
  status: number;
  body: any;
};

podcastRouter.post("/", admin as any, postPodcast);
// podcastRouter.post("/", postPodcast);

podcastRouter.get("/", getPodcast);

podcastRouter.get("/:id", getByIdPodcast);

export default podcastRouter;

import { Router } from "express";
import { Request, Response } from "express";
import * as podCostController from "../DAL/podcastDAL";
import {
  getByIdPodcast,
  getPodcast,
  postPodcast,
} from "../controllers/podcastController";

const podcastRouter: Router = Router();

type OurResponse = {
  message: string;
  status: number;
  body: any;
};

podcastRouter.post("/", postPodcast);

podcastRouter.get("/", getPodcast);

podcastRouter.get("/:id", getByIdPodcast);

export default podcastRouter;

import { Router } from "express";
import { Request, Response } from "express";
import * as podCostController from "../DAL/podcastDAL";
import { checkPodcastBodySchema } from "../middelwares/podcastMiddelwate";

const postPodcast = async (req: Request, res: Response) => {
  try {
    const body = checkPodcastBodySchema.parse(req.body);
    const newPodcast = await podCostController.createPodcast(body);
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
};

const getPodcast = async (req: Request, res: Response) => {
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
};

const getByIdPodcast = async (req: Request, res: Response) => {
  try {
    const podcast = await podCostController.getPodcastById(req.params.id);
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
};

export { postPodcast, getPodcast, getByIdPodcast };

//! check if there is an option to reduce the code

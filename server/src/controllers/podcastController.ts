import { Request, Response } from "express";
import * as podCostController from "../DAL/podcastDAL";
import { checkPodcastBodySchema } from "../middelwares/podcastMiddelwate";
import { AuthorizedRequest } from "../interfaces/authInterface";
import { IPodcast } from "../interfaces/podcastInterface";

const postPodcast = async (req: Request | any, res: Response) => {
  try {
    req.body.user = req.user;
    const body = checkPodcastBodySchema.parse(req.body);
    const newPodcast = await podCostController.createPodcast(req.body);
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

const updatePodcast = async (req: Request | any, res: Response) => {
  try {
    req.body.user = req.user;
    const body = checkPodcastBodySchema.partial(req.body);
    console.log(req.body);
    const updatedPodcast = await podCostController.updatePodcast(req.body);
    return res.status(200).json({
      message: "Podcast updated successfully",
      status: 200,
      body: updatedPodcast,
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
    console.log(req.query);
    const { name } = req.query;
    console.log(name);
    const podcasts = await podCostController.getPodcasts(name as string);
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

export { postPodcast, getPodcast, getByIdPodcast, updatePodcast };

//! check if there is an option to reduce the code

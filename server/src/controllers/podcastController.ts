import { Request, Response } from "express";
import Podcast from "../models/Podcast";

const createPodcast = async (req: Request, res: Response) => {
  const podcast = await Podcast.create(req.body);
  return podcast;
};

const getPodcasts = async () => {
  return await Podcast.find({});
};
const getPodcastById = async (req: Request, res: Response) => {
  return await Podcast.findById(req.params.id);
};

export { createPodcast, getPodcastById, getPodcasts };

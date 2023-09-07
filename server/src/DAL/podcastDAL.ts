import { Request, Response } from "express";
import Podcast from "../models/Podcast";
import { IPodcast } from "../interfaces/podcastInterface";

const createPodcast = async (podcastItem: IPodcast) => {
  const podcast = await Podcast.create(podcastItem);
  return podcast;
};

const getPodcasts = async () => {
  return await Podcast.find({});
};
const getPodcastById = async (podcast_id: string) => {
  return await Podcast.findById(podcast_id);
};

export { createPodcast, getPodcastById, getPodcasts };

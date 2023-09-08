import { Request, Response } from "express";
import Podcast from "../models/Podcast";
import { IPodcast } from "../interfaces/podcastInterface";

const createPodcast = async (podcastItem: Partial<IPodcast>) => {
  const podcast = await Podcast.create(podcastItem);
  return podcast;
};

const updatePodcast = async (podcastItem: Partial<IPodcast>) => {
  const podcast = await Podcast.findByIdAndUpdate(
    podcastItem._id,
    podcastItem,
    { returnOriginal: false }
  );
  return podcast;
};
const getPodcasts = async () => {
  return await Podcast.find({});
};
const getPodcastById = async (podcast_id: string) => {
  return await Podcast.findById(podcast_id);
};

export { createPodcast, getPodcastById, getPodcasts, updatePodcast };

//name: string
//$regex: name

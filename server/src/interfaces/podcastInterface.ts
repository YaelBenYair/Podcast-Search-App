export interface IEpisode {
  name: string;
  audioUrl: string;
}

export interface IEpisodeWithId extends IEpisode {
  id: string;
}

export interface IPodcast {
  name: string;
  description?: string;
  imageUrl: string;
  date?: string;
  user?: string;
  likes?: number;
  _id: any;
  episode: IEpisode[];
}

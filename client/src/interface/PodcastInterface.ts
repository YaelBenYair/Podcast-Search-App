export interface IPodcast {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  user: string;
  likes?: number;
  date?: string;
  episode: [
    {
      name: string;
      audioUrl: string;
      _id: string;
    }
  ];
}

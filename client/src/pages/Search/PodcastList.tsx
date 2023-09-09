import { IPodcast } from "../../interface/PodcastInterface";
import Podcast from "./Podcast";

interface IPodcastInterface {
  podcastList: IPodcast[];
}

const PodcastList = (props: IPodcastInterface) => {
  const { podcastList } = props;

  const podcasts = podcastList.map((podcast, index) => {
    return <Podcast key={index} podcast={podcast} />;
  });

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {podcasts}
      </div>
    </>
  );
};

export default PodcastList;

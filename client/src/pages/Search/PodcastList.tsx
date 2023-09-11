import { IPodcast } from "../../interface/PodcastInterface";
import Podcast from "./Podcast";

interface IPodcastInterface {
  podcastList: IPodcast[];
}

const PodcastList = (props: IPodcastInterface) => {
  const { podcastList } = props;

  const podcasts = podcastList.map((podcast, index) => {
    return <Podcast key={podcast._id} podcast={podcast} />;
  });

  return (
    <>
      <div className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl">
        {podcasts}
      </div>
    </>
  );
};

export default PodcastList;

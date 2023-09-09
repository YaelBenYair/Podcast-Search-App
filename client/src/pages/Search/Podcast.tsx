import { IPodcast } from "../../interface/PodcastInterface";

interface IPodcastProps {
  podcast: IPodcast;
  key: number;
}

const Podcast = (props: IPodcastProps): JSX.Element => {
  const { podcast, key } = props;

  return (
    <>
      <div className="max-w-md mb-3 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-48 w-full object-cover md:h-48 md:w-48"
              src={podcast.imageUrl}
              alt="Modern building architecture"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {podcast.name}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {podcast.episode[0].name}
            </a>
            <p className="mt-2 text-slate-500">{podcast.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;

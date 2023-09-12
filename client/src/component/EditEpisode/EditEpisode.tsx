import React, { useCallback, useEffect, useState } from "react";
import {
  IEpisode,
  PODCAST_ACTION,
  usePodcast,
} from "../../context/ContextPodcast";
import { AiOutlineClose } from "react-icons/ai";

const EditEpisode = () => {
  const [episodes, setEpisodes] = useState<Array<IEpisode>>([]);

  const { podcastState, podcastDispatch } = usePodcast();

  const hendleDelete = (url: string) => {
    console.log(url);
    const epis = episodes.filter((episode) => episode.audioUrl !== url);
    console.log(epis);
    setEpisodes([...epis]);
    podcastDispatch({
      type: PODCAST_ACTION.SET_PODCAST_EPISODE,
      episode: epis,
    });
  };

  const handleAddEpisode = () => {
    setEpisodes([...episodes, { name: "", audioUrl: "" }]);
  };

  useEffect(() => {
    setEpisodes(podcastState.episode);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <label className=" mt-3 mb-3">Episode</label>
        <div
          onClick={handleAddEpisode}
          className=" border-b-2 col-span-2 pl-4 pb-1 flex items-center text-lg dark:text-white cursor-pointer"
        >
          +
        </div>
      </div>

      <div>
        {episodes.map((episode, index) => {
          return (
            <>
              <div key={index} className="grid grid-cols-6 gap-3 mt-2">
                <div
                  onClick={() => hendleDelete(episode.audioUrl)}
                  className="flex items-end justify-center cursor-pointer hover:text-gray-500"
                >
                  <AiOutlineClose />
                </div>

                <label className="col-start-2 col-end-3">Name</label>
                <input
                  className="col-end-7 col-span-4 pl-4 pb-1 rounded-lg bg-gray-200 focus:border-gray-700 focus:bg-gray-200  dark:text-black focus:outline-none"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    episodes[index].name = e.target.value;
                    setEpisodes([...episodes]);
                    podcastDispatch({
                      type: PODCAST_ACTION.SET_PODCAST_EPISODE,
                      episode: episodes,
                    });
                  }}
                  value={episode.name}
                  defaultValue={episode.name}
                />
                <label className="col-start-2 col-end-3">audioUrl</label>
                <input
                  className="col-end-7 col-span-4 pl-4 pb-1 mb-3 rounded-lg bg-gray-200 focus:border-gray-700 focus:bg-gray-200  dark:text-black focus:outline-none"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    episodes[index].audioUrl = e.target.value;
                    setEpisodes([...episodes]);
                    podcastDispatch({
                      type: PODCAST_ACTION.SET_PODCAST_EPISODE,
                      episode: episodes,
                    });
                  }}
                  value={episode.audioUrl}
                  defaultValue={episode.audioUrl}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EditEpisode;

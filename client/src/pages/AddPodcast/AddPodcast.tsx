import React, { useCallback, useEffect, useState } from "react";
import { IPodcast } from "../../interface/PodcastInterface";
import { Navigate, useParams } from "react-router";
import { sendQueryRequest, sendRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  IEpisode,
  PODCAST_ACTION,
  usePodcast,
} from "../../context/ContextPodcast";
import InputBase from "../../component/InputBase/InputBase";
import { AiOutlineClose } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { BiImage } from "react-icons/bi";

type Maybe<T> = T | null | undefined;

export default function AddPodcast() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [podcastName, setPodcastName] = useState<string>("");
  const [podcastImg, setPodcastImg] = useState<string>("");
  const [episodes, setEpisodes] = useState<Array<IEpisode>>([]);

  const navigate = useNavigate();

  const { podcastState, podcastDispatch } = usePodcast();

  const podcastId = useParams();

  // console.log(podcastState);

  useEffect(() => {
    podcastDispatch({
      type: PODCAST_ACTION.RESET_PODCAST,
    });
  }, []);

  const hendleDelete = (index: number) => {
    console.log(index);
    const epis = episodes.slice(index + 1);
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

  // const podcast = usePodcastById(podcastId.id);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(podcastState);
    const { _id, ...rest } = podcastState;
    console.log(rest);
    try {
      const { data } = await sendRequest("post", ENDPOINT.PODCAST, rest);
      const { body } = data;
      message.success({
        content: "podcast added successfully",
        duration: 3,
      });
      navigate(`/podcast/${body._id}`);
    } catch (error: any) {
      setError(error);
    }

    // console.log(podcastState);
  };

  useEffect(() => {
    if (error) {
      setError(null);
      message.error({
        content: error.message,
        duration: 3,
      });
    }
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="flex justify-center h-60">
        {podcastState.imageUrl ? (
          <img
            src={podcastState.imageUrl}
            alt=""
            className="h-full w-[90%] object-cover md:h-50 md:w-50"
          />
        ) : (
          <div className="flex justify-center items-center h-full w-[90%] object-cover md:h-50 md:w-50">
            <BiImage size={50} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center col-span-2">
        <div className=" pl-8 md:pl-0 w-full mb-9 ">
          <h1 className="text-2xl font-bold text-gray-600 uppercase">
            {podcastState.name}. <span className="text-xs">new podcast</span>
          </h1>
        </div>

        <form onSubmit={handlesubmit} className="w-[85%]">
          <div className="grid grid-cols-3 gap-4">
            <InputBase
              type="text"
              name="name"
              defaultValue={podcastState.name}
              nameLabel="Podcast Name"
              typeDispatch={PODCAST_ACTION.SET_PODCAST_NAME}
            />
            <InputBase
              type="text"
              name="description"
              defaultValue={podcastState.description}
              nameLabel="Description"
              typeDispatch={PODCAST_ACTION.SET_PODCAST_DESCRIPTION}
            />
            <InputBase
              type="url"
              name="imageUrl"
              defaultValue={podcastState.imageUrl}
              nameLabel="Podcast Image Url"
              typeDispatch={PODCAST_ACTION.SET_PODCAST_IMAGE_URL}
            />

            <label className=" mt-3 mb-3">Episode</label>
            <div
              onClick={handleAddEpisode}
              className=" border-b-2 col-span-2 pl-4 pb-1 flex items-center text-lg dark:text-white cursor-pointer"
            >
              +{/* <GrFormAdd size={20} /> */}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 mt-2">
            {episodes.map((episode, index) => {
              return (
                <>
                  <div
                    onClick={() => hendleDelete(index)}
                    className="flex items-end justify-center cursor-pointer hover:text-gray-500"
                  >
                    <AiOutlineClose />
                  </div>

                  <label className="col-start-2 col-end-3">Name</label>
                  <input
                    className="col-end-7 col-span-4 pl-4 pb-1 rounded-lg bg-gray-200 focus:border-gray-700 focus:bg-gray-200 dark:text-black focus:outline-none"
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
                    className="col-end-7 col-span-4 pl-4 pb-1 mb-3 rounded-lg bg-gray-200 focus:border-gray-700 focus:bg-gray-200 dark:text-black focus:outline-none"
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
                </>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-[30%] h-min p-2 mt-8 rounded-lg bg-slate-400 object-cover hover:bg-slate-600 hover:text-white transition-all"
            >
              Add Podcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

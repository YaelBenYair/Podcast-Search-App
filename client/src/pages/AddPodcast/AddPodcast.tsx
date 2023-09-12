import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { sendRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PODCAST_ACTION, usePodcast } from "../../context/ContextPodcast";
import InputBase from "../../component/InputBase/InputBase";
import { BiImage } from "react-icons/bi";
import EditEpisode from "../../component/EditEpisode/EditEpisode";

// type Maybe<T> = T | null | undefined;

export default function AddPodcast() {
  const [error, setError] = useState<{ message: string } | null>(null);

  const navigate = useNavigate();

  const { podcastState, podcastDispatch } = usePodcast();

  const podcastId = useParams();

  // console.log(podcastState);

  useEffect(() => {
    podcastDispatch({
      type: PODCAST_ACTION.RESET_PODCAST,
    });
  }, []);

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
          </div>

          <EditEpisode />

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-[30%] h-min p-2 my-8 rounded-lg bg-slate-400 object-cover hover:bg-slate-600 hover:text-white transition-all"
            >
              Add Podcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

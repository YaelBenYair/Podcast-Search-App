import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { sendQueryRequest, sendRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PODCAST_ACTION, usePodcast } from "../../context/ContextPodcast";
import InputBase from "../../component/InputBase/InputBase";
import EditEpisode from "../../component/EditEpisode/EditEpisode";

// type Maybe<T> = T | null | undefined;

export default function EditPodcast() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [podcastName, setPodcastName] = useState<string>("");
  const [podcastImg, setPodcastImg] = useState<string>("");

  const navigate = useNavigate();

  const { podcastState, podcastDispatch } = usePodcast();

  const podcastId = useParams();

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await sendQueryRequest(
          "get",
          ENDPOINT.PODCAST + "/" + podcastId.id
        );

        if (response.data.body === undefined || response.data.body === null)
          navigate("/notfound");

        podcastDispatch({
          type: PODCAST_ACTION.SET_PODCAST_SETTINGS,
          _id: response.data.body._id,
          name: response.data.body.name,
          description: response.data.body.description,
          imageUrl: response.data.body.imageUrl,
          user: response.data.body.user,
          likes: response.data.body.likes,
          date: response.data.body.date,
          episode: response.data.body.episode,
        });
        setPodcastName(response.data.body.name);
        setPodcastImg(response.data.body.imageUrl);
      } catch (error: any) {
        message.error(error.message);
      }
    };
    fetchPodcast();
  }, []);

  // const podcast = usePodcastById(podcastId.id);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await sendRequest("put", ENDPOINT.PODCAST, podcastState);
      // const { body } = data;
      message.success({
        content: "podcast updated successfully",
        duration: 3,
      });
      navigate(`/podcast/${podcastState._id}`);
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
        <img
          src={podcastImg}
          alt=""
          className="h-full w-[90%] object-cover md:h-50 md:w-50"
        />
      </div>

      <div className="flex flex-col justify-center items-center col-span-2">
        <div className=" pl-8 md:pl-0 w-full mb-9 ">
          <h1 className="text-2xl font-bold text-gray-600 uppercase">
            {podcastName}. <span className="text-xs">edit</span>
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
              className="w-[20%] h-max p-3 my-5 rounded-lg bg-slate-400 object-cover hover:bg-slate-600 hover:text-white transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { useParams } from "react-router-dom";

// function PodcastPage() {
//   const podcastId = useParams();
//   console.log(podcastId, "podcast");

//   return (
//     <>
//       <div>
//         <h1>PodcastPage</h1>
//       </div>
//     </>
//   );
// }

// export default PodcastPage;

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
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useUser } from "../../context/ContextUser";

type Maybe<T> = T | null | undefined;

export default function PodcastPage() {
  const [error, setError] = useState<{ message: string } | null>(null);

  const navigate = useNavigate();

  const { podcastState, podcastDispatch } = usePodcast();
  const { userState } = useUser();

  const podcastId = useParams();

  // console.log(podcastState);

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
      } catch (error: any) {
        message.error(error.message);
        setError(error);
      }
    };
    fetchPodcast();
  }, []);

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
      <div className="flex justify-center h-max">
        <img
          src={podcastState.imageUrl}
          alt=""
          className="h-full w-[90%] object-cover md:h-50 md:w-50"
        />
      </div>

      <div className="flex flex-col justify-center items-center col-span-2">
        <div className=" pl-8 pr-8 md:pl-0 w-full mb-9 ">
          <h1 className="inline-block text-2xl font-bold text-gray-600 uppercase">
            {podcastState.name}.
          </h1>
          {userState.isAdmin && (
            <div className="inline-block float-right">
              <Link to={`/podcast/edit/${podcastState._id}`}>
                <AiFillEdit size={20} />
              </Link>
            </div>
          )}

          <p className="text-justify">{podcastState.description}</p>
        </div>

        <div className=" pl-2">
          <h1 className="text-2xl font-bold text-gray-500 uppercase">
            Episode
          </h1>
          {podcastState.episode.map((episodeC, index) => {
            return (
              <>
                <div className="grid grid-cols-3 gap-2 border-b-2">
                  <div className="col-start-1 col-end-3 flex items-center">
                    <h1 className=" text-lg font-semibold">{episodeC.name}</h1>
                  </div>
                  <div className="col-end-7 col-span-4 pl-4 pt-2 pr-2 flex items-center">
                    <audio className="mb-3" controls>
                      <source src={episodeC.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

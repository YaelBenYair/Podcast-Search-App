import { IPodcast } from "../../interface/PodcastInterface";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import Popup from "../../component/PopupAudio/Popup";
import PopupAudio from "../../component/PopupAudio/PopupAudio";
import { ILike, USER_ACTION, useUser } from "../../context/ContextUser";
import { AUDIO_ACTION, useAudio } from "../../context/ContextPodcastAudio";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import { sendRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import { message } from "antd";

interface IPodcastProps {
  podcast: IPodcast;
  key: string;
}

const Podcast = (props: IPodcastProps): JSX.Element => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [listLike, setListIsLike] = useState<Array<ILike>>([]);

  const { podcast } = props;

  const { userState, userDidpatch } = useUser();
  const { audioDidpatch } = useAudio();
  console.log(listLike);
  console.log(userState);

  const likeSend = async (likeList: ILike[]) => {
    try {
      const response: any = await sendRequest("put", ENDPOINT.USER_UPDATE, {
        likes: likeList,
      });
      userDidpatch({
        type: USER_ACTION.SET_USER_LIKES,
        likes: response.body.likes,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (userState.access) {
      if (!isLike) {
        let likeList: Array<ILike>;
        if (userState.likes) {
          likeList = [...userState.likes, { podcast: podcast._id }];
        } else {
          likeList = [{ podcast: podcast._id }];
        }
        setListIsLike(likeList);
        likeSend(likeList);
      } else {
        const likeList = userState.likes.filter(
          (item) => item.podcast !== podcast._id
        );
        setListIsLike(likeList);
        likeSend(likeList);
      }
      setIsLike(!isLike);
    } else {
      message.error({
        content: "Log in to like",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    setListIsLike(userState.likes);
  }, []);

  useEffect(() => {
    // Check if userState.likes is defined before using it
    if (userState.likes) {
      const lik = userState.likes.map((item) => {
        if (item.podcast === podcast._id) {
          setIsLike(true);
        }
      });
    }
  }, [userState.likes]);

  return (
    <>
      <div className="max-w-md mb-3 mx-auto md:h-48 bg-white dark:bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className=" w-full object-cover md:object-fill md:h-48 md:h-50 md:w-50"
              src={podcast.imageUrl}
              alt="Modern building architecture"
            />
          </div>
          <div className="p-1 pl-2 pr-2">
            <div
              className=" pb-2 inline-block cursor-pointer"
              onClick={handleLike}
            >
              {isLike ? <FcLike size={20} /> : <FcLikePlaceholder size={20} />}
            </div>
            {userState.isAdmin && (
              <div className="flex float-right justify-end p-1 md:hidden">
                <Link to={`/podcast/edit/${podcast._id}`}>
                  <AiFillEdit size={20} />
                </Link>
              </div>
            )}
            <Link to={`/podcast/${podcast._id}`}>
              <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-gray-300 font-semibold hover:underline">
                {podcast.name}
              </div>
            </Link>
            <h6 className="block mt-1 text-lg leading-tight font-medium text-black dark:text-blue-900">
              {podcast.episode[0].name}
            </h6>
            <p className="mt-2 h-[110px] text-slate-500 dark:text-white md:h-[70px] overflow-auto ... scroll-p-3">
              {podcast.description}
            </p>
          </div>

          <div className="">
            {userState.isAdmin && (
              <div className="hidden md:flex justify-end p-5">
                <Link to={`/podcast/edit/${podcast._id}`}>
                  <AiFillEdit size={20} />
                </Link>
              </div>
            )}

            <div className="md:shrink-0 md:mt-5 flex justify-center items-center md:w-48">
              <button
                onClick={() =>
                  audioDidpatch({
                    type: AUDIO_ACTION.SET_AUDIO_DETAILE,
                    name: podcast.episode[0].name,
                    audioUrl: podcast.episode[0].audioUrl,
                    _id: podcast.episode[0]._id,
                    openModal: true,
                  })
                }
                className="w-[80%] h-max p-3 rounded-lg bg-slate-400 object-cover hover:bg-slate-600 hover:text-white transition-all"
              >
                Listen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;

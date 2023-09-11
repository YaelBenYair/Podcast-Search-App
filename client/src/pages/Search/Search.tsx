import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IPodcast } from "../../interface/PodcastInterface";
import { sendQueryRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import PodcastList from "./PodcastList";
import PopupAudio from "../../component/PopupAudio/PopupAudio";
import { useAudio } from "../../context/ContextPodcastAudio";
import { useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState<string | number>("");
  const [result, setResult] = useState<boolean>(false);
  const [resultPdcast, setResultPdcast] = useState<IPodcast[]>([]);
  const [message, setMessage] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (
    e:
      | React.SyntheticEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log(search);
    try {
      const params = new URLSearchParams();
      params.append("name", String(search));
      const response = await sendQueryRequest("get", ENDPOINT.PODCAST, params);

      if (!response.data.body) throw new Error("no podcast found");

      setResult(true);
      // console.log(response.data.body);
      setSearch("");

      setResultPdcast(response.data.body);
    } catch (e: any) {
      setResult(false);
      // console.log(e);
      setMessage(e.message);
    }
    // const message = <p>{e.message}</p>;
  };

  useEffect(() => {
    const sRequest = async () => {
      const params = new URLSearchParams();
      params.append("name", "");
      const response = await sendQueryRequest("get", ENDPOINT.PODCAST, params);
      setResult(true);
      setResultPdcast(response.data.body);
    };

    sRequest();
  }, []);

  return (
    <>
      <div className="m-8 flex flex-col justify-center items-center mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] relative md:w-[700px]"
        >
          <div className="relativ">
            <input
              type="search"
              placeholder="Search your Podcast"
              value={search}
              className="w-full p-4 rounded-2xl bg-slate-300 dark:bg-gray-700"
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-2xl text-white hover:bg-slate-700 transition-all"
            >
              <AiOutlineSearch />
            </button>
          </div>
          {result && (
            <div className="absolute top-20 p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 border-t-2 dark:border-gray-600 bg-slate-100 dark:bg-gray-700">
              {result ? <PodcastList podcastList={resultPdcast} /> : message}
            </div>
          )}
        </form>
      </div>
      <PopupAudio />
    </>
  );
};

export default Search;

// const [showAudioModal, setShowAudioModal] = useState(false);

// const { audioState } = useAudio();

// const handleAudioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//   setShowAudioModal(true);
// };

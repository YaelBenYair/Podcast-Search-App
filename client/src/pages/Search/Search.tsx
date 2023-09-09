import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IPodcast } from "../../interface/PodcastInterface";
import sendRequest from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import PodcastList from "./PodcastList";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRmYWQ1ZDI2NmQ2NjE1ZDdhZGZmNDEzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjk0Mjk3MTA2LCJleHAiOjE2OTQzODM1MDZ9.sjhxQap9KJ0K9u1_yaG_6dTTkS25ZuQ-5_PweTuhHtM";

const Search = () => {
  const [search, setSearch] = useState<string | number>("");
  const [result, setResult] = useState<boolean>(false);
  const [resultPdcast, setResultPdcast] = useState<IPodcast[]>([]);

  const message = <span>now it's working</span>;

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
    console.log(search);
    try {
      const response = await sendRequest("get", ENDPOINT.PODCAST, token, {
        name: search,
      });
      //! after login page I need to delete the token and enter it again from local storage

      if (!response.data.body) throw new Error("no podcast found");

      setResult(true);
      console.log(response.data.body);

      setResultPdcast(response.data.body);
    } catch (e: any) {
      setResult(false);
      console.log(e);
      const message = <p>{e.message}</p>;
    }

    setSearch("");
  };

  return (
    <>
      <div className="m-8 flex flex-col justify-center items-center mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-[300px] relative md:w-[700px]"
        >
          <div className="relativ">
            <input
              type="search"
              placeholder="Search your Podcast"
              value={search}
              className="w-full p-4 rounded-full bg-slate-300"
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full text-white"
            >
              <AiOutlineSearch />
            </button>
          </div>

          <div className="absolute top-20 p-4 bg-slate-200 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
            {result ? <PodcastList podcastList={resultPdcast} /> : message}
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;

import { PODCAST_ACTION, usePodcast } from "../../context/ContextPodcast";

interface IInput {
  type: string;
  name: string;
  defaultValue: string | undefined;
  nameLabel: string;
  typeDispatch: string;
  //   valueDispatch: string;
}

const InputBase = (props: IInput) => {
  const { type, name, defaultValue, nameLabel, typeDispatch } = props;
  const { podcastDispatch } = usePodcast();

  return (
    <>
      <label>{nameLabel}</label>
      <input
        className="col-span-2 pl-4 pb-1 rounded-lg bg-gray-200 dark:text-gray-800 focus:border-gray-700 focus:bg-gray-200 focus:outline-none overflow-x-auto ..."
        type={type}
        name={name}
        id="name"
        onChange={(e) => {
          podcastDispatch({
            type: typeDispatch,
            valueDispatch: e.target.value,
          });
        }}
        value={defaultValue}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputBase;

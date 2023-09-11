import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export interface IEpisode {
  name: string;
  audioUrl: string;
}

interface IPodcastSettings {
  _id: string;
  name: string;
  description?: string;
  imageUrl: string;
  user: string;
  likes?: number;
  date?: string;
  episode: IEpisode[];
}

interface IPodcastAction {
  type: string;
  _id?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  user?: string;
  likes?: number;
  date?: string;
  valueDispatch?: string;
  episode?: IEpisode[];
}

const PODCAST_SETTINGS_INITIAL_STATE: IPodcastSettings = {
  _id: "",
  name: "",
  description: "",
  imageUrl: "",
  user: "",
  likes: 0,
  date: "",
  episode: [
    {
      name: "",
      audioUrl: "",
    },
  ],
};

export const PODCAST_ACTION = {
  SET_PODCAST_SETTINGS: "SET_PODCAST_SETTINGS",
  SET_PODCAST_NAME: "SET_PODCAST_NAME",
  SET_PODCAST_DESCRIPTION: "SET_PODCAST_DESCRIPTION",
  SET_PODCAST_IMAGE_URL: "SET_PODCAST_IMAGE_URL",
  SET_PODCAST_LIKES: "SET_PODCAST_LIKES",
  SET_PODCAST_DATE: "SET_PODCAST_DATE",
  SET_PODCAST_EPISODE: "SET_PODCAST_EPISODE",
  SET_PODCAST_EPISODE_NAME: "SET_PODCAST_EPISODE_NAME",
  SET_PODCAST_EPISODE_LINK: "SET_PODCAST_EPISODE_LINK",
  RESET_PODCAST: "RESET_PODCAST",
};

function PodcastSettingReducer(
  podcastState: IPodcastSettings,
  action: IPodcastAction
): IPodcastSettings {
  switch (action.type) {
    case PODCAST_ACTION.SET_PODCAST_SETTINGS:
      return {
        ...podcastState,
        _id: action._id!,
        name: action.name!,
        description: action.description,
        imageUrl: action.imageUrl!,
        user: action.user!,
        likes: action.likes,
        date: action.date,
        episode: action.episode!,
      };
    case PODCAST_ACTION.SET_PODCAST_NAME:
      return {
        ...podcastState,
        name: action.valueDispatch!,
      };
    case PODCAST_ACTION.SET_PODCAST_DESCRIPTION:
      return {
        ...podcastState,
        description: action.valueDispatch,
      };
    case PODCAST_ACTION.SET_PODCAST_IMAGE_URL:
      return {
        ...podcastState,
        imageUrl: action.valueDispatch!,
      };
    case PODCAST_ACTION.SET_PODCAST_EPISODE:
      return {
        ...podcastState,
        episode: action.episode!,
      };
    case PODCAST_ACTION.RESET_PODCAST:
      return PODCAST_SETTINGS_INITIAL_STATE;

    default:
      return podcastState;
  }
}

interface IPodcastContextProps {
  podcastState: IPodcastSettings;
  podcastDispatch: Dispatch<IPodcastAction>;
}

const PodcastContext = createContext<IPodcastContextProps | undefined>(
  undefined
);

export const PodcastProvider = ({ children }: { children: ReactNode }) => {
  const [podcastState, dispatch] = useReducer(
    PodcastSettingReducer,
    PODCAST_SETTINGS_INITIAL_STATE
  );

  return (
    <PodcastContext.Provider
      value={{ podcastState, podcastDispatch: dispatch }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("useAudio must be used within a AudioProvider");
  }
  return context;
};

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface IAudioSettings {
  name: string;
  audioUrl: string;
  _id: string;
  openModal?: boolean;
}

interface IAudioAction {
  type: string;
  name?: string;
  audioUrl?: string;
  _id?: string;
  openModal?: boolean;
}

const AUDIO_SETTINGS_INITIAL_STATE: IAudioSettings = {
  name: "",
  audioUrl: "",
  _id: "",
  openModal: false,
};

export const AUDIO_ACTION = {
  SET_AUDIO_DETAILE: "SET_AUDIO_DETAILE",
  SET_OPEN_MODAL: "SET_OPEN_MODAL",
};

function AudioSettingReducer(
  audioState: IAudioSettings,
  action: IAudioAction
): IAudioSettings {
  switch (action.type) {
    case AUDIO_ACTION.SET_AUDIO_DETAILE:
      return {
        ...audioState,
        name: action.name!,
        audioUrl: action.audioUrl!,
        _id: action._id!,
        openModal: action.openModal,
      };

    case AUDIO_ACTION.SET_OPEN_MODAL:
      return {
        ...audioState,
        openModal: action.openModal,
      };

    default:
      return audioState;
  }
}

interface IAudioContextProps {
  audioState: IAudioSettings;
  audioDidpatch: Dispatch<IAudioAction>;
}

const AudioContext = createContext<IAudioContextProps | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioState, dispatch] = useReducer(
    AudioSettingReducer,
    AUDIO_SETTINGS_INITIAL_STATE
  );

  return (
    <AudioContext.Provider value={{ audioState, audioDidpatch: dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within a AudioProvider");
  }
  return context;
};

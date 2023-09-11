import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export interface ILike {
  podcast: string;
}

interface IUserSettings {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  access?: boolean;
  likes: ILike[];
  dark?: boolean;
}

// interface IUserSettingsContextData{
//     userSettings: IUserSettings;
//     setUserSettings: Dispatch<IUserSettings>;
// }

interface IUserAction {
  type: string;
  _id?: string;
  email?: string;
  name?: string;
  isAdmin?: boolean;
  access?: boolean;
  likes?: ILike[];
  dark?: boolean;
}

const USER_SETTINGS_INITIAL_STATE: IUserSettings = {
  _id: "",
  email: "",
  name: "",
  isAdmin: false,
  access: false,
  likes: [],
  dark: false,
};

export const USER_ACTION = {
  SET_USER_SETTINGS: "SET_USER_SETTINGS",
  SET_USER_ACCESS: "SET_USER_ACCESS",
  SET_USER_LIKES: "SET_USER_LIKES",
  SET_USER_DARK_MODE: "SET_USER_DARK_MODE",
};

function UserSettingReducer(
  userState: IUserSettings,
  action: IUserAction
): IUserSettings {
  switch (action.type) {
    case USER_ACTION.SET_USER_SETTINGS:
      return {
        ...userState,
        _id: action._id!,
        email: action.email!,
        name: action.name!,
        isAdmin: action.isAdmin!,
        likes: action.likes!,
      };

    case USER_ACTION.SET_USER_ACCESS:
      return {
        ...userState,
        access: action.access,
      };
    case USER_ACTION.SET_USER_LIKES:
      return {
        ...userState,
        likes: action.likes!,
      };
    case USER_ACTION.SET_USER_DARK_MODE:
      return {
        ...userState,
        dark: action.dark,
      };

    default:
      return userState;
  }
}

interface IUserContextProps {
  userState: IUserSettings;
  userDidpatch: Dispatch<IUserAction>;
}

const UserContext = createContext<IUserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userState, dispatch] = useReducer(
    UserSettingReducer,
    USER_SETTINGS_INITIAL_STATE
  );

  return (
    <UserContext.Provider value={{ userState, userDidpatch: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

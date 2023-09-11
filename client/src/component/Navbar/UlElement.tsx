import { USER_ACTION, useUser } from "../../context/ContextUser";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
//MdDarkMode MdLightMode

interface ITailwindClass {
  tailwindClass: string;
}

const UlElement = (props: ITailwindClass) => {
  const { userState, userDidpatch } = useUser();
  const { isAdmin } = userState;

  const { tailwindClass } = props;

  const token = localStorage.getItem("token");

  return (
    <ul className={tailwindClass}>
      <li className="p-4 w-max hover:underline">
        <Link to={"/"}>HOME</Link>
      </li>
      {isAdmin && (
        <li className="p-4 w-max hover:underline">
          <Link to={"/addPodcast"}>ADD PODCAST</Link>
        </li>
      )}
      <li className="p-4 w-max">
        {token ? (
          <a
            className="hover:underline"
            href=""
            onClick={() => localStorage.clear()}
          >
            LOGOUT
          </a>
        ) : (
          <span>
            <Link className="hover:underline" to={"/login"}>
              LOGIN
            </Link>
            /{" "}
            <Link className="hover:underline" to={"/signup"}>
              SIGNUP
            </Link>
          </span>
        )}
      </li>
      <li
        onClick={() =>
          userDidpatch({
            type: USER_ACTION.SET_USER_DARK_MODE,
            dark: !userState.dark,
          })
        }
        className="flex items-center p-2"
      >
        {userState.dark ? <MdDarkMode /> : <MdLightMode />}
      </li>
    </ul>
  );
};

export default UlElement;

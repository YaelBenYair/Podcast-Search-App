import "./global.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Search from "./pages/Search/Search";
import PodcastPage from "./pages/PodcastPage/PodcastPage";
import Login from "./pages/Login/Login";
import { sendQueryRequest } from "./function/SendRequest";
import { ENDPOINT } from "./urls";
import { useEffect } from "react";
import { USER_ACTION, UserProvider, useUser } from "./context/ContextUser";
import AddPodcast from "./pages/AddPodcast/AddPodcast";
import EditPodcast from "./pages/EditPodcast/EditPodcast";
import SignUp from "./pages/SignUp/SignUp";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/addPodcast",
        element: <AddPodcast />,
      },
      {
        path: "/podcast/:id",
        element: <PodcastPage />,
      },
      {
        path: "/podcast/edit/:id",
        element: <EditPodcast />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

function App() {
  const { userDidpatch, userState } = useUser();

  const sendRequestMe = async () => {
    const response = await sendQueryRequest("get", ENDPOINT.USER);
    const { data } = response;

    console.log(data);
    console.log(response);

    userDidpatch({
      type: USER_ACTION.SET_USER_SETTINGS,
      _id: data.body._id,
      email: data.body.email,
      name: data.body.name,
      isAdmin: data.body.isAdmin,
      likes: data.body.likes,
    });
  };

  useEffect(() => {
    sendRequestMe();
  }, [userState.access]);

  useEffect(() => {
    sendRequestMe();
  }, []);

  useEffect(() => {
    if (userState.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [userState.dark]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

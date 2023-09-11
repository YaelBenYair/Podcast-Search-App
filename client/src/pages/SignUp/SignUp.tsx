import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { sendRequest } from "../../function/SendRequest";
import { ENDPOINT } from "../../urls";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { USER_ACTION, useUser } from "../../context/ContextUser";
import InputLoginSignup from "../../component/InputLoginSignup/InputLoginSignup";

export default function SignUp() {
  const navigate = useNavigate();

  const { userDidpatch } = useUser();

  const [error, setError] = useState<{ message: string } | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlesubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    try {
      const { data } = await sendRequest("post", ENDPOINT.SIGNUP, {
        name: username,
        email,
        password,
      });

      const { body } = data;
      localStorage.setItem("token", body);

      userDidpatch({
        type: USER_ACTION.SET_USER_ACCESS,
        access: true,
      });

      message.success({
        content: "login successfuly",
        duration: 3,
      });

      navigate("/");
    } catch (error: any) {
      setError(error);
    }
  };

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
    <div className="grid h-screen place-items-center">
      <div className="w-[300px] flex flex-col text-center">
        <form
          onSubmit={handlesubmit}
          className="max-w-[400px] w-full mx-auto bg-slate-100 p-8 px-8 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <h1 className="text-4xl font-bold text-gray-700 mb-4">SIGNUP</h1>
          <p className=" text-gray-400">
            Do you have an account?{" "}
            <Link className=" underline hover:text-gray-600" to={"/login"}>
              Login
            </Link>
          </p>

          <InputLoginSignup
            foo={setUsername}
            val={username}
            placeholder="Name"
            type="text"
            name="name"
          />

          <InputLoginSignup
            foo={setEmail}
            val={email}
            placeholder="Email"
            type="email"
            name="email"
          />
          <InputLoginSignup
            foo={setPassword}
            val={password}
            placeholder="password"
            type="password"
            name="password"
          />
          <InputLoginSignup
            foo={setConfirmPassword}
            val={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
          />

          <button className="w-full my-5 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

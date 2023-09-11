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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  const { userDidpatch } = useUser();

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  const [error, setError] = useState<{ message: string } | null>(null);
  const hendlesubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(email);
      const { data } = await sendRequest("post", ENDPOINT.LOGIN, {
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
          onSubmit={hendlesubmit}
          className="max-w-[400px] w-full mx-auto bg-slate-100 p-8 px-8 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <h1 className="text-4xl font-bold text-gray-700 mb-4">LOGIN</h1>
          <p className=" text-gray-400">
            Do not have an account?{" "}
            <Link className=" underline hover:text-gray-600" to={"/signup"}>
              Singup
            </Link>
          </p>

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

          <button className="w-full my-5 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

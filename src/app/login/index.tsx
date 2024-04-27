import { useAppContext } from "context/context";
import { FormEvent, useEffect } from "react";
import { MdMobileScreenShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { appContext } = useAppContext();
  const { isLogin } = appContext;

  useEffect((): void => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate("/confirm");
  };

  return (
    <div className="flex size-full items-center justify-center">
      <form className="flex h-[350px] w-[400px] flex-col justify-between" onSubmit={onSubmit}>
        <h1 className="text-[1.5rem]">
          <strong>
            ENTER REGISTERED
            <br />
            PHONE NUMBER TO START
          </strong>
        </h1>
        <label htmlFor="phoneNumber" className="flex flex-col gap-2">
          <span className="flex w-full">
            <MdMobileScreenShare className="text-[4rem]" />
            <input
              id="phoneNumber"
              type="text"
              defaultValue="0987654321"
              className="w-full border-b-2 border-b-violet-100 bg-transparent text-[1.5rem] outline-none hover:outline-none"
              disabled
            />
          </span>
          <p className="text-[0.9rem] text-[#909090]">
            We'll send verification code on above given number
          </p>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            className="h-[50px] w-[160px] rounded-[50px] bg-glb-color"
            onClick={(): Promise<void> => window.electronAPI.send("CloseApp")}
          >
            <strong>CLOSE</strong>
          </button>
          <button type="submit" className="h-[50px] w-[160px] rounded-[50px] bg-glb-color-active">
            <strong>COUTINUE</strong>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { FormEvent, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ConfirmPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { appContext, appDispatch } = useAppContext();
  const { isLogin } = appContext;

  useEffect((): void => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    appDispatch(AppActionType.LOGIN, {});
    navigate("/");
  };

  return (
    <div className="flex size-full items-center justify-center">
      <form className="flex h-[350px] w-[400px] flex-col justify-between" onSubmit={onSubmit}>
        <h1 className="text-[1.5rem]">
          <MdArrowBack className="cursor-pointer text-[2rem]" onClick={(): void => navigate(-1)} />
          <strong>
            ENTER VERIFICATION CODE
            <br />
            SENT ON GIVEN NUMBER
          </strong>
        </h1>
        <label htmlFor="phoneNumber" className="flex flex-col gap-2">
          <p className="text-[0.9rem] text-[#909090]">ENTER VERIFICATION CODE</p>
          <input
            id="phoneNumber"
            type="text"
            defaultValue="01234"
            className="w-full border-b-2 border-b-violet-100 bg-transparent text-[1.5rem] tracking-[0.5rem] outline-none hover:outline-none"
            disabled
          />
        </label>
        <button type="submit" className="h-[50px] w-[160px] rounded-[50px] bg-glb-color-active">
          <strong>SUBMIT</strong>
        </button>
      </form>
    </div>
  );
};

export default ConfirmPage;

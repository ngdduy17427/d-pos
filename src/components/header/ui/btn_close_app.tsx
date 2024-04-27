import { MdClose } from "react-icons/md";

const ButtonCloseApp = ({ className }: { className?: string }): JSX.Element => {
  return (
    <button
      type="button"
      className={className}
      onClick={(): void => (document.getElementById("dialogCloseApp") as HTMLDialogElement).show()}
    >
      <MdClose />
    </button>
  );
};

export default ButtonCloseApp;

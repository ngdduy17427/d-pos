import { MdClose } from "react-icons/md";

const ButtonCloseApp = ({ className }: { className?: string }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={() => (document.getElementById("dialogCloseApp") as HTMLDialogElement).show()}
    >
      <MdClose />
    </button>
  );
};

export default ButtonCloseApp;

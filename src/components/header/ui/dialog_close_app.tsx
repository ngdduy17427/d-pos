const DialogCloseApp = () => {
  return (
    <dialog id="dialogCloseApp" className="dialog-close-app">
      <div className="dialog-container">
        <strong>Do you want to close this app?</strong>
        <div className="flex gap-4">
          <button
            type="button"
            className="h-[50px] w-[160px] rounded-[50px] bg-black"
            onClick={() => (document.getElementById("dialogCloseApp") as HTMLDialogElement).close()}
          >
            <strong>CANCEL</strong>
          </button>
          <button
            type="button"
            className="bg-glb-color-active h-[50px] w-[160px] rounded-[50px]"
            onClick={() => window.electronAPI.send("CloseApp")}
          >
            <strong>OK</strong>
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogCloseApp;

import { AUDIO_ACTION, useAudio } from "../../context/ContextPodcastAudio";

const PopupAudio = () => {
  const { audioDidpatch, audioState } = useAudio();

  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    console.log(target.id);
    if (target.id === "container") {
      audioDidpatch({
        type: AUDIO_ACTION.SET_OPEN_MODAL,
        openModal: false,
      });
    }
  };

  if (!audioState.openModal) return null;

  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-2 rounded-lg h-[200px] w-[350px] flex flex-col justify-center items-center">
          <h1 className="p-2 py-8 text-lg font-semibold">{audioState.name}</h1>
          <audio className="mb-3" controls>
            <source src={audioState.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </>
  );
};

export default PopupAudio;

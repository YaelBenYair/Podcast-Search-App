interface IAudio {
  name: string;
  audioUrl: string;
  _id: string;
}

const Popup = (props: IAudio) => {
  const { name, audioUrl, _id } = props;

  return (
    <>
      <div>
        <p>{name}</p>
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default Popup;

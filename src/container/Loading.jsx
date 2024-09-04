import "../assets/css/loading.css";

const Loading = ({ forTable = true }) => {
  return (
    <div className={`loading-container ${forTable && "min-height-300"}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;

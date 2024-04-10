import "./loadingSpinner.css";

const Spinner = () => {
  return (
    <div role="status" className="flex justify-center mt-36">
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;

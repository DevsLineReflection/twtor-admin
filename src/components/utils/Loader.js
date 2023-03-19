import React from "react";

function Loader() {
  return (
    <div className="spinner-border spinner-grow-sm text-light " role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loader;

import React from "react";

const App = () => {
  return (
    <>
      <h1>{process.env.APP_NAME}</h1>
      <p>API URL: {process.env.API_URL}</p>
    </>
  );
};

export default App;

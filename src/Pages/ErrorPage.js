// error page for any unidentified url
import React from "react";
import { Monster } from "../Components/Monster";


export const ErrorPage = () => {
  

  return (
    <>
      <div className="d-flex flex-column justify-content-center h-100 w-100 bg-primary">
        <Monster text={"Error 404 You'r on wrong path please go back"}/>
      </div>
    </>
  );
};

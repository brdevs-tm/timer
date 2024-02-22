import React, { Fragment } from "react";
import Timer from "../timer/Timer";

import "./screen.css";

const Screen = () => {
  return (
    <Fragment>
      <main>
        <div className="container ">
          <div className="screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter backdrop-opacity-70 border border-gray-300 rounded-lg p-6 shadow-lg border border-black border-solid py-20 px-20">
            <div className="screen-inner">
              <div className="screen-body">
                <Timer
                  initialHours={1}
                  initialMinutes={30}
                  initialSeconds={0}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Screen;

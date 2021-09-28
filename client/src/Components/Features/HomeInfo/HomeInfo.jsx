import React from "react";
import "./HomeInfo.css";
import { informationForCorses, Collaborations, titles } from "./Information";

export const HomeInfo = () => {
  return (
    <div >
      <div className="title-info">
        <h1>{titles.titleForCorses}</h1>
      </div>
      <br />
      <div className="body-home-info">

        {informationForCorses.map((item, index) => {
          return (
            <div className="body-home-info-cards">
              <div key={index}>

                <img src={item.img} />
                <div className="info">
                  <h3>{item.title}</h3>
                  <p>{item.paragraph}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <div className="title-info">
        <h1>{titles.titleCollaborations}</h1>
      </div>

      <div className="body-home-company">
        {Collaborations.map((item, index) => {
          return (
            <div className="body-home-company-cards">
              <div key={index}>
                <img src={item.img} />
                <div className="info">
                  <p>{item.information}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

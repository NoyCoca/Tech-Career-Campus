import React from "react";
import "./HomeInfo.css";
import { informationForCorses, Collaborations, titles } from "./Information";
import "animate.css";

export const HomeInfo = () => {
  return (
    <div  >
      <div className="title-info">
        <h1>{titles.titleForCorses}</h1>
      </div>
      <br />
      <div className="body-home-info">

        {informationForCorses.map((item, index) => {
          return (
            <div class="animate__animated animate__fadeInUp">
            <div key={index} className="body-home-info-cards">
              
                <img src={item.img} />
                <div className="info">
                  <h1>{item.title}</h1>
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
            <div key={index} className="body-home-company-cards">
              <div >
                <img src={item.img} />
                <div className="info2">
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

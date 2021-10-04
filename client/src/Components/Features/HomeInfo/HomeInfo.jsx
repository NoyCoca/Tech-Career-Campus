import React from "react";
import "./HomeInfo.css";
import { informationForCorses, Collaborations, titles } from "./Information";
import "animate.css";

export const HomeInfo = () => {
  return (
    <div  >
      <div className="title-info">
      <div className="titles">
        <h1>{titles.titleForCorses}</h1>
        <p></p>
        </div>
      </div>
      <br />
      <div className="body-home-info">
      <div className="continer-card">
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
      </div>
      <br />
      <div className="title-info">
        <div className="titles">
        <h1>{titles.titleCollaborations}</h1>
        <p>תהליך המיון בטק-קריירה דומה לתהליך מיון ליחידות מובחרות, ואכן בסופו מתגבשת סיירת מופלאה, מפוצצת בכשרון ועם הרבה אש בעיניים. לכן זה כל כך טבעי שהחברות הכי מתקדמות יעבדו איתנו בשיתוף פעולה צמוד.<br></br><br></br> אלו הן חלק קטן מהחברות:</p>
        </div>
      </div>

      <div className="body-home-company">
        <div className="continer-company">
        {Collaborations.map((item, index) => {
          return (
            <div key={index} className="body-home-company-cards">
              <div >
                <img src={item.img} />
                <div className="info2">
                  {/* <p>{item.information}</p> */}
                </div>
              </div>
            </div>
          );
        })}
</div>
      </div>
    </div>
  );
};

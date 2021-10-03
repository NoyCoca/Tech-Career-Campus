import React from "react";
import "./Home.css";
import Events from "../../Features/Events/EventsComponent";
import News from "../../Features/News/NewsComponent";
import { HomeInfo } from "../../Features/HomeInfo/HomeInfo";

const Home = () => {
  return (
    <>s
    <div className="events">
        <Events />
      </div>
      <div className="news">
        <News />
      </div>
      <div className="homeInfo">
        <HomeInfo />
      </div>
      <div className="line-2"></div>
    </>
  );
};
export default Home;

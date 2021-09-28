import React, { useState, useEffect } from "react";
import "./news.css";
import Ticker from "react-ticker";
import CircularProgress from "@material-ui/core/CircularProgress";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [move, setMove] = useState(true);
  const newsApi = process.env.REACT_APP_NEWS_API;
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    fetch(`${newsApi}${newsApiKey}`)
      .then(response => response.json())
      .then((response) => setNewsData(response?.articles))
      .catch(err => console.log(err))
  }, [newsApi, newsApiKey]);

  console.log(newsData);
  return !newsData.length ? (
    <CircularProgress />

  ) : (
      <div className="BodyNew">
        <div className="news-ticker-div">
          <Ticker speed={20} move={move} height='500' mode="smooth" direction="toRight">
            {({ index }) => (
              <a onMouseEnter={() => setMove(false)} onMouseLeave={() => setMove(true)} rel="noreferrer" target="_blank" href={newsData[index]?.url}>
                <div className="card-news">
                  <div className="card-news-titel">
                    <h1>{newsData[index]?.title}</h1>
                  </div>
                  <img src={newsData[index]?.urlToImage} alt="" />
                  <br />
                  <br />
                  <div className="card-news-span">
                    <h3>{newsData[index]?.description}</h3>
                    <br />
                    <h4>{newsData[index]?.source?.name}</h4>
                  </div>
                </div>
              </a>
            )}
          </Ticker>

        </div>
      </div>


    );
};
export default News;

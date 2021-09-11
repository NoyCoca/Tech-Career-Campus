import React, { useState, useEffect } from "react";
import fetcher from "../../../utils/fetcher";
import Ticker from "react-ticker";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  const newsApi = process.env.REACT_APP_NEWS_API;
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

  // useEffect(() => {
  //   fetch(`${newsApi}${newsApiKey}`)
  //     .then((response) => console.log(response))
  //     .then((response) => setNewsData(response?.articles))
  //     .catch(err=> console.log(err))
  // }, [newsApi, newsApiKey]);


  return (
    <div className="news-ticker-div">
      <Ticker mode="smooth" direction="toRight">
        {({ index }) => (
          <>
            <h1>{newsData[index]?.source?.name}</h1>
            <h1>{newsData[index]?.description}</h1>
            <h1>{newsData[index]?.title}</h1>
            <img src={newsData[index]?.urlToImage} alt="" />
          </>
        )}
      </Ticker>
    </div>
  );
};
export default News;

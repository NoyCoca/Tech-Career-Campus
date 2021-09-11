import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
    return (
      <div className="footerDiv">
        <div className="container">
          <div className="aboutUsClass">
            <div className="about">
              <div className="title1">
                <h2>טק-קריירה</h2>
              </div>
              <ol>
                <li>מרכז הכשרה טכנולוגי,</li>
                <li>לצעירים יוצאי קהילת אתיופיה בישראל</li>
              </ol>
            </div>
            <ul>
              <li>
                <a
                  href="https://www.tech-career.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-tv"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/tech.career/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/school/techcareerisrael/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCVNITxGQ4M_Ze5hxv36B40Q"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="quick-link">
            <div className="title2">
              <h4>לינקים</h4>
            </div>
            <ul className="quick-links">
              <li>
                <Link to={"/news"}>חדשות </Link>
              </li>
              <li>
                <Link to={"/events"}>אירועים </Link>
              </li>
              <li>
                <Link to={"/forum"}>פורום </Link>
              </li>
              <li>
                <Link to={"/my-course"}> הקורס שלי</Link>
              </li>
              <li>
                <Link to={"/class-schedule"}>לו"ז כיתות</Link>
              </li>
            </ul>
          </div>
          <div className="contactUsClass">
            <div className="title2">
              <h4>צור קשר</h4>
            </div>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> בת שבע 3, מתחם טלרד,
                לוד
              </li>
              <li>
                <i className="fas fa-phone"></i> 08-3738000{" "}
              </li>
              <li>
                <i className="far fa-envelope"></i> info@tech-career.org{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="Line"></div>
        <div className="footer">
          <p className="copyright-text">
            Copyright &copy; 2021 All Rights Reserved by
            <a href="#"> David</a>
          </p>
        </div>
      </div>
    );
}
export default Footer;

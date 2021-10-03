import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css";
import {hebrewVariables} from '../../../utils/hebrewVariables'


const Footer = () => {
  return (
    <div className="footerDiv">
      <div className="container">
        <div className="aboutUsClass">
          <div className="about">
            <div className="title1">
              <h2>{hebrewVariables.techCarrer}</h2>
            </div>
            <ol>
              <li>{hebrewVariables.techCarrerDescription1}</li>
              <li>{hebrewVariables.techCarrerDescription2}</li>
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
            <h4>{hebrewVariables.links}</h4>
          </div>
          <ul className="quick-links">
            <li>
              <Link to={"/"}>{hebrewVariables.homePage} </Link>
            </li>
            <li>
              <Link to={"/forum"}>{hebrewVariables.forum} </Link>
            </li>
            <li>
              <Link to={"/my-course"}> {hebrewVariables.myCourse}</Link>
            </li>
            <li>
              <Link to={"/class-schedule"}>{hebrewVariables.classSchedual}</Link>
            </li>
          </ul>
        </div>
        <div className="contactUsClass">
          <div className="title2">
            <h4>{hebrewVariables.contact}</h4>
          </div>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>{hebrewVariables.techAdress}
              </li>
            <li>
              <i className="fas fa-phone"></i> {hebrewVariables.techPhone}
              </li>
            <li>
              <i className="far fa-envelope"></i> {hebrewVariables.techEmail}
              </li>
          </ul>
        </div>
      
      </div>
      <div className="Line"></div>
        <div className="footer">
          <p className="copyright-text">
            Copyright &copy; 2021 All Rights Reserved by
          </p>
        </div>
    </div>
  );
}
export default Footer;

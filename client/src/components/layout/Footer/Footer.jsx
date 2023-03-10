import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import {AiOutlineInstagram,AiOutlineYoutube,AiOutlineFacebook} from 'react-icons/ai'
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>React Calender.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; DMR Developers</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram <AiOutlineInstagram/></a>
        <a href="">Youtube <AiOutlineYoutube/></a>
        <a href="">Facebook <AiOutlineFacebook/></a>
      </div>
    </footer>
  );
};

export default Footer;
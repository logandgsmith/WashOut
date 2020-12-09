import React from "react";
import {FacebookShareButton, TwitterShareButton} from "react-share";
import {FacebookIcon, TwitterIcon} from "react-share"
import "./Footer.css";

const Footer = (props) => {
    let url = "https://washout.herokuapp.com/WashOut";
    let message = `My high score was ${props.hiScore} on Laundr.io's new game WashOut! Can you beat it?`

    return (
        <div className="footer">
            <FacebookShareButton
                url={url}
                appid = {384310982877471}
                quote={message}
                className="share-button">
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
            url={url}
            title={message}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
    )
}

export default Footer;

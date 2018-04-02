import React from 'react';
import './styles.scss';

const Footer = () => (
    <div className="footer">
        <div className="footer-wrapper">
            <div className="footer-content">
                <nav>
                    <a href="#">About us</a>
                    <a href="#">Support</a>
                    <a href="#">Blog</a>
                    <a href="#">Press</a>
                    <a href="#">API</a>
                    <a href="#">Privacy</a>
                </nav>
                <div className="corp">
                    <span href="/">© 2018 Instagram</span>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;

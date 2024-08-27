import React from 'react';
import Styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.links}>
        <p>&copy; {new Date().getFullYear()}</p><a href="https://jikupon1.github.io">dzikraalghufroon.github.io</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
//https://dzikraalghufroon.github.io
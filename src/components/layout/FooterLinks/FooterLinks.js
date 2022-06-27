import React from "react";
import styles from "./FooterLinks.module.css";

const FooterLinks = () => {
  return (
    <div className={styles.footerLinks} role="contentinfo">
      <div className="container">
        <div className="row">
          <p className="justify-content-center pt-3 pr-3">
            <a className={styles.bottomLabel} href="#">
              Note Legali
            </a>
          </p>
          <p className="justify-content-center pt-3 pr-3">
            <a className={styles.bottomLabel} href="#">
              Privacy Policy
            </a>
          </p>
          <p className="justify-content-center pt-3 pr-3">
            <a className={styles.bottomLabel} href="#">
              Dichiarazione di Accessibilità
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

FooterLinks.propTypes = {};

FooterLinks.defaultProps = {};

export default FooterLinks;

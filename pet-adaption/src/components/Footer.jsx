import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="menuItems">
        <li className="menuItem">Terms of Service</li> {/*kullanım şartları*/}
        <li className="menuItem">Privacy Policy</li> {/*gizlilik politikası*/}
        <li className="menuItem">About</li> {/*hakkımızda*/}
      </ul>
      <div className="infoText">
        AdoptBuddy brings together animal lovers and brings together animals in a
        warm It helps them find a home and also provides a reliable service to
        those who want to adopt them. platform offers. By checking out PetAdopt
        now, you too can become a best friend. You can adopt or find a new home
        for your friend.
      </div>
    </footer>
  );
};

export default Footer;

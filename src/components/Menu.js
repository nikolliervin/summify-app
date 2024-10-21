// src/components/Menu.js

import React from 'react';
import '../styles/Menu.css'; 

const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Menu;

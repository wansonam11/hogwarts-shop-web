import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <header></header>
      <body>
        <figure>
          <video
            className="background"
            src="images/background.MP4"
            muted
            autoPlay
            loop
          />
          <article class="txt">
            <ul>
              <li>
                <a>Unlock Your Magical-Powers</a>
                <br />
              </li>
              <li>
                <p>Magical Time Shop</p>
              </li>
            </ul>
          </article>
        </figure>
        <Link to={"/list"}>
          <nav>
            <span href="#">Go to Wizzarding Shop</span>
          </nav>
        </Link>
      </body>
      <footer>WIZZARDING WORLD &copy; All Right Reserved</footer>
    </div>
  );
}

export default MainPage;

import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";

dayjs.extend(relativeTime);

function ListPage() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
        console.log(products);
      })
      .catch(function (error) {
        console.error("에러발생: ", error);
      });
  }, []);

  return (
    <div>
      <header>
        <Link to={"/"}>
          <h1>
            <img
              onclick="location.href='mypage.html'"
              src="images/main_logo.png"
              alt="logo"
              class="logo"
            />
            Magical TimeShop
          </h1>
        </Link>
        <ul id="gnb">
          <li>About</li>
          <li>Company</li>
          <li>Community</li>
        </ul>
      </header>
      <body>
        <figure>
          <video
            className="background"
            src="images/background.MP4"
            muted
            autoPlay
            loop
          />
        </figure>
        <h1>Magical Products</h1>
        <Button
                 id="upload-button"
        type="primary"
          size="large"
          onClick={function () {
            navigate("/upload");
          }}
          style={{
            width: "100px",
            fontFamily: "Raleway",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          商品登録
        </Button>
        <div id="product-list">
          {products.map(function (product, index) {
            return (
              <div class="product-card">
                {product.soldout === 1 && <div className="product-blur" />}
                <Link
                  style={{ color: "inherit" }}
                  className="product-link"
                  to={`/products/${product.id}`}
                >
                  <div>
                    <img
                      className="product-img"
                      src={`${API_URL}/${product.imageUrl}`}
                    />
                  </div>
                  <div>
                    <div class="product-contents">
                      <span class="product-name">{product.name}</span>
                      <span class="product-price">＄{product.price}</span>
                      <div className="product-footer">
                        <div class="product-seller">
                          <img
                            className="product-avatar"
                            src="images/hollow.png"
                          />
                          <span>{product.seller}</span>
                        </div>
                        </div>
                        <span className="product-date">
                          {dayjs(product.createdAt).fromNow()}
                        </span>

                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </body>
      <footer>WIZZARDING WORLD &copy; All Right Reserved</footer>
    </div>
  );
}

export default ListPage;

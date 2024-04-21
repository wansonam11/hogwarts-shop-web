import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
        console.log(product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("購入が完了しました。");
        getProduct();
      })
      .catch((error) => {
        message.error(`エラーが発生しました。 ${error.message}`);
      });
      navigate("/list");
  };

  const onClickDelete = () => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then((result) => {
        message.info("削除が完了しました。");
      })
      .catch((error) => {
        message.error(`エラーが発生しました。 ${error.message}`);
      });
    navigate("/list");
  };

  // if (product === null) {
  //   return <h1>상품 정보를 받고 있습니다...</h1>;
  // }

  return (
    <div>
      <header>
        <Link to={"/list"}>
          <h1>
            <img
              onclick="location.href='mypage.html'"
              src="/images/main_logo.png"
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
            src="/images/background.MP4"
            muted
            autoPlay
            loop
          />
        </figure>
        <h1>Magical Products</h1>
        <div id="image-box">
          <img src={`${API_URL}/${product.imageUrl}`} />
        </div>
        <div id="profile-box">
          <img src="/images/hollow.png" />
          <span>販売者：{product.seller}</span>
        </div>
        <div id="contents-box">
          <div id="name">{product.name}</div>
          <div id="price">＄{product.price}</div>
          <div id="createdAt">
            {dayjs(product.createdAt).format("YYYY年 MM月 DD日")}
          </div>

          <pre id="description">{product.description} </pre>
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          購入する
        </Button>
        <Button
          id="delete-button"
          size="large"
          type="primary" danger
          onClick={onClickDelete}
        >
          削除する
        </Button>
      </body>
      <footer>WIZZARDING WORLD &copy; All Right Reserved</footer>
    </div>
  );
}

export default ProductPage;

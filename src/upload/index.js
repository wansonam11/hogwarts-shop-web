import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";

function UploadPage() {
  const [imageUrl, setImageUrl] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        navigate("/list");
      })
      .catch((error) => {
        console.log(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

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

        <div id="upload-container">
          <Form name="상품업로드" onFinish={onSubmit}>
            <Form.Item
              name="upload"
              label={<div className="upload-label">商品写真</div>}
              rules={[{ required: true, message: "写真を添付してください" }]}
            >
              <Upload
                name="image"
                action={`${API_URL}/image`}
                listType="picture"
                showUploadList={false}
                onChange={onChangeImage}
              >
                {imageUrl ? (
                  <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
                ) : (
                  <div id="upload-img-placeholder">
                    <img src="/images/camera.png" />
                    <span>写真を添付してください</span>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label={<div className="upload-label">販売者名</div>}
              name="seller"
              rules={[
                { required: true, message: "販売者の名前を入力してください" },
              ]}
            >
              <Input
                className="upload-name"
                size="large"
                placeholder="名前を入力してください"
              />
            </Form.Item>
            <Divider />
            <Form.Item
              name="name"
              label={<div className="upload-label">販売名前</div>}
              rules={[{ required: true, message: "商品名を入力してください" }]}
            >
              <Input
                className="upload-name"
                size="large"
                placeholder="商品名を入力してください"
              />
            </Form.Item>
            <Divider />
            <Form.Item
              name="price"
              label={<div className="upload-label">商品値段</div>}
              rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
            >
              <InputNumber
                defaultValue={0}
                className="upload-price"
                size="large"
              />
            </Form.Item>
            <Divider />
            <Form.Item
              name="description"
              label={<div className="upload-label">商品説明</div>}
              rules={[{ required: true, message: "商品を紹介してください" }]}
            >
              <Input.TextArea
                size="large"
                id="product-description"
                showCount
                maxLength={300}
                placeholder="商品を紹介してください"
              />
            </Form.Item>
            <Form.Item>
              <Button id="submit-button" size="large" htmlType="submit">
                商品登録
              </Button>
            </Form.Item>
          </Form>
        </div>
      </body>
      <footer>WIZZARDING WORLD &copy; All Right Reserved</footer>
    </div>
  );
}

export default UploadPage;

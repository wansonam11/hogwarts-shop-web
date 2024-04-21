import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MainPageComponent from "./main";
import ListPageComponent from "./list";
import ProductPageComponet from "./product";
import UploadPageComponent from "./upload";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="body">
        <Routes>
          <Route path={"/"} element={<MainPageComponent />} />
          <Route path={"/list"} element={<ListPageComponent />} />
          <Route path={"/products/:id"} element={<ProductPageComponet />} />
          <Route path={"/upload"} element={<UploadPageComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

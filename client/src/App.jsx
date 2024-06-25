import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [blogPost, setBlogPost] = useState([]);

  const getBlogPost = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setBlogPost(result.data.data);
  };

  const deletePost = async (id) => {
    const resultCurrent = await axios.delete(
      `http://localhost:4001/products/${id}`
    );
    // setBlogPost(resultCurrent.data.data);
  };

  useEffect(() => {
    getBlogPost();
  }, [blogPost]);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {blogPost.map((item, index) => {
        return (
          <div className="product-list" key={index}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  deletePost(item.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

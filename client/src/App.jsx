import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

//////////// State
// 1. มี 1 states : productList
// 2. มี 1 event : onClick ที่ button มี callback คือ handleDelete
// 3. ประกาศ functions : handleDelete

//////////// Data Fetching and Deleting
// 1.API :
//    1.1 GET: http://localhost:4001/products
//    1.2 DELETE: http://localhost:4001/products/:id
// 2.axios : ติดตั้ง, import and execute
//    2.1 สร้าง request ใน function แล้วอัพเดท state
//    2.2 execute ใน useEffect เมื่อ โหลดหน้าเวปครั้งแรกครั้งเดียว
// 3.นำข้อมูลจาก Response มา Render

function App() {
  const [productList, setProductList] = useState([]);

  const getAllProduct = async () => {
    try {
      const result = await axios.get('http://localhost:4001/products');
      console.log(result.data.data);
      setProductList(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${deleteId}`);
      // console.log(resultDelete);
      const newProductList = productList.filter((item) => item.id !== deleteId);
      setProductList(newProductList);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productList.map((item, index) => {
          return (
            <div className="product" key={index}>
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
                <h2>Product price: {item.price}Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

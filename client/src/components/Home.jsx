import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  // ดึงข้อมูลสินค้าจาก Backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Product Listings</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              {/* แสดงรูปภาพของสินค้า */}
              <img
                src={product.img_url}
                className="card-img-top"
                alt={product.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">ราคา: ${product.price}</p>
                </div>
                <Link to={`/order/${product.id}`} className="btn btn-primary">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

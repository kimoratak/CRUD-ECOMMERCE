import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Rating,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function Order() {
  const { id } = useParams(); // รับ ID ของสินค้าที่จะสั่งซื้อ
  const [product, setProduct] = useState(null); // เก็บข้อมูลสินค้าที่เลือก
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // เก็บยอดรวม

  const [reviews, setReviews] = useState([]); // เก็บรีวิว
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" }); // เก็บค่าการรีวิวใหม่ของผู้ใช้

  // ดึงข้อมูลสินค้าจาก ID ที่ได้จาก URL
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:3001/products/${id}`);
      setProduct(res.data);
      setTotalPrice(res.data.price); // ตั้งค่าเริ่มต้นของยอดรวม
    };
    fetchProduct();
  }, [id]);

  // ดึงข้อมูลรีวิวจาก Backend (สมมุติว่าเชื่อมต่อกับ Backend ที่มีการดึงข้อมูลรีวิว)
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`http://localhost:3001/reviews/${id}`); // สมมุติว่าเชื่อมต่อ API ของรีวิว
      setReviews(res.data);
    };
    fetchReviews();
  }, [id]);

  // ฟังก์ชันคำนวณยอดรวมเมื่อจำนวนสินค้าเปลี่ยน
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // ฟังก์ชันส่งรีวิวใหม่
  const handleReviewSubmit = () => {
    const reviewData = {
      productId: id,
      rating: newReview.rating,
      comment: newReview.comment,
    };
    // ส่งรีวิวใหม่ไปยัง Backend
    axios
      .post(`http://localhost:3001/reviews`, reviewData)
      .then((response) => {
        setReviews([...reviews, response.data]); // เพิ่มรีวิวใหม่ในหน้าจอ
        setNewReview({ rating: 5, comment: "" }); // รีเซ็ตฟอร์มหลังจากรีวิวสำเร็จ
      })
      .catch((err) => console.error(err));
  };

  // คำนวณคะแนนเฉลี่ย
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* รูปสินค้า */}
        <div className="col-md-6">
          <img
            src={product.img_url}
            alt={product.name}
            className="img-fluid"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          {/* Rating */}
          <div className="mb-3">
            <Typography variant="h5">
              Rating: {averageRating} out of 5
            </Typography>
            <Rating
              name="read-only"
              value={parseFloat(averageRating)}
              readOnly
            />
            <Typography>based on {reviews.length} reviews</Typography>
          </div>

          {/* ราคา */}
          <h3 className="text-danger">฿{product.price.toFixed(2)}</h3>
          <p className="text-muted">
            <del>฿{(product.price * 1.5).toFixed(2)}</del> -
            {((1 - product.price / (product.price * 1.5)) * 100).toFixed(0)}%
          </p>

          {/* เลือกจำนวน */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <div className="input-group" style={{ width: "120px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          {/* ยอดรวม */}
          <h4>Total: ฿{totalPrice.toFixed(2)}</h4>

          {/* ปุ่ม Buy Now และ Add to Cart */}
          <div className="d-flex">
            <button className="btn btn-warning me-2">Buy Now</button>
            <button className="btn btn-outline-primary">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Reviews & Ratings Section */}
      <div className="mt-5">
        <Typography variant="h4">Ratings & Reviews</Typography>

        {/* แสดงรายการรีวิว */}
        {reviews.map((review, index) => (
          <Card key={index} className="mb-3">
            <CardContent>
              <Rating value={review.rating} readOnly />
              <Typography variant="body1">{review.comment}</Typography>
            </CardContent>
          </Card>
        ))}

        {/* ฟอร์มรีวิวใหม่ */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Write a Review</Typography>
          <Rating
            name="rating-controlled"
            value={newReview.rating}
            onChange={(event, newValue) =>
              setNewReview({ ...newReview, rating: newValue })
            }
          />
          <TextField
            label="Comment"
            multiline
            rows={3}
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Order;

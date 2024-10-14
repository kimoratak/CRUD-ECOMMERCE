const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secretKey = "your_secret_key";

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Error: ", err);
  } else {
    console.log("MySQL Connected...");
  }
});

// API สำหรับดึงข้อมูลทั้งหมด (Read)
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// app.get("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM products WHERE id=?";
//   db.query(sql, [id], (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) throw err;
    res.json(result[0]); // ตรวจสอบว่ามีการส่งข้อมูล img_url กลับมาด้วย
  });
});

// app.get("/products", (req, res) => {
//   const sql = `
//     SELECT
//       products.id,
//       products.name AS product_name,
//       products.description,
//       products.price,
//       products.stock_quantity,
//       products.created_at,
//       products.updated_at,
//       categories.name AS category_name
//     FROM products
//     JOIN categories ON products.category_id = categories.id
//   `;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// เพิ่มสินค้าใหม่ (Create)
app.post("/products", (req, res) => {
  const { name, description, price, stock_quantity, category_id, img_url } =
    req.body;
  const sql =
    "INSERT INTO products (name, description, price, stock_quantity, category_id, img_url) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, description, price, stock_quantity, category_id, img_url],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Product added successfully", id: result.insertId });
    }
  );
});

// แก้ไขสินค้า (Update)
app.put("/products/:id", (req, res) => {
  const { name, description, price, stock_quantity, category_id, img_url } =
    req.body;
  const id = req.params.id;
  const sql =
    "UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?, img_url = ? WHERE id = ?";
  db.query(
    sql,
    [name, description, price, stock_quantity, category_id, img_url, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Product updated successfully", result });
    }
  );
});

// API สำหรับลบข้อมูล (Delete)
app.delete("/products/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Product deleted successfully" });
  });
});

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// เพิ่มหมวดหมู่ใหม่ (Create)
app.post("/categories", (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category added successfully", id: result.insertId });
  });
});

// แก้ไขหมวดหมู่ (Update)
app.put("/categories/:id", (req, res) => {
  const { name, description } = req.body;
  const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category updated successfully" });
  });
});

// ลบหมวดหมู่ (Delete)
app.delete("/categories/:id", (req, res) => {
  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category deleted successfully" });
  });
});

app.get("/reviews/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql = "SELECT * FROM reviews WHERE product_id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// API สำหรับเพิ่มรีวิวใหม่
app.post("/reviews", (req, res) => {
  const { productId, rating, comment } = req.body;
  const sql =
    "INSERT INTO reviews (product_id, rating, comment) VALUES (?, ?, ?)";
  db.query(sql, [productId, rating, comment], (err, result) => {
    if (err) throw err;
    res.json({ message: "Review added successfully", id: result.insertId });
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // เข้ารหัสรหัสผ่านก่อนเก็บลงฐานข้อมูล
  const hashedPassword = await bcrypt.hash(password, 10);

  // SQL สำหรับเพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Registration failed" });
    }

    // สร้าง token หลังจากสมัครสมาชิกเสร็จ
    const token = jwt.sign({ email, username }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Registration successful", token });
  });
});

// API เข้าสู่ระบบ
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Login failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Login failed: User not found" });
    }

    const user = results[0];

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Login failed: Incorrect password" });
    }

    // สร้าง token
    const token = jwt.sign(
      { email: user.email, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  });
});

app.get("/users", (req, res) => {
  sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// เปิดเซิร์ฟเวอร์
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

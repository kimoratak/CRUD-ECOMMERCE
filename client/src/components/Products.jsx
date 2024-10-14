import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    img_url: "",
  });
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    img_url: "",
  });
  const [showEditModal, setShowEditModal] = useState(false); // สำหรับควบคุมการแสดง Edit Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false); // สำหรับควบคุมการแสดง Confirm Modal

  // ดึงข้อมูลสินค้าจาก Backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const handleAddProduct = () => {
    axios
      .post("http://localhost:3001/products", newProduct)
      .then(() => {
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stock_quantity: "",
          category_id: "",
          img_url: "",
        });
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  // ฟังก์ชันเปิด Modal ยืนยันการลบ
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setShowConfirmModal(true); // เปิด Modal ยืนยันการลบ
  };

  // ฟังก์ชันปิด Modal ยืนยันการลบ
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false); // ปิด Modal ยืนยันการลบ
  };

  // ฟังก์ชันลบสินค้า
  const handleDeleteProduct = () => {
    axios
      .delete(`http://localhost:3001/products/${currentProduct.id}`)
      .then(() => {
        setShowConfirmModal(false);
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  // ฟังก์ชันเปิด Modal แก้ไขสินค้า
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true); // เปิด Modal แก้ไขสินค้า
  };

  // ฟังก์ชันปิด Modal แก้ไขสินค้า
  const handleCloseEditModal = () => {
    setShowEditModal(false); // ปิด Modal แก้ไขสินค้า
  };

  // ฟังก์ชันบันทึกการแก้ไขสินค้า
  const handleSaveChanges = () => {
    axios
      .put(
        `http://localhost:3001/products/${currentProduct.id}`,
        currentProduct
      )
      .then(() => {
        setShowEditModal(false);
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Product Management</h1>

      {/* ฟอร์มสำหรับเพิ่มสินค้าใหม่ */}
      <div className="mb-4">
        <h4>Add New Product</h4>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                value={newProduct.stock_quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock_quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Category ID</label>
              <input
                type="number"
                className="form-control"
                value={newProduct.category_id}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category_id: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.img_url}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, img_url: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </form>
      </div>

      {/* ตารางแสดงสินค้า */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal แก้ไขสินค้า */}
      <div
        className={`modal fade ${showEditModal ? "show" : ""}`}
        style={{ display: showEditModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseEditModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.name}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={currentProduct.description}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentProduct.stock_quantity}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        stock_quantity: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentProduct.category_id}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        category_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.img_url}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        img_url: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal ยืนยันการลบสินค้า */}
      <div
        className={`modal fade ${showConfirmModal ? "show" : ""}`}
        style={{ display: showConfirmModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="confirmDeleteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseConfirmModal}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this product:{" "}
              <strong>{currentProduct.name}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseConfirmModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay ของ Modal */}
      {showConfirmModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Products;

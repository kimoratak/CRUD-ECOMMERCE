import React, { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [currentCategory, setCurrentCategory] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [showEditModal, setShowEditModal] = useState(false); // สำหรับควบคุมการแสดง Edit Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false); // สำหรับควบคุมการแสดง Confirm Modal

  // ดึงข้อมูลหมวดหมู่จาก Backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ฟังก์ชันเพิ่มหมวดหมู่ใหม่
  const handleAddCategory = () => {
    axios
      .post("http://localhost:3001/categories", newCategory)
      .then(() => {
        setNewCategory({ name: "", description: "" });
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  // ฟังก์ชันเปิด Modal แก้ไขหมวดหมู่
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setShowEditModal(true); // เปิด Modal แก้ไขหมวดหมู่
  };

  // ฟังก์ชันปิด Modal แก้ไขหมวดหมู่
  const handleCloseEditModal = () => {
    setShowEditModal(false); // ปิด Modal แก้ไขหมวดหมู่
  };

  // ฟังก์ชันบันทึกการแก้ไขหมวดหมู่
  const handleSaveChanges = () => {
    axios
      .put(
        `http://localhost:3001/categories/${currentCategory.id}`,
        currentCategory
      )
      .then(() => {
        setShowEditModal(false);
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  // ฟังก์ชันเปิด Modal ยืนยันการลบหมวดหมู่
  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setShowConfirmModal(true); // เปิด Modal ยืนยันการลบ
  };

  // ฟังก์ชันปิด Modal ยืนยันการลบหมวดหมู่
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false); // ปิด Modal ยืนยันการลบ
  };

  // ฟังก์ชันลบหมวดหมู่
  const handleDeleteCategory = () => {
    axios
      .delete(`http://localhost:3001/categories/${currentCategory.id}`)
      .then(() => {
        setShowConfirmModal(false);
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Category Management</h1>

      {/* ฟอร์มสำหรับเพิ่มหมวดหมู่ใหม่ */}
      <div className="mb-4">
        <h4>Add New Category</h4>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </form>
      </div>

      {/* ตารางแสดงหมวดหมู่ */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(category)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal แก้ไขหมวดหมู่ */}
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
                Edit Category
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
                    value={currentCategory.name}
                    onChange={(e) =>
                      setCurrentCategory({
                        ...currentCategory,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={currentCategory.description}
                    onChange={(e) =>
                      setCurrentCategory({
                        ...currentCategory,
                        description: e.target.value,
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

      {/* Modal ยืนยันการลบหมวดหมู่ */}
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
              Are you sure you want to delete this category:{" "}
              <strong>{currentCategory.name}</strong>?
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
                onClick={handleDeleteCategory}
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

export default Categories;

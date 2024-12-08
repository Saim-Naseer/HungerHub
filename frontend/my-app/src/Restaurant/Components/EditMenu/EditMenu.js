import React, { useState } from "react";
import "./EditMenu.css";

const EditMenu = () => {
  const [menuData, setMenuData] = useState([
    {
      category: "Famous Item",
      items: [{ name: "Pasta", price: 600 }],
    },
    {
      category: "Normal Items",
      items: [
        { name: "Pizza", price: 1200 },
        { name: "Burger", price: 400 },
        { name: "Wrap", price: 300 },
        { name: "Handi", price: 2300 },
        { name: "Karahi", price: 2200 },
        { name: "Sajji", price: 2200 },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [isFamous, setIsFamous] = useState(false);

  // Function to add an item
  const handleAddItem = () => {
    if (newItem.price < 0) {
      alert("Price cannot be negative!");
      return;
    }

    if (!newItem.name || !newItem.price) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedMenuData = menuData.map((category) => {
      if ((isFamous && category.category === "Famous Item") || (!isFamous && category.category === "Normal Items")) {
        return {
          ...category,
          items: [...category.items, { name: newItem.name, price: parseInt(newItem.price) }],
        };
      }
      return category;
    });

    setMenuData(updatedMenuData);
    setNewItem({ name: "", price: "" });
    setIsFamous(false);
    setIsModalOpen(false);
  };

  // Function to confirm and delete an item
  const handleDeleteItem = (categoryName, itemName) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedMenuData = menuData.map((category) => {
        if (category.category === categoryName) {
          return {
            ...category,
            items: category.items.filter((item) => item.name !== itemName),
          };
        }
        return category;
      });

      setMenuData(updatedMenuData);
    }
  };

  return (
    <div className="edit-menu">
      <div className="upper-area">
        <h2 className="heading">Edit Menu</h2>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          Add +
        </button>
      </div>

      <div className="menu-categories">
        {menuData.map((category, index) => (
          <div key={index} className="category">
            <h3>{category.category}</h3>
            <div className="items">
              {category.items.map((item, idx) => (
                <div key={idx} className="item">
                  <span>{item.name}</span>
                  <span>{item.price}/-</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(category.category, item.name)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Item</h3>
            <label>
              Name:
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
              />
            </label>
            <label className="checkbox-label">
              Is Famous
              <input
                type="checkbox"
                checked={isFamous}
                onChange={(e) => setIsFamous(e.target.checked)}
              />
            </label>
            <div className="modal-actions">
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="add-item-btn" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMenu;

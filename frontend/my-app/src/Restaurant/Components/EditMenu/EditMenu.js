import React, { useState, useEffect } from "react";
import "./EditMenu.css";

const EditMenu = () => {
  const [menuData, setMenuData] = useState([]); // Dynamic data from API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [isFamous, setIsFamous] = useState(false);

  // Fetch menu data from backend
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const restaurantId = 1; // Replace with dynamic ID if needed
        const response = await fetch(`http://localhost:5000/restaurant/menu?rid=${restaurantId}`);
        if (!response.ok) {
          throw new Error(`Error fetching menu data: ${response.statusText}`);
        }
        const data = await response.json();
        const items = data.menuItems;

        // Categorize items into Famous and Normal
        const famousItems = items.filter((item) => item.popular);
        const normalItems = items.filter((item) => !item.popular);

        setMenuData([
          { category: "Famous Item", items: famousItems },
          { category: "Normal Items", items: normalItems },
        ]);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  // Add new item
  const handleAddItem = async () => {
    if (newItem.price < 0) {
      alert("Price cannot be negative!");
      return;
    }

    if (!newItem.name || !newItem.price) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const restaurantId = 1; // Replace with dynamic restaurant ID if needed
      const response = await fetch(
        `http://localhost:5000/restaurant/menu?rid=${restaurantId}&name=${newItem.name}&price=${newItem.price}&popular=${isFamous}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }

      const data = await response.json();

      // Update the menu data with the newly added item
      const updatedMenuData = menuData.map((category) => {
        if (
          (isFamous && category.category === "Famous Item") ||
          (!isFamous && category.category === "Normal Items")
        ) {
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

      alert(data.message); // Show success message
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // Delete item
  // Delete item
const handleDeleteItem = async (categoryName, itemName, itemId) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    try {
      const restaurantId = 1; // Replace with dynamic restaurant ID if needed
      const response = await fetch(
        `http://localhost:5000/restaurant/menu?rid=${restaurantId}&iid=${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message); // Show success message

      // Remove the item from the frontend
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
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete item. Please try again.");
    }
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
                  onClick={() => handleDeleteItem(category.category, item.name, item.Item_id)}
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

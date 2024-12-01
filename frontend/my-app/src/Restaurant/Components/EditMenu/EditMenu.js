import React from "react";
import "./EditMenu.css";

const EditMenu = () => {
  const menuData = [
    { category: "Continental", items: [{ name: "Pasta", price: 600 }, { name: "Lasagne", price: 900 }, { name: "Quiche", price: 1600 }] },
    { category: "Fast Food", items: [{ name: "Pizza", price: 1200 }, { name: "Burger", price: 400 }, { name: "Wrap", price: 300 }] },
    { category: "Desi Food", items: [{ name: "Handi", price: 2300 }, { name: "Karahi", price: 2200 }, { name: "Sajji", price: 2200 }] },
  ];

  return (
    <div className="edit-menu">
      <h2 className="header">Edit Menu</h2>
      <div className="menu-categories">
        {menuData.map((category, index) => (
          <div key={index} className="category">
            <h3>{category.category}</h3>
            <div className="items">
              {category.items.map((item, idx) => (
                <div key={idx} className="item">
                  <span>{item.name}</span>
                  <span>{item.price}/-</span>
                  <button className="delete-btn">🗑</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="add-btn">Add +</button>
    </div>
  );
};

export default EditMenu;

import React, { useState } from "react";

function NutritionForm({ fetchNutritionData, inputRef }) {
  const [foodName, setFoodName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodName.trim()) {
      fetchNutritionData(foodName);  // Pass food name to parent component for data fetching
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nutrition-form">
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Enter food name"
        ref={inputRef}  // Attach the ref here
        className="food-name-input"
      />
      <button type="submit" className="submit-button">Search</button>
    </form>
  );
}

export default NutritionForm;

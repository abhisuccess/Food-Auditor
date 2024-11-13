import React from "react";
import "./NutritionTable.css";

function NutritionTable({ data }) {
  return (
    <div className="nutrition-table">
      <table>
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Calories</td><td>{data.calories} kcal</td></tr>
          <tr><td>Protein</td><td>{data.protein} g</td></tr>
          <tr><td>Carbohydrates</td><td>{data.carbohydrates} g</td></tr>
          <tr><td>Fat</td><td>{data.fat} g</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default NutritionTable;

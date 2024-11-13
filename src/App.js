import React, { useState, useRef } from "react";
import { db } from "./firebase";  // Ensure firebase is correctly initialized
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "./components/Header";
import NutritionForm from "./components/NutritionForm";
import NutritionTable from "./components/NutritionTable";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);  // Ref for input field

  // Fetch Nutrition Data from Firestore by food name
  const fetchNutritionData = async (foodName) => {
    setError("");  // Reset any previous errors
    console.log(`Fetching data for: ${foodName}`);

    try {
      const foodNameLower = foodName.toLowerCase(); // Case-insensitive search
      const foodCollectionRef = collection(db, "foods");  // Reference to 'foods' collection
      const q = query(foodCollectionRef, where("name", "==", foodNameLower));  // Query to match food name

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();  // Get first document data
        setFoodData(docData);  // Set food data to state
        console.log("Data found:", docData);
      } else {
        setFoodData(null);  // Clear previous food data
        setError("Food not found. Please try another food.");
      }
    } catch (error) {
      setFoodData(null);  // Clear any previous food data
      setError("Something went wrong. Please try again.");
      console.error("Error fetching data:", error);  // Log the error for debugging
    }
  };

  // Focus on the input field when the search icon is clicked
  const handleSearchIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();  // Focus on the input field
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">Food Auditor</h1>
        <div className="header-options">
          <a href="#support">Support</a>
          <a href="#appointment">Book Appointment</a>
          <a href="#resources">Dietary Resources</a>
          <span 
            className="search-icon"
            onClick={handleSearchIconClick}
          >
            🔍
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="content">
        <section className="intro">
          <h2>History of Food Nutrition</h2>
          <p>
            The history of food nutrition and related research dates back to ancient civilizations, but formal scientific studies began in the 18th and 19th centuries. Early food practices were based on trial and error, with many cultures identifying specific foods for health benefits. In the 18th century, scientists like Antoine Lavoisier advanced understanding by studying metabolism and how the body uses energy from food.
          </p>
          <p>
            In the 19th century, the discovery of vitamins marked a major turning point. Researchers like Casimir Funk identified vitamins as essential nutrients for health, and in the early 20th century, researchers started to link specific deficiencies to diseases such as scurvy, rickets, and beriberi.
          </p>
          <p>
            The mid-20th century saw the emergence of more structured research, with the development of nutrition science as an academic discipline. The establishment of major organizations like the Food and Agriculture Organization (FAO) and the World Health Organization (WHO) promoted global initiatives to improve nutrition.
          </p>
          <p>
            Today, nutrition research continues to evolve, with ongoing studies focusing on the role of nutrients in chronic diseases, the microbiome, and personalized nutrition, reflecting the growing understanding that diet plays a crucial role in both preventing and managing health conditions.
          </p>
        </section>

        <section className="why-choose">
          <h2>Why Choose Food Auditor?</h2>
          <p>
            We provide accurate nutritional information to help you make informed dietary choices. At Food Auditor, we believe that knowledge is power, especially when it comes to making choices about what we eat. Our platform provides scientifically accurate and up-to-date nutritional information, so you know exactly what’s going into your body.
          </p>
        </section>

        {/* Nutrition Form and Data Display */}
        <NutritionForm fetchNutritionData={fetchNutritionData} inputRef={inputRef} />
        {foodData && <NutritionTable data={foodData} />}
        {error && <p className="error-message">{error}</p>}
      </div>

      <Footer />
    </div>
  );
}

export default App;

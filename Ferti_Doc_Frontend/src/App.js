import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionPage from "./Components/QuestionPage/QuestionPage";
import RecommendPage from "./Components/Recommend/RecommendPage";
import ShopLocationPage from "./Components/ShopLocationPage/ShopLocationPage";
import OrderPage from "./Components/OrderPage/OrderPage";
import OrderConfirmationPage from "./Components/OrderConfirmationPage/OrderConfirmationPage";
import { createContext, useEffect, useState } from "react";
import SpeechToText from "./Components/SpeechRecognitionComponent";

export const systemContext = createContext();
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function App() {
  const [customerDetails, setCustomerDetails] = useState(getLocalStorage("customerDetails"));
  const [prediction, setPrediction] = useState(getLocalStorage("predictionData"));

  const contextValues = {
    customerDetails,
    setCustomerDetails,
    prediction,
    setPrediction,
  };

  return (
    <systemContext.Provider value={contextValues}>
      <Router>
        <Routes>
          <Route path="/" exact Component={LandingPage} />
          {/* <Route path="/" exact Component={SpeechToText} /> */}
          <Route path="/question" exact Component={QuestionPage} />
          <Route path="/recommend" exact Component={RecommendPage} />
          <Route path="/shopLocation" exact Component={ShopLocationPage} />
          <Route path="/order" exact Component={OrderPage} />
          <Route path="/confirmation" exact Component={OrderConfirmationPage} />
        </Routes>
      </Router>
    </systemContext.Provider>
  );
}

export default App;

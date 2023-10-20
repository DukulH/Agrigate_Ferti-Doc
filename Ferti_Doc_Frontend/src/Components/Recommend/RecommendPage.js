import React, { useContext } from "react";
import "./RecommendPage.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { systemContext } from "../../App";

export default function RecommendPage() {
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);
  console.log("prediction", prediction);
  return (
    <div>
      <header className="headerDesign">
        <h1>Agrigate Ferti-Doc</h1>
      </header>
      <div className="bodyDesign">
        <p
          className="text-center mt-5"
          style={{ fontSize: "24px", color: "white" }}
        >
          <strong>Agrigate Ferti-doc Recommended Fertilizer List...</strong>
        </p>
        <div className="container w-50 m-auto d-flex justify-content-center m-2 mt-5">
          <div className="w-100 d-flex detailsSection">
            <div className="w-50 px-2" style={{ fontSize: "18px" }}>
              <p className="m-0">
                <strong>Location : {prediction?.user_input?.Location}</strong>
              </p>
              <p className="m-0">
                <strong>Crop-Name : {prediction?.user_input?.Crop_Name}</strong>
              </p>
              <p className="m-0">
                <strong>
                  Expected Yield : {prediction?.user_input?.Yield}
                </strong>
              </p>
            </div>
            <div className="w-50 px-2 text-end" style={{ fontSize: "18px" }}>
              <p className="m-0">
                <strong>Name : {customerDetails?.customerName}</strong>
              </p>
              <p className="m-0">
                <strong>Phone : {customerDetails?.phone}</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="container w-50 m-auto mt-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th
                  className="w-50 text-center"
                  style={{ backgroundColor: "#FBD448" }}
                  scope="col"
                >
                  Fertilizer Name
                </th>
                <th
                  className="w-50 text-center"
                  style={{ backgroundColor: "#FBD448" }}
                  scope="col"
                >
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {prediction?.Predicted_Urea && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    Urea
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_Urea} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_MOP && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    MOP
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_MOP} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_TSP && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    TSP
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_TSP} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Gypsum && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    Gypsum
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_Gypsum} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Hepta_Zinc && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    Hepta Zinc
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_Hepta_Zinc} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Boric_Acid && (
                <tr>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                    scope="row"
                  >
                    Boric Acid
                  </th>
                  <th
                    className="w-50 text-center"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    {prediction?.Predicted_Boric_Acid} KG
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Magnesium_Sulphate && (
              <tr>
                <th
                  className="w-50 text-center"
                  style={{ backgroundColor: "#E6E6E6" }}
                  scope="row"
                >
                  Magnesium Sulphate
                </th>
                <th
                  className="w-50 text-center"
                  style={{ backgroundColor: "#E6E6E6" }}
                >
                  {prediction?.Predicted_Magnesium_Sulphate} KG
                </th>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          className="container d-flex justify-content-between mt-5"
          style={{ width: "53%" }}
        >
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                className="exitButtonDesign m-0 border-0"
                htmlType="submit"
                onClick={() => {
                  localStorage.removeItem("customerDetails");
                  localStorage.removeItem("predictionData");
                  setCustomerDetails(null);
                  setPrediction(null);
                }}
              >
                <strong>Exit</strong>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              className="submitButtonDesign m-0 border-0"
              style={{ color: "#1A1A1A", borderRadius: "5px" }}
              htmlType="submit"
            >
              <strong>Print</strong>
            </Button>
          </div>
          <div>
            <Link to="/shopLocation" style={{ textDecoration: "none" }}>
              <Button
                className="submitButtonDesign m-0 border-0 d-flex justify-content-center align-items-center"
                style={{ color: "#1A1A1A", borderRadius: "5px" }}
                htmlType="submit"
              >
                <strong>
                  Shop <ArrowRightOutlined />
                </strong>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

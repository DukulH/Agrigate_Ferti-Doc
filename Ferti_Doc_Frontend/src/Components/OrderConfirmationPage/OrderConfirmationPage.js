import { Button } from "antd";
import React, { useContext} from "react";
import { Link,useLocation } from "react-router-dom";
import { systemContext } from "../../App";

export default function OrderConfirmationPage() {
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);
    const location = useLocation();
    const { shop } = location?.state;
  return (
    <div>
      <header className="headerDesign">
        <h1>Agrigate Ferti-Doc</h1>
      </header>
      <div className="bodyDesign">
        <p
          className="text-center mt-5"
          style={{ fontSize: "28px", color: "#FBD448" }}
        >
          <strong>Order Placed Successfully!</strong>
        </p>
        <div className="container w-50 m-auto d-flex justify-content-center m-2 mt-5">
          <div className="w-100" style={{ backgroundColor: "white" }}>
            <div
              className="w-100 px-4 py-2 d-flex justify-content-between border-bottom"
              style={{ fontSize: "18px" }}
            >
              <p className="m-0">
                <strong>Shop Name : {shop?.shop_name}</strong>
              </p>
              <p className="m-0">Shop Number : {shop?.shop_phone}</p>
            </div>
            <div
              className="w-100 px-4 py-2 d-flex justify-content-between"
              style={{ fontSize: "18px" }}
            >
              <p className="m-0">
                <strong>Name : {customerDetails?.customerName}</strong>
              </p>
              <p className="m-0">
                <strong>Phone : {customerDetails?.phone}</strong>
              </p>
              <p className="m-0">
                <strong>Location: {prediction?.user_input?.Location}</strong>
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
                  className="w-25 text-center"
                  style={{ backgroundColor: "#FBD448" }}
                  scope="col"
                >
                  Quantity
                </th>
                <th
                  className="w-25 text-center"
                  style={{ backgroundColor: "#FBD448" }}
                  scope="col"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {prediction?.Predicted_Urea && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    Urea
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_Urea} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_Urea * prediction?.Urea_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_MOP && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    MOP
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_MOP} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_MOP * prediction?.MOP_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_TSP && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    TSP
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_TSP} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_TSP * prediction?.TSP_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Gypsum && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    Gypsum
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_Gypsum} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_Gypsum * prediction?.Gypsum_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Hepta_Zinc && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    Hepta Zinc
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_Hepta_Zinc} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_Hepta_Zinc *
                      prediction?.Hepta_Zinc_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Boric_Acid && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    Boric Acid
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_Boric_Acid} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_Boric_Acid *
                      prediction?.Boric_Acid_Price
                    ).toFixed(2)}{" "}
                    BDT
                  </th>
                </tr>
              )}
              {prediction?.Predicted_Magnesium_Sulphate && (
                <tr>
                  <th className="w-25 text-center" scope="row">
                    Magnesium Sulphate
                  </th>
                  <th className="w-25 text-center">
                    {prediction?.Predicted_Magnesium_Sulphate} KG
                  </th>
                  <th className="w-25 text-center">
                    {(
                      prediction?.Predicted_Magnesium_Sulphate *
                      prediction?.Magnesium_Sulphate_Price
                    ).toFixed(2)}{" "}
                    BDT
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
              className="submitButtonDesign m-0 border-0 d-flex justify-content-center align-items-center"
              style={{ color: "#1A1A1A", borderRadius: "5px" }}
              htmlType="submit"
            >
              <strong>Print</strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

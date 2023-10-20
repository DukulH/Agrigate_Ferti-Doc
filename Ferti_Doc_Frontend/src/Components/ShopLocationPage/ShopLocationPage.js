import { Button, Image, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { systemContext } from "../../App";
import baseUrl from "../../config";

export default function ShopLocationPage() {
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);
  const [shopDetails, setShopDetails] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Function to handle the button click and set the image URL
  const handleButtonClick = (shop) => {
    setImageUrl(shop.image); // Set the URL of the image associated with the shop
    setModal2Open(true); // Open the modal
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/shop_details/${prediction?.user_input?.Location}`)
      .then((response) => response.json())
      .then((data) => setShopDetails(data));
  }, [prediction?.user_input?.Location]);

  return (
    <>
      <Modal
        title="Store Location"
        centered
        visible={modal2Open} // Use 'visible' to control the visibility of the Modal
        footer={null}
        onCancel={() => {
          setModal2Open(false);
        }}
      >
        <Image width={200} src={imageUrl} />
      </Modal>

      <div>
        <header className="headerDesign">
          <h1>Agrigate Ferti-Doc</h1>
        </header>
        <div className="bodyDesign">
          <p
            className="text-center mt-5"
            style={{ fontSize: "24px", color: "white" }}
          >
            <strong>
              Agrigate Ferti-doc Recommended Near by Agrigate Shops
            </strong>
          </p>
          <div className="container w-50 m-auto mt-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th
                    className="text-center w-50"
                    style={{ backgroundColor: "#FBD448" }}
                    scope="col"
                  >
                    Near By Shops
                  </th>
                  <th
                    className="text-center"
                    style={{ backgroundColor: "#FBD448", width: "20%" }}
                    scope="col"
                  >
                    Distance
                  </th>
                  <th
                    className="text-center"
                    style={{ backgroundColor: "#FBD448", width: "10%" }}
                    scope="col"
                  >
                    MAP
                  </th>
                  <th
                    className="text-center"
                    style={{ backgroundColor: "#FBD448", width: "20%" }}
                    scope="col"
                  >
                    Order Here
                  </th>
                </tr>
              </thead>
              <tbody>
                {shopDetails?.map((shop, index) => (
                  <tr key={index}>
                    <th
                      className="w-50 text-center"
                      style={{ backgroundColor: "#E6E6E6" }}
                      scope="row"
                    >
                      {shop.shop_name}
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#E6E6E6", width: "20%" }}
                    >
                      {shop.distance} KM
                    </th>
                    <th
                      className="text-center"
                      style={{ backgroundColor: "#E6E6E6", width: "10%" }}
                    >
                      <Button
                        style={{ border: "none", backgroundColor: "unset" }}
                        onClick={() => handleButtonClick(shop)}
                      >
                        {" "}
                        click
                      </Button>
                    </th>
                    <th
                      className="text-center"
                      style={{
                        backgroundColor: "#41E7AB",
                        width: "20%",
                        color: "gray",
                      }}
                      scope="col"
                    >
                      <Link
                        to="/order"
                        state={{ shop: shop }}
                        style={{ textDecoration: "none", color: "#808080" }}
                      >
                        Order
                      </Link>
                    </th>
                  </tr>
                ))}
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
          </div>
        </div>
      </div>
    </>
  );
}

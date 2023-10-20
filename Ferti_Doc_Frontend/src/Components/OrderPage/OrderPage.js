import { Modal, Button, Col, Form, Input, Row, Spin } from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { systemContext } from "../../App";
import baseUrl from "../../config";

export default function OrderPage() {
  const location = useLocation();
  const { shop } = location?.state;
  const [form] = Form.useForm();
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);
  const [modal2Open, setModal2Open] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddCustomer = (data) => {
    setLoading(true);
    localStorage.setItem("customerDetails", JSON.stringify(data));
    setCustomerDetails(data);
    setLoading(false);
    setModal2Open(false);
  };

  const fertilizerData = [];

  for (const key in prediction) {
      if (key.startsWith("Predicted_")) {
          const fertilizerName = key.replace("Predicted_", "");
          const priceKey = `${fertilizerName}_Price`;
          const quantity = prediction[key];
          const total_price = quantity * prediction[priceKey];
          const price = prediction[priceKey]; // Get the price of the fertilizer
  
          fertilizerData.push({
              name: fertilizerName,
              quantity: quantity,
              total_price: total_price,
              price: price // Add the price to the fertilizer data
          });
      }
  }

  const handlePlaceOrder = () => {
    if (customerDetails && fertilizerData ) {
      const customer_name = customerDetails.customerName;
      const customer_phone = customerDetails.phone;
      const shop_id= shop?.shop_id
      const data = {
        customer_name,
        customer_phone,
        shop_id,
        fertilizerData
      }
      console.log(shop_id)
      fetch(`${baseUrl}/api/orders/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data =>  {
        if(data){
          navigate("/confirmation", { state: { shop: shop } });
        }
      })
      
    } else {
      Swal.fire({
        title: "Error",
        text: "Please add customer details",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <>
      <Modal
        title="Customer Details"
        centered
        visible={modal2Open} // Use 'visible' to control the visibility of the Modal
        footer={null}
        onCancel={() => {
          form.resetFields();
          setModal2Open(false);
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleAddCustomer}>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col xs={24} sm={12} md={12} lg={10}>
              <Form.Item
                hasFeedback
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Only English characters",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Name"
                  size="large"
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={10}>
              <Form.Item
                hasFeedback
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter contact number",
                  },
                  {
                    pattern: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Contact Number"
                  size="large"
                  style={{ borderRadius: 0 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item>
              <Button
                className="submitButtonDesign m-0 text-dark"
                htmlType="submit"
                disabled={loading}
              >
                Add Customer
                {loading && <Spin size="large" style={{ marginLeft: 8 }} />}
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Modal>

      <div>
        <header className="headerDesign">
          <h1>Agrigate Ferti-Doc</h1>
        </header>
        <div className="bodyDesign">
          <div className="container w-50 m-auto d-flex justify-content-center m-2 mt-5">
            <div className="w-100" style={{ backgroundColor: "white" }}>
              <div
                className="w-100 px-4 py-2 d-flex justify-content-between border-bottom"
                style={{ fontSize: "18px" }}
              >
                <p className="m-0">
                  <strong>Shop Name : {shop?.shop_name} </strong>
                </p>
                <p className="m-0">Shop Number : {shop?.shop_phone}</p>
              </div>
              <div
                className="w-100 px-4 py-2 d-flex justify-content-between"
                style={{ fontSize: "18px" }}
              >
                {customerDetails ? (
                  <>
                    <p className="m-0">
                      <strong>Name : {customerDetails?.customerName} </strong>
                    </p>
                    <p className="m-0">
                      <strong>Phone : {customerDetails.phone}</strong>
                    </p>
                  </>
                ) : (
                  <Button onClick={() => setModal2Open(true)}>
                    {" "}
                    Add Customer
                  </Button>
                )}
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
              {/* <Link to="/confirmation" style={{ textDecoration: "none" }}> */}
              <Button
                className="submitButtonDesign m-0 border-0 d-flex justify-content-center align-items-center"
                style={{ color: "#1A1A1A", borderRadius: "5px" }}
                htmlType="submit"
                onClick={handlePlaceOrder}
              >
                <strong>Place Order</strong>
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

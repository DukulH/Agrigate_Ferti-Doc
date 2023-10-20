import React, { useContext, useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { systemContext } from "../../App";
import SpeechToTextComponent from "../SpeechRecognitionComponent";
import axios from "axios";

export default function LandingPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);

  const apikey = "0tuCOwWwNb02Z5jdgadEUtX89y-bYgqn34ikTXdsCNTT";
  const endpoint =
    "https://api.jp-tok.text-to-speech.watson.cloud.ibm.com/instances/630788a2-77e9-46c6-a763-32a7ee187ec9/v1/synthesize?voice=en-US_MichaelV3Voice";


    const handleTextToSpeech = async (text) => {
      try {
        const response = await axios.post(
          endpoint,
          {
            text: text,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "audio/wav",
              Authorization: `Basic ${btoa(`apikey:${apikey}`)}`,
            },
            responseType: "blob",
          }
        );
  
        const audioUrl = window.URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (error) {
        console.error("Error converting text to speech:", error);
      }
    };
  
     

  const handleSubmit = (data) => {
    const submittedData = {
      customerName: data.name,
      phone: data.contact_number,
    };
    localStorage.setItem("customerDetails", JSON.stringify(submittedData));
    setCustomerDetails(submittedData);
    navigate("/question");
    handleTextToSpeech('Please select location, soil type, crop name and yield for fertilizer predictions')
  };

  return (
    <div>
      <header className="headerDesign">
        <h1>Agrigate Ferti-Doc</h1>
      </header>
      <div className="bodyDesign">
        <p className="text-center m-0" style={{ fontSize: "28px" }}>
          Agrigate Ferti-doc is an AI Generate fertilizer recommending
          application to help the farmer as well as our mother nature....
        </p>
        <p
          className="text-center mt-5"
          style={{ fontSize: "24px", color: "white" }}
        >
          <strong>
            To enter, please provide your Name and contact number{" "}
          </strong>
        </p>
        <div className="d-flex justify-content-center m-2 mt-5">
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col xs={24} sm={12} md={12} lg={10}>
                <Form.Item
                  hasFeedback
                  name="name"
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
                  name="contact_number"
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
              <Col xs={24} sm={12} md={8} lg={4}>
                <Form.Item>
                  <Button
                    className="submitButtonDesign m-0"
                    htmlType="submit"
                    disabled={loading}
                  >
                    Enter
                    {loading && <Spin size="large" style={{ marginLeft: 8 }} />}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <p
            className="text-center m-0 me-2"
            style={{ fontSize: "24px", color: "white" }}
          >
            To enter as a guest, press next
          </p>
          <Link to="/question">
            <Button
              className="d-flex justify-content-center align-items-center"
              style={{ fontSize: "20px" }}
              onClick={() => handleTextToSpeech('Please select location, soil type, crop name and yield for fertilizer predictions')}
            >
              <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

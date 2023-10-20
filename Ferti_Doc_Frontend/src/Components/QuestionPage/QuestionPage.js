import React, { useContext, useState } from "react";
import { Button, Col, Form, Input, Row, Spin, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./QuestionPage.css";
import data from "./data";
import baseUrl from "../../config";
import { systemContext } from "../../App";
import axios from "axios";

export default function QuestionPage() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [soilTypes, setSoilTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { customerDetails, setCustomerDetails, prediction, setPrediction } =
    useContext(systemContext);
  const [audioPlayedOnLocationChange, setAudioPlayedOnLOcationChange] =
    useState(true);
  const [audioPlayedOnLocationClick, setAudioPlayedOnLocationClick] =
    useState(true);

  const [audioPlayedOnSoilChange, setAudioPlayedOnSoilChange] = useState(true);
  const [audioPlayedOnSoilClick, setAudioPlayedOnSoilClick] = useState(true);

  const [audioPlayedOnCropChange, setAudioPlayedOnCropChange] = useState(true);
  const [audioPlayedOnCropClick, setAudioPlayedOnCropClick] = useState(true);

  const [audioPlayedOnYieldChange, setAudioPlayedOnYieldChange] =
    useState(true);
  const [audioPlayedOnYieldClick, setAudioPlayedOnYieldClick] = useState(true);

  const resetSoilType = () => {
    form.resetFields(["soil_type"]); // Reset only the "soil_type" field
  };
  const resetCropName = () => {
    form.resetFields(["crop_name"]); // Reset only the "soil_type" field
  };

  const handleLocationChange = (value) => {
    if (audioPlayedOnLocationChange) {
      handleTextToSpeech(`Your Selected Location is ${value}`);
    }
    resetSoilType();
    resetCropName();
    setSoilTypes([]);
    setProducts([]);
    const selectedLocation = data.find((item) => item.location === value);
    if (selectedLocation) {
      const locationSoilTypes = selectedLocation.soilTypes;
      setSoilTypes(locationSoilTypes);
    } else {
      setSoilTypes([]);
    }
  };

  const handleSoilTypeChange = (value) => {
    if (audioPlayedOnSoilChange) {
      handleTextToSpeech(`Your Selected Soil Type is ${value}`);
    }

    resetCropName();
    setProducts([]);
    const selectedSoilType = soilTypes.find((item) => item.soilType === value);
    if (selectedSoilType) {
      const soilTypeProducts = selectedSoilType.products;
      console.log(soilTypeProducts);
      setProducts(soilTypeProducts);
    } else {
      setProducts([]);
    }
  };
  const handleCropChange = (value) => {
    if (audioPlayedOnCropChange) {
      handleTextToSpeech(`Your Selected Crop Name is ${value}`);
    }
  };

  const handleYield = (e) => {
    if(audioPlayedOnYieldChange){
    handleTextToSpeech(`Your expected yield is ${e.target.value}`);
    }
  };

  const handleLocationSelectClick = () => {
    if (audioPlayedOnLocationClick) {
      handleTextToSpeech("Please choose your location");
      setAudioPlayedOnLocationClick(false);
    }
    // Handle the rest of the onClick logic
  };

  const handleSoilSelectClick = () => {
    if (audioPlayedOnSoilClick) {
      handleTextToSpeech("Please choose your soil type");
      setAudioPlayedOnSoilClick(false);
    }
    
  };

  const handleCropSelectClick = () => {
    if (audioPlayedOnCropClick) {
      handleTextToSpeech("Please choose your crop name");
      setAudioPlayedOnCropClick(false);
    }
  };

  const handleYieldClick = () => {
    if (audioPlayedOnYieldClick) {
      handleTextToSpeech("Please enter expected yield");
      setAudioPlayedOnYieldClick(false);
    }
  }
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
    if (data) {
      fetch(`${baseUrl}/api/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // Remove negative values and their variables from the response
          const filteredPrediction = {};
          for (const key in data.prediction) {
            if (data.prediction[key] >= 0) {
              filteredPrediction[key] = data.prediction[key];
            }
          }
          // Set the filtered prediction in state
          filteredPrediction.user_input = data?.prediction?.user_input;
          localStorage.setItem(
            "predictionData",
            JSON.stringify(filteredPrediction)
          );
          console.log(filteredPrediction);
          setPrediction(filteredPrediction);
        });
      navigate("/recommend");
    }
  };
  return (
    <div>
      <header className="headerDesign">
        <h1>Agrigate Ferti-Doc</h1>
      </header>
      <div className="bodyDesign">
        <p className="text-center mt-5" style={{ fontSize: "24px" }}>
          <strong>You can select options or can use voice system</strong>
        </p>
        <div className="d-flex justify-content-center m-2 mt-5">
          <Form
            className="w-50"
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
          >
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  hasFeedback
                  name="Location"
                  rules={[
                    {
                      required: true,
                      message: "Please select your location",
                    },
                  ]}
                >
                  <Select
                    placeholder="Location"
                    size="large"
                    className="selectDesign w-100"
                    onChange={handleLocationChange}
                    onClick={handleLocationSelectClick}
                  >
                    {data?.map((item, index) => (
                      <Option value={item.location} key={index}>
                        {item.location}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  hasFeedback
                  name="Soil_Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select soil type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Soil Type"
                    size="large"
                    className="selectDesign"
                    onChange={handleSoilTypeChange}
                    onClick={handleSoilSelectClick}
                  >
                    {soilTypes?.map((item, index) => (
                      <Option value={item.soilType} key={index}>
                        {item.soilType}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  hasFeedback
                  name="Crop_Name"
                  rules={[
                    {
                      required: true,
                      message: "Please select crop name",
                    },
                  ]}
                >
                  <Select
                    placeholder="Crop Name"
                    size="large"
                    className="selectDesign w-100"
                    onChange={handleCropChange}
                    onClick={handleCropSelectClick}
                  >
                    {products?.map((product, index) => (
                      <Option value={product} key={index}>
                        {product}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  hasFeedback
                  name="Yield"
                  rules={[
                    {
                      required: true,
                      message: "Please enter yield",
                    },
                    {
                      pattern: /^[0-9]+(\.[0-9]+)?$/,
                      message: "Please enter a valid number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Yield"
                    size="large"
                    style={{ borderRadius: 0 }}
                    onChange={handleYield}
                    onClick={handleYieldClick}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="w-100 mt-4 d-flex justify-content-end">
              <Form.Item>
                <Button
                  className="submitButtonDesign m-0"
                  htmlType="submit"
                  disabled={loading}
                >
                  Submit
                  {loading && <Spin size="large" style={{ marginLeft: 8 }} />}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

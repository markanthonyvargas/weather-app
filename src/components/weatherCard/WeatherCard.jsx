import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Modal from "react-bootstrap/Modal";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const apiKey = process.env.REACT_APP_API_KEY;

function WeatherCard() {
  const [response, setResponse] = useState(null);
  const [isLocationDenied, setLocationDenied] = useState(false);
  const [temperatureMode, setTemperatureMode] = useState("fahrenheit");
  const [fahrenheitTemperatureVariant, setFahrenheitTemperatureVariant] =
    useState("success");
  const [celsiusTemperatureVariant, setCelsiusTemperatureVariant] =
    useState("primary");

  const getWeatherInfo = (latitude, longitude) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => console.error(error));
  };

  const success = (position) => {
    const userCoords = position.coords;
    getWeatherInfo(userCoords.latitude, userCoords.longitude);
  };

  const error = (err) => {
    console.warn(`Error(${err.code}): ${err.message}`);
    setLocationDenied(true);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const fahrenheitButtonClick = () => {
    setTemperatureMode("fahrenheit");
    setFahrenheitTemperatureVariant("success");
    setCelsiusTemperatureVariant("primary");
  };

  const celsiusButtonClick = () => {
    setTemperatureMode("celsius");
    setCelsiusTemperatureVariant("success");
    setFahrenheitTemperatureVariant("primary");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (result.state === "denied") {
          setLocationDenied(true);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <ButtonGroup style={{ margin: "1% 0 1% 0" }}>
        <Button
          variant={fahrenheitTemperatureVariant}
          onClick={fahrenheitButtonClick}
        >
          Fahrenheit
        </Button>
        <Button
          variant={celsiusTemperatureVariant}
          onClick={celsiusButtonClick}
        >
          Celsius
        </Button>
      </ButtonGroup>
      <div className="d-flex justify-content-around">
        {isLocationDenied && (
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show
          >
            <Modal.Header>
              <Modal.Title>
                We can't determine your current location.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                We need access to your location in order to give you weather
                information for your current location.
              </p>
            </Modal.Body>
          </Modal>
        )}
        <Card style={{ width: "50%" }}>
          {response ? (
            <Card.Body>
              <h3>
                {response.location.name}, {response.location.region},{" "}
                {response.location.country}
              </h3>
              <Card.Img
                variant="top"
                src={response.current.condition.icon}
                style={{ width: "10rem" }}
              />
              <Card.Body>
                <Card.Title>
                  Current Temperature:{" "}
                  {Math.ceil(
                    temperatureMode === "fahrenheit"
                      ? response.current.temp_f
                      : response.current.temp_c
                  )}
                  °
                </Card.Title>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  Feels like:{" "}
                  {Math.ceil(
                    temperatureMode === "fahrenheit"
                      ? response.current.feelslike_f
                      : response.current.feelslike_c
                  )}
                  °
                </ListGroup.Item>
                <ListGroup.Item>
                  Humidity: {response.current.humidity}%
                </ListGroup.Item>
                <ListGroup.Item>
                  Last updated:{" "}
                  {new Date(
                    response.current.last_updated_epoch * 1000
                  ).toLocaleTimeString()}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          ) : (
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} bg="primary" />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={6} bg="primary" />
                <br />
                <Placeholder xs={6} bg="primary" />
                <br />
                <Placeholder xs={6} bg="primary" />
              </Placeholder>
            </Card.Body>
          )}
        </Card>
      </div>
    </>
  );
}
export default WeatherCard;

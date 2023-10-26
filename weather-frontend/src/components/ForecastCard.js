import { useEffect, useState } from "react";
import { Card, Image, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import unixToTime from "./helpers/time";

export default function ForecastCard({ forecast }) {
    const [forecastData, setForecastData] = useState();

    useEffect(() => {
        const fetchForecast = async () => {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${forecast.latitude}&lon=${forecast.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=imperial`
            );

            if (response.ok) {
                setForecastData(await response.json());
            } else {
                setForecastData([]);
            }
        };

        fetchForecast();
    }, [forecast]);

    return (
        <>
            {forecastData && (
                <Link
                    to="/forecast"
                    state={{ forecast: forecast, forecastData: forecastData }}
                    style={{ textDecoration: "none" }}
                >
                    <Card className="bg-secondary border border-info text-dark">
                        <Card.Body>
                            <Card.Title>{forecast.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted-white">
                                {forecastData.city.name}
                            </Card.Subtitle>
                            <Row className="text-center">
                                {forecastData &&
                                    forecastData.list
                                        .slice(0, 4)
                                        .map((hour) => {
                                            return (
                                                <>
                                                    <Col>
                                                        <p className="mb-0">
                                                            <Unicons.UilClockTwo
                                                                size="14"
                                                                color="#61DAFB"
                                                            />{" "}
                                                            {unixToTime(
                                                                hour.dt
                                                            )}
                                                        </p>
                                                        <Image
                                                            className="mb-0"
                                                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                                        />
                                                        <p className="mb-0">
                                                            {hour.weather[0].description.replace(
                                                                /\b\w/g,
                                                                (char) =>
                                                                    char.toUpperCase()
                                                            )}
                                                        </p>
                                                    </Col>
                                                    <Col className="text-left mt-2">
                                                        <p className="mb-2">
                                                            Wind
                                                            <Unicons.UilWind
                                                                size="14"
                                                                color="#61DAFB"
                                                            />{" "}
                                                            {Math.round(
                                                                hour.wind.speed
                                                            )}
                                                        </p>
                                                        <p className="mb-2">
                                                            Gust
                                                            <Unicons.UilWind
                                                                size="14"
                                                                color="#61DAFB"
                                                            />{" "}
                                                            {Math.round(
                                                                hour.wind.gust
                                                            )}
                                                        </p>
                                                        <p className="mb-0">
                                                            Direction
                                                            <Unicons.UilCompass
                                                                size="14"
                                                                color="#61DAFB"
                                                            />{" "}
                                                            {Math.round(
                                                                hour.wind.deg
                                                            )}
                                                        </p>
                                                    </Col>
                                                </>
                                            );
                                        })}
                            </Row>
                        </Card.Body>
                    </Card>
                </Link>
            )}
        </>
    );
}

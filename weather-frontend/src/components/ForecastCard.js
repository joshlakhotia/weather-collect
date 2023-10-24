import { useEffect, useState } from "react";
import { Card, Image, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import unixToTime from "./helpers/time";

export default function ForecastCard({ forecast }) {
    const [forecastData, setForecastData] = useState();

    const API_KEY = "714e8dab6cb637b9dbfbf501c2245805";

    useEffect(() => {
        const fetchForecast = async () => {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${forecast.latitude}&lon=${forecast.longitude}&appid=${API_KEY}&units=imperial`
            );

            if (response.ok) {
                setForecastData(await response.json());
            } else {
                setForecastData([]);
            }
        };

        fetchForecast();
    }, []);

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
                                <Col className="">
                                    <p className="mb-1">
                                        <Unicons.UilClockTwo
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[0].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockThree
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[1].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[1].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockFive
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[2].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[2].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockEight
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[3].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[3].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockSeven
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[4].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[4].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockNine
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[5].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[5].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClockTen
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[6].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[6].weather[0].icon}.png`}
                                    />
                                </Col>
                                <Col>
                                    <p className="mb-1">
                                        <Unicons.UilClock
                                            size="14"
                                            color="#61DAFB"
                                        />{" "}
                                        {unixToTime(forecastData.list[7].dt)}
                                    </p>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${forecastData.list[7].weather[0].icon}.png`}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Link>
            )}
        </>
    );
}

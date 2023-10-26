import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import unixToTime from "../helpers/time";

export default function Forecast() {
    const location = useLocation();
    const { forecast, forecastData } = location.state;

    return (
        <Container className="text-white">
            <Row>
                <h1>{forecast.name} Forecast</h1>
            </Row>
            <Row>
                <p className="">{forecast.notes}</p>
            </Row>
            {forecastData.list.slice(0, 10).map((hour) => {
                return (
                    <Row className="border-bottom border-info mb-2">
                        <Col lg={0.5}>
                            <h5 className="text-info">{unixToTime(hour.dt)}</h5>
                        </Col>
                        <Col lg={1}>
                            <Image
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                            />
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Temp</h5>
                            <p>{Math.round(hour.main.temp)}</p>
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Feels Like</h5>
                            <p>{Math.round(hour.main.feels_like)}</p>
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Humidity</h5>
                            <p>{Math.round(hour.main.humidity)}</p>
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Wind</h5>
                            <p>{Math.round(hour.wind.speed)}</p>
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Direction</h5>
                            <p>{Math.round(hour.wind.deg)}</p>
                        </Col>
                        <Col lg={1} className="text-center">
                            <h5 className="text-info">Gust</h5>
                            <p>{Math.round(hour.wind.gust)}</p>
                        </Col>
                    </Row>
                );
            })}
            <Row className="mb-1">
                <Col lg={2}>
                    <Button
                        variant="outline-info"
                        as={Link}
                        to="/forecast-form"
                        state={{
                            collectionId: forecast.weatherCollectionId,
                            forecastId: forecast.weatherForecastId,
                        }}
                    >
                        Edit This Forecast
                    </Button>
                </Col>
            </Row>
            <Row></Row>
        </Container>
    );
}

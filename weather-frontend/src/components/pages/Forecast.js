import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Forecast() {
    const location = useLocation();
    const { forecast, forecastData } = location.state;

    console.log(forecast);
    console.log(forecastData);

    return (
        <Container>
            <Row>
                <h1 className="text-white">{forecast.name} Forecast</h1>
            </Row>
            <Row>
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
        </Container>
    );
}

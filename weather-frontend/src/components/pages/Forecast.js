import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Forecast() {
    const location = useLocation();
    const { forecast, forecastData } = location.state;

    console.log(forecast);
    console.log(forecastData);

    return (
        <Container>
            <h1 className="text-white">{forecast.name} Forecast</h1>
        </Container>
    );
}

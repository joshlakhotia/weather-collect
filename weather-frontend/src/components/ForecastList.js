import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForecastList({ collectionId }) {
    const [forecastList, setForecastList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const url = `http://localhost:8080/api/forecast/collection/${collectionId}`;

            const init = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "weatherToken"
                    )}`,
                },
            };

            const response = await fetch(url, init);
            if (response.ok) {
                setForecastList(await response.json());
            }
        };

        fetchList();
    }, [collectionId]);

    return (
        <>
            <Container fluid>
                <Row className="text-white">
                    {forecastList.length !== 0 ? (
                        forecastList.map((forecast) => (
                            <Row className="text-white">{forecast.name}</Row>
                        ))
                    ) : (
                        <p>Wow such quite</p>
                    )}
                </Row>
                <Row>
                    <Col lg={2}>
                        <Button
                            variant="outline-info"
                            as={Link}
                            to="/forecast-form"
                            state={collectionId}
                        >
                            Add Forecast To Collection
                        </Button>
                    </Col>
                    <Col lg={2}>
                        <Button
                            variant="outline-info"
                            as={Link}
                            to="/collection-form"
                            state={collectionId}
                        >
                            Edit This Collection
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

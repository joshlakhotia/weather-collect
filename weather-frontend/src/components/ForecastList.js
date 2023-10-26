import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Row,
    ToggleButton,
    ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ForecastCard from "./ForecastCard";

export default function ForecastList({ collectionId }) {
    const [forecastList, setForecastList] = useState([]);
    const [units, setUnits] = useState("imperial");

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
            <Container fluid className="text-white">
                <Row>
                    {forecastList.length !== 0 ? (
                        forecastList.map((forecast) => (
                            <Row className="text-white mb-3">
                                <ForecastCard
                                    forecast={forecast}
                                    units={units}
                                />
                            </Row>
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
                            state={{
                                collectionId: collectionId,
                                forecastId: 0,
                            }}
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
                    <Col>
                        <ButtonGroup className="mb-3">
                            <ToggleButton
                                id="imperial"
                                type="radio"
                                variant="outline-info"
                                name="radio"
                                value="imperial"
                                checked={units === "imperial"}
                                onChange={(e) =>
                                    setUnits(e.currentTarget.value)
                                }
                            >
                                Imperial
                            </ToggleButton>
                            <ToggleButton
                                id="metric"
                                type="radio"
                                variant="outline-info"
                                name="radio"
                                value="metric"
                                checked={units === "metric"}
                                onChange={(e) =>
                                    setUnits(e.currentTarget.value)
                                }
                            >
                                Metric
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

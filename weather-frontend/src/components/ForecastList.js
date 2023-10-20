import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function ForecastList({ collectionId }) {
    const [forecastList, setForecastList] = useState();

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
            } else {
                setForecastList([]);
            }
        };

        fetchList();
    }, [collectionId]);

    return (
        <>
            <Container fluid>
                <Row className="text-white">
                    {forecastList && forecastList[0].name}
                </Row>
            </Container>
        </>
    );
}

import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Container, Row, Col } from "react-bootstrap";
import ForecastList from "./ForecastList";
import { Link } from "react-router-dom";

export default function Collections() {
    const [collections, setCollections] = useState();
    const [collectionId, setCollectionId] = useState();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchCollections = async () => {
            const url = `http://localhost:8080/api/collection/user/${auth.user.userId}`;
            const init = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "weatherToken"
                    )}`,
                },
            };

            const response = await fetch(url, init);
            if (response.ok) {
                setCollections(await response.json());
            } else {
                setCollections([]);
            }
        };

        fetchCollections();
    }, []);

    useEffect(() => {
        if (collections && collections.length !== 0) {
            setCollectionId(collections[0].weatherCollectionId);
        }
    }, [collections]);

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="border-end border-info m-3 text-center">
                    <h1 className="text-white">My Collections</h1>
                    {collections &&
                        collections.map((collection) => (
                            <div
                                key={collection.weatherCollectionId}
                                className="text-center d-grid gap-2  my-4"
                            >
                                <Button
                                    variant="outline-info"
                                    onClick={() => {
                                        setCollectionId(
                                            collection.weatherCollectionId
                                        );
                                    }}
                                >
                                    {collection.name}
                                </Button>
                            </div>
                        ))}
                    <Button
                        as={Link}
                        to="/collection-form"
                        variant="outline-warning"
                        state={0}
                    >
                        Add Collection
                    </Button>
                </Col>
                <Col className="m-3">
                    <h1 className="text-white">Forecasts</h1>
                    {collectionId ? (
                        <ForecastList collectionId={collectionId} />
                    ) : (
                        <p className="text-white">Wow such quite</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

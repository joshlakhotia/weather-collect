import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import GoogleMapReact from "google-map-react";

export default function ForecastForm() {
    const auth = useContext(AuthContext);
    const location = useLocation();
    const { collectionId, forecastId } = location.state;
    console.log(collectionId);
    console.log(forecastId);

    const [showModal, setShowModal] = useState(false);
    const [forecast, setForecast] = useState({
        name: "",
        notes: "",
        latitude: "",
        longitude: "",
        weatherCollectionId: collectionId,
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (forecastId > 0) {
            fetch(`http://localhost:8080/api/forecast/${forecastId}`)
                .then((res) => res.json())
                .then(setForecast)
                .catch(console.error);
        }
    }, [forecastId]);

    function handleClose() {
        setShowModal(false);
    }

    function handleOpen() {
        setShowModal(true);
    }

    function handleChange(evt) {
        setForecast((previous) => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            console.log(next);
            return next;
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        let url;
        let method;

        if (forecastId > 0) {
            url = `http://localhost:8080/api/forecast/${forecastId}`;
            method = "PUT";
        } else {
            url = `http://localhost:8080/api/forecast`;
            method = "POST";
        }

        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forecast),
        };

        fetch(url, config)
            .then((response) => {
                if (response.ok) {
                    navigate("/forecasts");
                } else {
                    return response.json();
                }
            })
            .then((errs) => {
                if (errs) {
                    return Promise.reject(errs);
                }
            })
            .catch((errs) => {
                if (errs.length) {
                    setErrors(errs);
                } else {
                    setErrors([errs]);
                }
            });
    }

    function handleDelete(evt) {
        evt.preventDefault();

        const config = {
            method: "DELETE",
        };

        fetch(`http://localhost:8080/api/forecast/${forecastId}`, config)
            .then((response) => {
                if (response.ok) {
                    navigate("/forecasts");
                } else {
                    return response.json();
                }
            })
            .then((errs) => {
                if (errs) {
                    return Promise.reject(errs);
                }
            })
            .catch((errs) => {
                if (errs.length) {
                    setErrors(errs);
                } else {
                    setErrors([errs]);
                }
            });
    }

    function handleClick(evt) {
        setForecast((previous) => {
            const next = { ...previous };
            next.latitude = evt.lat.toFixed(6);
            next.longitude = evt.lng.toFixed(6);
            console.log(next);
            return next;
        });
    }

    return (
        <Container className="text-white">
            <Row>
                <h1>{forecastId > 0 ? "Edit Forecast" : "Add Forecast"}</h1>
                {errors && errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0">
                            {errors.map((err) => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Row>
            <Row>
                <Col lg={5}>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-10">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    required
                                    onChange={handleChange}
                                    value={forecast.name}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-10">
                                <label className="form-label" htmlFor="notes">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    type="textarea"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={forecast.notes}
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4 mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="latitude"
                                >
                                    Latitude
                                </label>
                                <input
                                    id="latitude"
                                    name="latitude"
                                    type="text"
                                    className="form-control"
                                    required
                                    min="-90"
                                    max="90"
                                    onChange={handleChange}
                                    value={forecast.latitude}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="longitude"
                                >
                                    Longitude
                                </label>
                                <input
                                    id="longitude"
                                    name="longitude"
                                    type="text"
                                    className="form-control"
                                    required
                                    min="-180"
                                    max="180"
                                    onChange={handleChange}
                                    value={forecast.longitude}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <Col lg={2}>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onSubmit={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button
                                    variant="outline-info"
                                    onClick={() => navigate("/forecasts")}
                                >
                                    Cancel
                                </Button>
                            </Col>
                            {forecastId > 0 && (
                                <Col lg={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={handleOpen}
                                    >
                                        Delete Collection
                                    </Button>
                                </Col>
                            )}
                        </div>
                    </form>
                </Col>
                <Col lg={5}>
                    <h6>Click location to autofill lat/lng</h6>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: "AIzaSyA8xewRO9kZK1rNabC1eZ0IwgGlliEwNbo",
                        }}
                        defaultCenter={{ lat: 40, lng: -111 }}
                        defaultZoom={5}
                        onClick={handleClick}
                    ></GoogleMapReact>
                </Col>
            </Row>
            <Modal className="" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {forecast.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This will permanently delete this forecast. Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

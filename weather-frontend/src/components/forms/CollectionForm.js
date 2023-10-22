import { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

export default function CollectionForm() {
    const auth = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    const [collection, setCollection] = useState({
        name: "",
        description: "",
        userId: auth.user.userId,
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();
    const collectionId = location.state ? location.state : 0;
    console.log(collectionId);

    let name;

    useEffect(() => {
        if (collectionId > 0) {
            fetch(`http://localhost:8080/api/collection/${collectionId}`)
                .then((res) => res.json())
                .then(setCollection)
                .catch(console.error);
            name = collection.name;
        }
    }, [collectionId]);

    function handleClose() {
        setShowModal(false);
    }

    function handleOpen() {
        setShowModal(true);
    }

    function handleChange(evt) {
        setCollection((previous) => {
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

        if (collectionId > 0) {
            url = `http://localhost:8080/api/collection/${collectionId}`;
            method = "PUT";
        } else {
            url = `http://localhost:8080/api/collection`;
            method = "POST";
        }

        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collection),
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

        fetch(`http://localhost:8080/api/collection/${collectionId}`, config)
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

    return (
        <Container className="text-white">
            <Row>
                <h1>
                    {collectionId > 0 ? `Edit Collection` : "Add Collection"}
                </h1>
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
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-5">
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
                                value={collection.name}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-5">
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                type="textarea"
                                className="form-control"
                                onChange={handleChange}
                                value={collection.description}
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <Col lg={1}>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onSubmit={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Col>
                        <Col lg={1}>
                            <Button
                                variant="outline-info"
                                onClick={() => navigate("/forecasts")}
                            >
                                Cancel
                            </Button>
                        </Col>
                        {collectionId > 0 && (
                            <Col lg={2}>
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
            </Row>
            <Modal className="" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {collection.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This will delete the collection and all associated
                    forecasts. Are you sure?
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

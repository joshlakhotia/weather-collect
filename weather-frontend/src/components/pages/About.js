import { Container, Row, Col } from "react-bootstrap";

function About() {
    return (
        <>
            <Container className="text-white">
                <Row className="my-5">
                    <h1>About</h1>
                </Row>
                <Row className="mb-4">
                    <Col lg={7}>
                        <h3 className="border-bottom border-info">
                            Making the mission to see multiple forecasts easier
                        </h3>
                        <p>
                            A weather project born out of the frustration of
                            having to have several tabs open to view forecasts
                            to make a decision for an outdoor activity that day.
                            Now, all the forecasts you could want are on one
                            page, completely customizable by you.
                        </p>
                        <p>
                            Make custom collections of certain activities or
                            places. Then add the forecasts for locations that
                            you want to those collections too see which area has
                            the best weather for your requirements. Saves you
                            effort in the preparation stage, so you have more
                            time in the having fun stage.
                        </p>
                    </Col>
                    <Col className="bg-secondary mx-3 rounded">
                        <h4 className="text-info my-2">
                            Weather Collect Facts
                        </h4>
                        <h6 className="text-info">Created</h6>
                        <p>2023</p>
                        <h6 className="text-info">Creator</h6>
                        <p>Josh Lakhotia</p>
                        <h6 className="text-info">Initial Public Offering</h6>
                        <p>TBD</p>
                    </Col>
                </Row>
                <Row></Row>
                <Row>
                    <p>
                        For more information or concerns contact
                        joshlakhotia@protonmail.com
                    </p>
                </Row>
            </Container>
        </>
    );
}

export default About;

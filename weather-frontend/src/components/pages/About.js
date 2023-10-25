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
                            The mission to see multiple forecasts more simple
                        </h3>
                        <p>
                            A weather project born out of the frustration of
                            having to have several tabs open to view forecasts
                            to make a decision for an outdoor activity that day.
                            Now, all the forecasts I want are on one page.
                        </p>
                        <p>
                            You don't want to see the forecasts I want to see?
                            WHAT? No worries. I've created this website to let
                            you customize your own forecasts into "collections",
                            or activities, to make the choice for what you do
                            that day even easier.
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

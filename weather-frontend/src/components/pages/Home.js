import { Carousel, Row, Col } from "react-bootstrap";

function Home() {
    return (
        <>
            <Carousel className="mb-5">
                <Carousel.Item>
                    <img
                        className="image-fluid w-100"
                        height={900}
                        src="https://images.squarespace-cdn.com/content/v1/5f0d3b387372cf4b2a8f40d3/1689892661050-7X4H744PR3PP5R2WBZP0/_DSC0660.jpg?format=2500w"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Forecasts for the Outdoor Enthusiast</h3>
                        <p>
                            Make it easier to choose between your favorite
                            activities
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="image-fluid w-100"
                        height={900}
                        src="https://img.redbull.com/images/w_3000/q_auto,f_auto/redbullcom/2014/06/27/1331661759955_2/adriatic-circle-the-longest-hike-and-fly.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>See Every Forecast </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="w-100 image-fluid "
                        height={900}
                        src="https://www.hcn.org/issues/47.12/deaths-renew-calls-for-national-parks-to-rescind-base-jumping-bans/basejumping-jpg/image"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Col lg={6} className="mb-3 mx-auto">
                <h4 className="text-white text-center">Adventure</h4>
                <p className="text-white text-center">
                    Introducing Weather Collect, the ultimate companion for
                    outdoor enthusiasts! Whether you're an avid hiker, a
                    dedicated cyclist, or a weekend warrior seeking adventure,
                    WeatherWise is your go-to app for conquering the great
                    outdoors with confidence. Our app offers a unique blend of
                    precision and simplicity, designed to keep you in the know
                    about weather conditions, so you can make the most of your
                    outdoor experiences.
                </p>
            </Col>
            <Row></Row>
        </>
    );
}

export default Home;

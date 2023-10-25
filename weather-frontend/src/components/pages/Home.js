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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris commodo quis imperdiet massa tincidunt nunc
                    pulvinar sapien et. Consequat interdum varius sit amet
                    mattis. Mauris pharetra et ultrices neque ornare aenean
                    euismod. Tempor id eu nisl nunc mi. Ac tortor dignissim
                    convallis aenean. Gravida arcu ac tortor dignissim
                    convallis. Massa tempor nec feugiat nisl pretium fusce id.
                    Tortor aliquam nulla facilisi cras fermentum. Nunc sed id
                    semper risus. Enim ut sem viverra aliquet. Vel facilisis
                    volutpat est velit egestas dui id. Mus mauris vitae
                    ultricies leo integer malesuada nunc. Orci phasellus egestas
                    tellus rutrum tellus pellentesque. Amet nulla facilisi morbi
                    tempus iaculis urna id. Enim diam vulputate ut pharetra sit.
                    Odio euismod lacinia at quis. Ac turpis egestas maecenas
                    pharetra convallis posuere morbi leo urna.
                </p>
            </Col>
            <Row></Row>
        </>
    );
}

export default Home;

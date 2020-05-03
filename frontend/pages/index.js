import Carousel from "../components/Carousel";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <Container style={{display: "flex", position: "relative", height: '100%'}}>
      <Carousel />
    </Container>
  );
};

export default Home;

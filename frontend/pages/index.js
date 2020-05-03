import Carousel from "../components/Carousel";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <Container style={{display: "flex"}}>
      <Carousel/>
    </Container>
  );
};

export default Home;

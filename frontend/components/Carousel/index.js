import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import styles from "./Carousel.module.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => (
  <AutoplaySlider className={styles.awsBtn} play={true} fillParent={true} bullets={false} organicArrows={false}>
    <div data-src="/static/images/pizza1.jpg"></div>
    <div data-src="/static/images/slideTwo.webp"></div>
    <div data-src="/static/images/slideThree.jpg"></div>
  </AutoplaySlider>
);

export default Slider;

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import styles from "./Carousel.module.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = ({images, isIndexPage}) => (
  <AutoplaySlider className={styles.awsBtn} play={isIndexPage} fillParent={isIndexPage} bullets={false} organicArrows={true}>
    {images.map((src, index) => <div data-src={src} key={index}></div>)}
  </AutoplaySlider>
);

export default Slider;

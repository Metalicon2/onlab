import AwesomeSlider from 'react-awesome-slider';
import styles from "./Carousel.module.css"; 

const slider = () => (
  <AwesomeSlider className={styles.awsBtn} fillParent={true} bullets={false}>
    <div data-src="/static/images/pizza1.jpg">1</div>
    <div data-src="/static/images/slideTwo.webp">2</div>
    <div data-src="/static/images/slideThree.jpg"></div>
  </AwesomeSlider>
);

export default slider;
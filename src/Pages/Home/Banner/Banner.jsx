import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/home/01.jpg";
import bannerImg2 from "../../../assets/home/02.jpg";
import bannerImg3 from "../../../assets/home/03.png";
import bannerImg4 from "../../../assets/home/04.jpg";
import bannerImg5 from "../../../assets/home/05.png";
import bannerImg6 from "../../../assets/home/06.png";
import './Banner.css'
const Banner = () => {
  return (
    <Carousel showStatus={false} autoPlay={true} interval={3000} showThumbs={true} thumbWidth={80}>
      <div>
        <img src={bannerImg1} alt="bannerImg1" />
      </div>
      <div>
        <img src={bannerImg2} alt="bannerImg2" />
      </div>
      <div>
        <img src={bannerImg3} alt="bannerImg3" />
      </div>
      <div>
        <img src={bannerImg4} alt="bannerImg4" />
      </div>
      <div>
        <img src={bannerImg5} alt="bannerImg5" />
      </div>
      <div>
        <img src={bannerImg6} alt="bannerImg6" />
      </div>
    </Carousel>
  );
};

export default Banner;

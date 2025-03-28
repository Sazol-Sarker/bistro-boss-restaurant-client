// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
// import "swiper/css/autoplay";

import slideImg1 from "../../../assets/home/slide1.jpg";
import slideImg2 from "../../../assets/home/slide2.jpg";
import slideImg3 from "../../../assets/home/slide3.jpg";
import slideImg4 from "../../../assets/home/slide4.jpg";
import slideImg5 from "../../../assets/home/slide5.jpg";
import "./Category.css";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="mt-10">
      <section>
        <SectionTitle
          subHeading={"From 11:00am to 10:00pm"}
          heading={"ORDER ONLINE"}
        ></SectionTitle>
      </section>
      <Swiper
        slidesPerView={4}
        // slidesPerView={'auto'}
        spaceBetween={20}
        grabCursor={true}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500, // Delay between transitions (ms)
        //   disableOnInteraction: false, // Keeps autoplay running after user interaction
        // }}
        // loop={true} // Enables infinite looping
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {/* <SwiperSlide>
        <img src={slideImg1} alt="slideImg1" className="" />
        <h3 className="text-2xl uppercase text-center text-violet-800 -mt-10 font-bold">
          Salads
        </h3>
      </SwiperSlide> */}
        {/* slide 1 */}
        <SwiperSlide className="relative">
          <img src={slideImg1} alt="slideImg1" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Salads
          </h3>
        </SwiperSlide>
        {/* slide 2 */}
        <SwiperSlide className="relative">
          <img src={slideImg2} alt="slideImg2" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Soups
          </h3>
        </SwiperSlide>
        {/* slide 3 */}
        <SwiperSlide className="relative">
          <img src={slideImg3} alt="slideImg3" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Pizzas
          </h3>
        </SwiperSlide>
        {/* slide 4 */}
        <SwiperSlide className="relative">
          <img src={slideImg4} alt="slideImg4" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Deserts
          </h3>
        </SwiperSlide>
        {/* slide 5 */}
        <SwiperSlide className="relative">
          <img src={slideImg5} alt="slideImg5" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Salads
          </h3>
        </SwiperSlide>
        {/* slide 6 */}
        <SwiperSlide className="relative">
          <img src={slideImg5} alt="slideImg5" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Soups
          </h3>
        </SwiperSlide>
        {/* slide 6 */}
        <SwiperSlide className="relative">
          <img src={slideImg5} alt="slideImg5" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Pizzas
          </h3>
        </SwiperSlide>
        {/* slide 6 */}
        <SwiperSlide className="relative">
          <img src={slideImg5} alt="slideImg5" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Salads
          </h3>
        </SwiperSlide>
        {/* slide 6 */}
        <SwiperSlide className="relative">
          <img src={slideImg5} alt="slideImg5" className="w-full h-auto" />
          <h3 className="absolute inset-x-0 bottom-4 text-2xl uppercase text-center text-white font-bold bg-black bg-opacity-50 py-2">
            Salads
          </h3>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;

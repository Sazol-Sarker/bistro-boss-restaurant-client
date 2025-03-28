import axios from "axios";
import { useEffect, useState } from "react";
import SectionTitle from "./../../../Components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa6";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  // console.log("reviews", reviews);
  useEffect(() => {
    axios.get("reviews.json").then((res) => {
      setReviews(res.data);
    });
  }, []);
  return (
    <section>
      <SectionTitle
        subHeading={"---What Our Clients Say---"}
        heading={"TESTIMONIALS"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center ">
              <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />

              <FaQuoteLeft className="text-4xl md:text-7xl mt-2" />
              <p className="w-3/4 text-md">{review.details}</p>
              <h3 className="text-[#CD9003] text-xl md:text-3xl uppercase">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

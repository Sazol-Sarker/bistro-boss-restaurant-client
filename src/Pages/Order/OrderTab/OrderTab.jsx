import FoodCard from "../../../Components/FoodCard/FoodCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import './OrderTab.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { useState } from "react";

const OrderTab = ({ category }) => {
  // console.log(category);
  const [currentPage, setCurrentPage] = useState(1);

  // lets prepare pagination data
  const totalItems = category.length;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // console.log(totalItems, itemsPerPage, totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = category.slice(startIndex, endIndex);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <>
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-40">
        {paginatedItems.map((item, idx) => (
          <FoodCard key={idx} item={item}></FoodCard>
        ))}
      </div> */}
      {/* <div className="my-20">
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
          slidesPerView={1}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          
        </Swiper>
      </div> */}

      <div className="">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        spaceBetween={20} // Adjust spacing between slides
        slidesPerView={1} // Shows one page of items
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => {
          const startIndex = pageIndex * itemsPerPage;
          const paginatedItems = category.slice(startIndex, startIndex + itemsPerPage);

          return (
            <SwiperSlide key={pageIndex}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2 md:gap-4">
                {paginatedItems.map((item, idx) => (
                  <FoodCard key={idx} item={item} />
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    </>
  );
};

export default OrderTab;

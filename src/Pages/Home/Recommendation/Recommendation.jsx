import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import axios from "axios";
const Recommendation = () => {
  const [offeredItems, setOfferedItems] = useState([]);
  // console.log("offeredItems=>", offeredItems);
  useEffect(() => {
    axios.get("menu.json").then((res) => {
      // console.log("rec menu=>", res.data);
      const menu = res.data;
      const offeredMenu = menu.filter((item) => item.category === "offered");
      setOfferedItems(offeredMenu);
    });
  }, []);

  // trim if items>3
  const offeredItemsWithoutLast = offeredItems.slice(0, -1);

  return (
    <section>
      <SectionTitle
        subHeading={"Should Try"}
        heading={"CHEF RECOMMENDS"}
      ></SectionTitle>

      {/* Group items */}
      {/* <div className="join join-vertical lg:join-horizontal">
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
      </div> */}

      {/* Card groups */}
      <div className="flex flex-wrap justify-center items-center md:flex-row gap-2 my-6 md:my-10">
        {offeredItemsWithoutLast.map((item, idx) => {
          return (
            <div
              key={idx}
              className="card mb-5 md:mb-10 bg-base-100 w-72 md:w-80 lg:w-96 shadow-xl"
            >
              <figure className="rounded-none">
                <img src={item.image} alt="featuredItem" />
              </figure>
              <div className="card-body items-center">
                <h2 className="card-title">{item.name}</h2>
                <p className="text-gray-700">{item.recipe}</p>
                <div className="card-actions mt-4 mb-2 justify-center">
                  <button className="btn text-[#BB8506] hover:bg-[#1F2937] border-b-2 border-0 border-[#BB8506]">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Recommendation;

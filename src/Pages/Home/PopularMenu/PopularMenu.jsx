import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [popularMenu, setPopularMenu] = useState([]);
  // console.log(popularMenu);
  // fetch menu items
  useEffect(() => {
    axios.get("menu.json").then((res) => {
      // console.log("MENU",res.data);
      const menu = res.data;
      // filter out popular items
      const popularItems = menu.filter((item) => item.category === "popular");
      setPopularMenu(popularItems);
    });
  }, []);

  return (
    <section className="flex flex-col mt-5 md:mt-10">
      <SectionTitle
        heading={"FROM OUR MENU"}
        subHeading={"Check it out"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-2 ml-2 md:gap-x-6 place-items-center">
        {popularMenu.map((menu) => (
          <MenuItem key={menu._id} menuItem={menu}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center"><button className="btn-neutral p-2 rounded-lg border-teal-500 border-2 hover:border-4 mt-5 text-[#1F2937] font-bold">View Full Menu</button></div>
    </section>
  );
};

export default PopularMenu;

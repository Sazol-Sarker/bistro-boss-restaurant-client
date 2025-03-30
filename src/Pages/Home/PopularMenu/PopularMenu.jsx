import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import MenuItemGrid from "../../Shared/MenuItemGrid/MenuItemGrid";
import useMenu from './../../../hooks/useMenu';

const PopularMenu = () => {
  const {menu} = useMenu();
  const popularMenu = menu.filter(item=>item.category==="popular")
  // console.log(popularMenu);
  // fetch menu items
  // useEffect(() => {
  //   axios.get("menu.json").then((res) => {
  //     // console.log("MENU",res.data);
  //     const menu = res.data;
  //     // filter out popular items
  //     const popularItems = menu.filter((item) => item.category === "popular");
  //     setPopularMenu(popularItems);
  //   });
  // }, []);

  return (
    <section className="flex flex-col mt-5 md:mt-10">
      <SectionTitle
        heading={"FROM OUR MENU"}
        subHeading={"Check it out"}

      ></SectionTitle>
       <MenuItemGrid menuItems={popularMenu} btnText={"View Full Menu"}></MenuItemGrid> 
    </section>
  );
};

export default PopularMenu;

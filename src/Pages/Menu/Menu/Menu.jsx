import React from "react";
import MenuCategory from "../MenuCategory/MenuCategory";
import CoverImg from "../../Shared/CoverImg/CoverImg";
import useMenu from "../../../hooks/useMenu";
import MenuItemGrid from "../../Shared/MenuItemGrid/MenuItemGrid";
import banner3 from "../../../assets/menu/banner3.jpg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
const Menu = () => {
  const { menu } = useMenu();
  // console.log(menu);
  const offeredMenu = menu.filter((item) => item.category === "offered");
  const pizzaMenu = menu.filter((item) => item.category === "pizza");
  const desertMenu = menu.filter((item) => item.category === "dessert");
  const soupMenu = menu.filter((item) => item.category === "soup");
  const saladMenu = menu.filter((item) => item.category === "salad");

  return (
    <div>
      <title>Bistro Boss Restaurant | Menu</title>
      <CoverImg
        heading={"OUR MENU"}
        subHeading={"would you like to try a dish?"}
        coverImg={banner3}
        height={"h-[700px]"}
        uppercase={true}
      ></CoverImg>

      <div className="my-5">
        {/* offeredMenu */}
        <MenuCategory
          menuTitle={true}
          menu={offeredMenu}
          heading={"don't miss"}
          subHeading={"today's offer"}
        ></MenuCategory>

        {/* desserts */}

        <MenuCategory
          menu={desertMenu}
          heading={"desserts"}
          subHeading={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
          coverImg={dessertBg}
        ></MenuCategory>

        {/* pizzas */}
        <MenuCategory
          menu={pizzaMenu}
          heading={"pizzas"}
          subHeading={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
          coverImg={pizzaBg}
        ></MenuCategory>

        {/* salads */}
        <MenuCategory
          menu={saladMenu}
          heading={"salads"}
          subHeading={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
          coverImg={saladBg}
        ></MenuCategory>

        {/* soups */}
        <MenuCategory
          menu={soupMenu}
          heading={"soups"}
          subHeading={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
          coverImg={soupBg}
        ></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;

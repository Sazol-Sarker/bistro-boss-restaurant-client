import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import MenuItemGrid from "../../Shared/MenuItemGrid/MenuItemGrid";
import useMenu from "./../../../hooks/useMenu";

const PopularMenu = () => {
  const { menu, loading } = useMenu();
  // console.log(menu);
  const popularMenu = menu.filter((item) => item.category === "popular");
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
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="flex flex-col mt-5">
      <SectionTitle
        heading={"FROM OUR MENU"}
        subHeading={"Check it out"}
      ></SectionTitle>
      <MenuItemGrid
        title={"offered"}
        // title={"popular"}
        menuItems={popularMenu}
        btnText={"View Full Menu"}
      ></MenuItemGrid>
    </section>
  );
};

export default PopularMenu;

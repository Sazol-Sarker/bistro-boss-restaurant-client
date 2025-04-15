import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderCover from "../../../assets/shop/banner2.jpg";
import CoverImg from "../../Shared/CoverImg/CoverImg";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../Components/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Order.css'
const Order = () => {
  // const [tabIndex, setTabIndex] = useState(0);
  const { category } = useParams();
  const { menu } = useMenu();
  const navigate=useNavigate()
  // console.log(menu);
  const offeredMenu = menu.filter((item) => item.category === "offered");
  const pizzaMenu = menu.filter((item) => item.category === "pizza");
  const desertMenu = menu.filter((item) => item.category === "dessert");
  const soupMenu = menu.filter((item) => item.category === "soup");
  const saladMenu = menu.filter((item) => item.category === "salad");
  const drinkMenu = menu.filter((item) => item.category === "drinks");
  const categories = ["offered", "pizza", "dessert", "soup", "salad", "drinks"];
  const categoriesMenu = [
    offeredMenu,
    pizzaMenu,
    desertMenu,
    soupMenu,
    saladMenu,
    drinkMenu,
  ];
  // Find the index of the category from the URL

  // console.log("categoriesMenu==>",categoriesMenu);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const defaultIndex =
    categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;
    setTabIndex(defaultIndex);
  }, [category,categories]);

  return (
    <div>
      <title>Bistro Boss Restaurant | Order</title>
      <CoverImg
        heading={"Order Food"}
        subHeading={"would you like to try a dish?"}
        coverImg={orderCover}
        height={"h-[600px]"}
        uppercase={true}
      ></CoverImg>

      {/* Food category tabs */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex justify-center font-bold text-gray-700/70 text-[16px] mb-5">
          <Tab>
            <Link to="/order/offered">Offered</Link>
          </Tab>
          <Tab>
            <Link to="/order/pizza">Pizza</Link>
          </Tab>
          <Tab>
            {/* check route here */}
            <Link to="/order/dessert">Dessert</Link>
          </Tab>
          <Tab>
            <Link to="/order/soup">Soup</Link>
          </Tab>
          <Tab>
            <Link to="/order/salad">Salad</Link>
          </Tab>
          <Tab>
            <Link to="/order/drinks">Drink</Link>
          </Tab>
        </TabList>
        {categoriesMenu.map((categoryMenu, idx) => (
          <TabPanel key={idx}>
            <OrderTab
              category={categoryMenu}
              className="flex items-center justify-center"
            ></OrderTab>
          </TabPanel>
        ))}
      </Tabs>

      {/* <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
          navigate(`/order/${categories[index]}`);
        }}
      >
        <TabList className="flex justify-center font-bold text-gray-700/70 text-[16px] mb-5">
          <Tab>Offered</Tab>
          <Tab>Pizza</Tab>
          <Tab>Dessert</Tab>
          <Tab>Soup</Tab>
          <Tab>Salad</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        {categoriesMenu.map((categoryMenu, idx) => (
          <TabPanel key={idx}>
            <OrderTab category={categoryMenu} />
          </TabPanel>
        ))}
      </Tabs> */}
    </div>
  );
};

export default Order;

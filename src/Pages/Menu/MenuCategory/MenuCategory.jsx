import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CoverImg from "../../Shared/CoverImg/CoverImg";
import MenuItemGrid from "../../Shared/MenuItemGrid/MenuItemGrid";

const MenuCategory = ({
  coverImg,
  menu,
  menuTitle = false,
  heading,
  subHeading,
}) => {
  return (
    <div className="my-5">
      {menuTitle ? (
        <SectionTitle heading={heading} subHeading={subHeading}></SectionTitle>
      ) : (
        <CoverImg
          heading={heading}
          subHeading={subHeading}
          coverImg={coverImg}
        ></CoverImg>
      )}

      <MenuItemGrid menuItems={menu}></MenuItemGrid>
    </div>
  );
};

export default MenuCategory;

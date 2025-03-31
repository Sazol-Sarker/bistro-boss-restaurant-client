import MenuItem from "../MenuItem/MenuItem";
import { Link } from "react-router-dom";

const MenuItemGrid = ({title, menuItems, btnText = "ORDER YOUR FAVOURITE FOOD" }) => {
  // console.log("menuItems=>", menuItems);
  return (
    <div className=" w-4/5 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-y-2 gap-x-3  md:gap-x-6 place-items-center">
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem._id} menuItem={menuItem}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link to={`/order/${title}`}>
          <button className="btn-neutral p-2 rounded-lg border-teal-500 border-b-4  mt-5 text-[#1F2937] font-bold uppercase">
            {/* View Full Menu */}
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuItemGrid;

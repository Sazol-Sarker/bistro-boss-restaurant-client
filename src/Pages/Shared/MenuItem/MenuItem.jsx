import { useEffect, useState } from "react";

const MenuItem = ({ menuItem }) => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { name, recipe, image, price } = menuItem;
  // const dashSm = " ------ ";
  // const dashLg = " ------------------ ";
  const dash = window.innerWidth <= 768 ? " ------ " : " ------------------ ";
// check device width:sm
  // useEffect(() => {
  //   setIsMobile(window.innerWidth <= 768);
  // }, [isMobile]);


  return (
    <div className="flex gap-1 md:gap-2 justify-center my-2">
      <div className="flex items-center ">
        <img
          src={image}
          alt={name}
          className="w-[100px] h-[80px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px]"
        />
        <div className="ml-2">
          <h3 className="text-2xl uppercase text-gray-400 mb-2">{name}
            <span>{dash}</span>
            {/* <span>{isMobile==true?dashSm:dashLg}</span> */}
             </h3>
          <p className="text-slate-400">{recipe}</p>
        </div>
      </div>
      {/* flex gap-4 items-center */}
      {/* text-end */}
      <div className="items-start justify-start text-[#BB8506]">${price}</div>
    </div>
  );
};

export default MenuItem;

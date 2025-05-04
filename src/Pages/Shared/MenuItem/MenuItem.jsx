const MenuItem = ({ menuItem }) => {
  const { name, recipe, image, price } = menuItem;
  
  const dash = " ------"
  

  return (
    <div className="flex gap-2 md:gap-5 lg:gap-10 justify-center my-2">
      <img
        src={image}
        alt={name}
        className="w-[100px] h-[80px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px]"
      />
      <div className=" flex flex-col  justify-start ">
        <div className="flex justify-between">
          <h3 className="text-md md:text-lg lg:text-xl  uppercase text-gray-400 mb-2 flex-1">
            {name} <span className="hidden lg:inline">{dash}</span>
          </h3>
          <h2 className="flex items-start justify-start text-[#BB8506] text-md md:text-lg ">${price}</h2>
        </div>
        <div className="text-slate-400 text-xs md:text-md lg:text-lg">{recipe}</div>
      </div>
      {/* flex gap-4 items-center */}
      {/* text-end */}
    </div>
  );
};

export default MenuItem;

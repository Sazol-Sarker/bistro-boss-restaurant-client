const MenuItem = ({ menuItem }) => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { name, recipe, image, price } = menuItem;
  // const dashSm = " ------ ";
  // const dashLg = " ------------------ ";
  const dash = window.innerWidth <= 768 ? " ------ " : " -------- ";
  // check device width:sm
  // useEffect(() => {
  //   setIsMobile(window.innerWidth <= 768);
  // }, [isMobile]);

  return (
    <div className="flex gap-5 md:gap-10 justify-center my-2">
      <img
        src={image}
        alt={name}
        className="w-[100px] h-[80px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px]"
      />
      <div className=" flex flex-col justify-start ">
        <div className="flex justify-between">
          <h3 className="text-2xl uppercase text-gray-400 mb-2 flex-1">
            {name} <span className="inline-block">{dash}</span>
          </h3>
          <h2 className="items-start justify-start text-[#BB8506]">${price}</h2>
        </div>
        <div className="text-slate-400">{recipe}</div>
      </div>
      {/* flex gap-4 items-center */}
      {/* text-end */}
    </div>
  );
};

export default MenuItem;

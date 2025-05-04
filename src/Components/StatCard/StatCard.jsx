import {
    FaDollarSign,
    FaUsers,
    FaBoxOpen,
    FaShoppingCart,
    FaComments,
  } from "react-icons/fa";
const StatCard = ({title,Icon,stat,bgColor}) => {
   
  return (
    <div className="stats shadow bg-slate-200  text-white max-w-md">
      <div className={`stat ${bgColor?.join(' ')}`}>
        <div className="stat-figure text-secondary text-white items-center">
          {Icon}
        </div>
        <div className="stat-content ml-4"> 
        <div className="stat-title text-xl md:text-2xl lg:text-3xl font-bold text-white">{stat}</div>
        <div className="stat-value text-xl md:text-2xl lg:text-3xl ">{title}</div>
        </div>
       
      </div>
    </div>
  );
};

export default StatCard;

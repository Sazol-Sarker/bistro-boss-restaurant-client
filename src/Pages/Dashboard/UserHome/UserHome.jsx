import StatCard from "../../../Components/StatCard/StatCard";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

import {
  FaDollarSign,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";

import profileLogo from '../../../assets/others/profile.png'
import { FaBowlFood } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";

// usersStat,reviewsStat,menuStat,paymentsStat,revenue
// [totalSpent,ordersCount,reviewsCount,paymentsCount,ordersCountInCart]
const statTitle = ["Total Spent", "Total Orders", "Reviews"];
const statIcons = [
  <FaDollarSign className="text-4xl text-white" />,
  <FaUsers className="text-4xl text-white" />,
  <FaBoxOpen className="text-4xl text-white" />,
  <FaShoppingCart className="text-4xl text-white" />,
  <FaComments className="text-4xl text-white" />,
];

const gradients = [
  ["bg-gradient-to-r", "from-purple-500", "to-purple-200"], // Purple to lighter purple
  ["bg-gradient-to-r", "from-pink-500", "to-pink-200"], // Pink to lighter pink
  ["bg-gradient-to-r", "from-yellow-500", "to-yellow-200"], // Yellow to lighter yellow
  ["bg-gradient-to-r", "from-teal-500", "to-teal-200"], // Teal to lighter teal
  ["bg-gradient-to-r", "from-indigo-500", "to-indigo-200"], // Indigo to lighter indigo
  // ["bg-gradient-to-r", "from-purple-500", "to-white"],
  // ["bg-gradient-to-r", "from-pink-500", "to-white"],
];

const UserHome = () => {
  const { user, loading } = useAuth();
  const {cart}=useCart()
  const axiosSecure = useAxiosSecure();

  const { data: userStats = [] } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user.email}?name=${user.displayName}`);
      return res.data;
    },
  });
  // console.log("userStats =>", userStats);
  const displayUserStats = userStats.slice(0, 3);

  return (
    <div className="text-center my-5">
      <h2 className="text-3xl">
        Welcome home,
        <span className="ml-2 uppercase text-blue-500 font-bold text-2xl">
          {user?.email ? user.displayName : "Adventurer"}
        </span>
      </h2>

      {/* stats */}
      {/* <div className="flex-grow gap-2 "> */}
        {/* <StatCard stat={stats[0]}></StatCard> */}

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-2 ">
        {displayUserStats.map((userStat, idx) => (
          <StatCard
            key={idx}
            title={statTitle[idx]}
            Icon={statIcons[idx]}
            stat={userStat}
            bgColor={gradients[idx]}
          ></StatCard>
        ))}
      </div>

      <div className="w-full flex mt-10 *:h-96 *:max-h-96 my-5">
        <div className=" bg-[#D1A054]/80 mx-0 flex flex-col items-center justify-center text-xl md:text-2xl  font-semibold  w-1/2">
          <img src={profileLogo} alt="user" className="w-20 mb-2 rounded-full border-2 border-[#D1A054]" />
          <h2 className="text-teal-700">
            {user?.displayName ? user.displayName : "Anonymous"}
          </h2>
          <h2 className="text-teal-700 text-xs md:text-xl">
            {user?.email ? user.email : "Anonymous Email"}
          </h2>
        </div>
        <div className="divider divider-horizontal join-horizontal m-0"></div>
        <div className="bg-[#FEF9C3]  mx-0 w-1/2 pb-5 flex flex-col items-center justify-center">
          <h2 className="text-xl  md:text-2xl font-semibold mb-5">Your Activites</h2>
          {/* {
            userStats.map((stat,idx)=><p key={idx} className="text-lg">{`${statIcons[idx]} ${stat}`}</p>)
          } */}

          <div className="flex flex-col  max-w-fit mx-auto">
            <div className="text-lg flex ">
              <div className="mx-2">
                <FaDollarSign className="text-2xl text-[#cfba3e]" />
              </div>
              <div className="text-[#cfba3e] text-sm md:text-lg">
                Total Spent: {userStats[0]}$
                
              </div>
            </div>
            <div className="text-lg flex">
              <div className="mx-2">
                <FaShoppingCart className="text-2xl text-[#0088FE]" />
              </div>
              <div className="text-[#0088FE] text-sm md:text-lg">
                Total <span className="hidden md:inline">Completed</span> Orders: {userStats[1]}
                
              </div>
            </div>
            <div className="text-lg flex">
              <div className="mx-2">
                <FaComments className="text-2xl text-[#6abdc0]" />
              </div>
              <div className="text-[#6abdc0] text-sm md:text-lg">
                {/* TOCHECK: not working */}
                {/* Total Reviews: {userStats[2]} */}
                Total Reviews: {userStats[2]}
               
              </div>
            </div>
            <div className="text-lg flex">
              <div className="mx-2">
                <FaBoxOpen className="text-2xl text-[#a2468d]" />
              </div>
              <div className="text-[#a2468d] text-sm md:text-lg">
                Total <span className="hidden md:inline">Completed</span> Payments: {userStats[3]}
                
              </div>
            </div>
            <div className="text-lg flex">
              <div className="mx-2">
                <FaBowlFood className="text-2xl text-[#cd595d]" />
              </div>
              {/* <div className=" text-[#cd595d]">Number of Food Items in cart: {userStats[3]}</div> */}
              <div className=" text-[#cd595d] text-sm md:text-lg">
              <span className="hidden md:inline">Total Number of Food</span> Items in cart: {cart.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

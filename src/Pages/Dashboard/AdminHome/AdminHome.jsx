import { useQuery } from "@tanstack/react-query";
import StatCard from "../../../Components/StatCard/StatCard";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import {
  FaDollarSign,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";
const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  console.log("admin stats=>", stats);
  // usersStat,reviewsStat,menuStat,paymentsStat,revenue
  const statTitle = ["Revenue", "Customers", "Products", "Orders", "FeedBacks"];
  const statIcons = [
    <FaDollarSign className="text-4xl text-white" />,
    <FaUsers className="text-4xl text-white" />,
    <FaBoxOpen className="text-4xl text-white" />,
    <FaShoppingCart className="text-4xl text-white" />,
    <FaComments className="text-4xl text-white" />,
  ];

  //   const purpleToWhiteGradient = [
  //     "bg-gradient-to-r",
  //     "from-purple-500",
  //     "to-white",
  //   ];

  //   const pinkToWhiteGradient = ["bg-gradient-to-r", "from-pink-500", "to-white"];

  //   const yellowToWhiteGradient = [
  //     "bg-gradient-to-r",
  //     "from-yellow-500",
  //     "to-white",
  //   ];

  //   const tealToWhiteGradient = ["bg-gradient-to-r", "from-teal-500", "to-white"];

  const gradients = [
    ["bg-gradient-to-r", "from-purple-500", "to-purple-200"], // Purple to lighter purple
    ["bg-gradient-to-r", "from-pink-500", "to-pink-200"], // Pink to lighter pink
    ["bg-gradient-to-r", "from-yellow-500", "to-yellow-200"], // Yellow to lighter yellow
    ["bg-gradient-to-r", "from-teal-500", "to-teal-200"], // Teal to lighter teal
    ["bg-gradient-to-r", "from-indigo-500", "to-indigo-200"], // Indigo to lighter indigo
    // ["bg-gradient-to-r", "from-purple-500", "to-white"],
    // ["bg-gradient-to-r", "from-pink-500", "to-white"],
  
  ];

  return (
    <div className="text-center my-5">
      <h2 className="text-3xl font-bold my-5">
        Hi,
        <span className="ml-2">
          {user?.email ? user.displayName : "Adventurer"}
        </span>. Welcome home!
      </h2>

      <div className="flex-grow ">
        {/* <StatCard stat={stats[0]}></StatCard> */}

        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={statTitle[idx]}
            Icon={statIcons[idx]}
            stat={stat}
            bgColor={gradients[idx]}
          ></StatCard>
        ))}
      </div>
    </div>
  );
};

// werehe6859@provko.com

export default AdminHome;

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

// rechart drawing
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
  // console.log("admin stats=>", stats);

  // order stats
  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // usersStat,reviewsStat,menuStat,paymentsStat,revenue
  const statTitle = ["Revenue", "Customers", "Products", "Orders", "FeedBacks"];
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

  // custom bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="text-center my-5">
      <h2 className="text-xl md:text-2xl font-bold my-5">
        Hi,
        <span className="ml-2 text-amber-400">
          {user?.email ? user.displayName : "Adventurer"}
        </span> <br />
        <span >Welcome to Admin home!</span>
      </h2>

      {/* admin stats */}
      {/* <div className="flex-grow "> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

      {/* rechart charts */}
      <div className="flex flex-col md:flex-row gap-16 mt-5">
        {/* bar chart */}
        <div className="w-full md:w-1/2 mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* pie chart */}
        <div className="w-full md:w-1/2 mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={500} height={300}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

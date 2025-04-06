import StatCard from "../../../Components/StatCard/StatCard";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="text-center my-5">
      <h2 className="text-3xl">
        Welcome home,
        <span className="ml-2 uppercase text-blue-500">
          {user?.email ? user.displayName : "Adventurer"}
        </span>
      </h2>

      <StatCard></StatCard>
    </div>
  );
};

export default UserHome;

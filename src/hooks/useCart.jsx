import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user,loading}= useAuth()
  // console.log("user,loading==>",user,loading);
  

  const { data: cart = [],isLoading,refetch } = useQuery({
    queryKey: ["cart",user?.email],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return { cart: [], isLoading: true };
  }
  

  return { cart ,refetch, isLoading};
};

export default useCart;

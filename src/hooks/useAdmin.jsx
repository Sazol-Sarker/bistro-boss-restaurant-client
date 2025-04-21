import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()

    // tanstack query
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
       
       queryKey:['isAdmin',user?.email], 
       enabled:!loading,
       queryFn:async()=>{
        const res=await axiosSecure(`/users/${user.email}`)
        console.log("Axios headers:", res.config.headers);
        // console.log("Admin role check in useAdmin=>",res.data);
        return res.data?.admin
       }
    })
    
    return [isAdmin,isAdminLoading]
   
};

export default useAdmin;
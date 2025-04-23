import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic=useAxiosPublic()
    // const [menu, setMenu] = useState([]);
    // const [loading,setLoading]=useState(true)
    // console.log(popularMenu);
    // fetch menu items
    // useEffect(() => {
    //   axios.get("http://localhost:5000/menu")
    //   .then((res) => {
    //     // console.log("MENU",res.data);
    //     setMenu(res.data);
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     // console.error("Error fetching menu:", error);
    //     setLoading(false);
    //   });
    // }, []);


    // tanstack query+refetch
    const {data:menu=[],isPending:loading,refetch}=useQuery({
      queryKey:['menu'],
      queryFn:async()=>{
        const res=await axiosPublic.get('/menu')
        return res.data
      }
    })

    return {menu,loading,refetch}
};

export default useMenu;
import axios from "axios";
import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading,setLoading]=useState(true)
    // console.log(popularMenu);
    // fetch menu items
    useEffect(() => {
      axios.get("menu.json")
      .then((res) => {
        // console.log("MENU",res.data);
        setMenu(res.data);
        setLoading(false)
      });
    }, []);
    return {menu,loading}
};

export default useMenu;
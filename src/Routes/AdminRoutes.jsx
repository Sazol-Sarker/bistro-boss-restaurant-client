import { useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({children}) => {
    const {user,loading}=useAuth()
    const [isAdmin,isAdminLoading]=useAdmin()
    const location=useLocation()

    if(loading || isAdminLoading)
    {
        return <div className="flex items-center justify-center">
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>;
    }

    if(user && isAdmin)
    {
        return children
    }

    return <Navigate to="/" state={{from:location}} replace></Navigate>


};

export default AdminRoutes;
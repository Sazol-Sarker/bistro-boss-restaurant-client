import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { toast } from "react-toastify";

const Bookings = () => {
    const {user,loading}=useAuth()
    const axiosPublic=useAxiosPublic()


    const {data:reservationsData,isLoading,refetch}=useQuery({
        queryKey:['reservations',user?.email],
        enabled:!loading,
        queryFn:async()=>{
            const res=await axiosPublic.get(`/reservations/${user?.email}`)
            return res.data
        }
    })
    console.log("reservationsData==>",reservationsData);


    if(isLoading ||loading)
    {
        return <div className="spinner">loading...</div>
    }

    const handleReservationCancel=(id)=>{
        // DELETE API: reservationCollection

        axiosPublic.delete(`/reservations/${id}`)
        .then(res=>{
            console.log("Delete response reservation=>",res.data);
            if(res.data.deletedCount>0){
                refetch()
                toast(`Reservation with id: ${id} cancelled!`)

            }
        })

    }


  return (
    <div>
        <title>Bistro Boss | Bookings</title>
      <SectionTitle
        heading={"MY BOOKINGS"}
        subHeading={"Excellent Ambience"}
      ></SectionTitle>

      {/* table */}
      <div>
        <div className="overflow-x-auto">

            {reservationsData.length>0? <table className="table">
            {/* head */}
            <thead className="bg-[#D99904] text-white">
              <tr className="uppercase">
                <th className="rounded-tl-md">
                 #
                </th>
                <th>Booking Date-Time</th>
                <th>No. of Guest</th>
                <th>Booked By</th>
                <th>Status</th>
                <th className="rounded-tr-md">Action</th>
              </tr>
            </thead>
            <tbody>
             {
                reservationsData.map((data,idx)=> <tr key={data._id}>
                    <th>
                      {idx+1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <h2>{data.reservationDate}  <span className="font-bold">{data.reservationTime}</span></h2>
                        
                      </div>
                    </td>
                    <td>{data.reservationGuest} </td>
                    <td>
                      {data.reservationByName}
                      <br />
                      <span className="font-semibold text-green-500">({data.reservationEmail})</span>
                      
                    </td>
                    <td>Pending</td>
                    <th>
                      <button
                      onClick={()=>handleReservationCancel(data._id)}
                       className="btn btn-ghost btn-xs hover:text-red-500 p-4 text-[14px]">Cancel</button>
                    </th>
                    
                    
                  </tr>)
             }
              
              
            
            </tbody>
            
          </table>:<div className="text-red-500 flex items-center justify-center">No reservations done yet!</div>}
         
        </div>
      </div>
    </div>
  );
};

export default Bookings;

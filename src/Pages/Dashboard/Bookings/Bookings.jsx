import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useState } from "react";
import useAdmin from "../../../hooks/useAdmin";

const Bookings = () => {
  const { user, loading } = useAuth();
  const [isAdmin]=useAdmin()
  const axiosPublic = useAxiosPublic();
  // const [isButtonPressed, setIsButtonPressed] = useState(null);

  const {
    data: reservationsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reservations", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/reservations${isAdmin?"":`/${user.email}`}`);
      return res.data;
    },
  });
  // const {data:reservationsData,isLoading,refetch}=useQuery({
  //     queryKey:['reservations',user?.email],
  //     enabled:!loading,
  //     queryFn:async()=>{
  //         const res=await axiosPublic.get(`/reservations/${user?.email}`)
  //         return res.data
  //     }
  // })

  // console.log("reservationsData==>", reservationsData);

  if (isLoading || loading) {
    return <div className="spinner">loading...</div>;
  }

  // const handleReservationCancel = (id) => {
  //   // DELETE API: reservationCollection

  //   axiosPublic.delete(`/reservations/${id}`).then((res) => {
  //     console.log("Delete response reservation=>", res.data);
  //     if (res.data.deletedCount > 0) {
  //       refetch();
  //       toast(`Reservation with id: ${id} cancelled!`);
  //     }
  //   });
  // };

  const handleReservation = (id, isConfirmed) => {
    axiosPublic.patch(`/reservations/${id}`, { isConfirmed }).then((res) => {
      console.log("Admin reservation path response==>", res.data);

      if (res.data.modifiedCount) {
        toast(`Reservation ${isConfirmed ? "confirmed!" : "cancelled!"}`);
        refetch();
      }
    });
  };

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
          {reservationsData.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead className="bg-[#D99904] text-white">
                <tr className="uppercase">
                  <th className="rounded-tl-md">#</th>
                  <th>Booking Date-Time</th>
                  <th>No. of Guest</th>
                  <th>Booked By</th>
                  <th>Status</th>
                  <th className="rounded-tr-md flex justify-center items-center gap-y-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservationsData.map((data, idx) => (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <h2>
                          {data.reservationDate}{" "}
                          <span className="font-bold">
                            {data.reservationTime}
                          </span>
                        </h2>
                      </div>
                    </td>
                    <td>{data.reservationGuest} </td>
                    <td>
                      {data.reservationByName}
                      <br />
                      <span className="font-semibold text-green-500">
                        ({data.reservationEmail})
                      </span>
                    </td>

                    <td className="font-bold">{data.status}</td>
                    <th className="flex flex-col items-center">
                     {
                      isAdmin? <button
                      disabled={data.status==="confirmed"}
                        onClick={() => {
                          
                          // setIsButtonPressed(true);
                          handleReservation(data._id, true);
                        }}
                        className="btn btn-ghost btn-xs hover:text-red-500 p-4 text-[14px]"
                      >
                        Confirm
                      </button>:""
                     }
                      <button disabled={data.status==="cancelled"}
                        onClick={() => {
                          // setIsButtonPressed(true);
                          handleReservation(data._id, false);
                        }}
                        className="btn btn-ghost btn-xs hover:text-red-500 p-4 text-[14px]"
                      >
                        Cancel
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-red-500 flex items-center justify-center">
              No reservations done yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;

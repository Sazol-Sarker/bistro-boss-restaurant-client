import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
//   const [paymentsHistory, setPaymentsHistory] = useState([]);

//   useEffect(() => {
//     axiosSecure.get(`/payments/${user.email}`).then((res) => {
//       console.log("Getting payment history==>", res.data);
//       setPaymentsHistory(res.data);
//     });
//   }, [axiosSecure, user.email]);

// tanstack query
const {data:paymentsHistory=[]}=useQuery({
    queryKey:['paymentsHistory',user?.email],
    queryFn:async()=>{
        const res=await axiosSecure.get(`/payments/${user.email}`)
        return res.data
    }

})
// console.log("paymentsHistory=>",paymentsHistory);

  return (
    <div>
      <title>Bistro Boss | Payment History</title>
        
        <SectionTitle heading={"Payment history"} subHeading={"At a glance"}></SectionTitle>
      {/* cart items table */}
      {paymentsHistory.length > 0 ? (
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="uppercase bg-[#D1A054] text-white ">
                  <th className="rounded-tl-md">#</th>
                  <th>Email</th>
                  <th>Transaction Id</th>
                  <th>No. of Items</th>
                  <th>Total Price</th>
                  <th className="rounded-tr-md">Payment Date (UTC+0)</th>
                </tr>
              </thead>
              <tbody>
                {/* paymentsHistory items */}
                {paymentsHistory.map((item, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>

                    <td>{item?.email}</td>
                    <td>{item?.transactionId}</td>
                    <td>{item?.cartIds?.length}</td>
                    <td>${item?.price}</td>
                    <td>{`${item?.date.split('T')[0]}`} <span className="font-semibold ml-2">{`${item?.date.split('T')[1].split('.')[0]}`}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-red-500 flex items-center justify-center mt-10">
          No items in cart
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

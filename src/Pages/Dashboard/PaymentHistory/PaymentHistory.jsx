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
  const { data: paymentsHistory = [] } = useQuery({
    queryKey: ["paymentsHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  // console.log("paymentsHistory=>",paymentsHistory);

  return (
    <div>
      <title>Bistro Boss | Payment History</title>

      <SectionTitle
        heading={"Payment history"}
        subHeading={"At a glance"}
      ></SectionTitle>
      {/* cart items table */}
      {paymentsHistory.length > 0 ? (
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <table className="table table-xs md:table-md">
              {/* head */}
              <thead>
                <tr className="uppercase bg-[#D1A054] text-white text-xs">
                  <th className="rounded-tl-md">#</th>
                  <th>
                    Email <br />
                    <span className="md:hidden">
                      Transaction Id  <br />Payment Date (UTC+0)
                    </span>
                  </th>
                  <th className="hidden md:table-cell">Transaction Id</th>
                  <th>No. of Items <span className="md:hidden"><br />Total Price</span></th>
                  <th className="hidden md:table-cell">Total Price</th>
                  <th className="rounded-tr-md hidden md:table-cell">
                    Payment Date (UTC+0)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* paymentsHistory items */}
                {paymentsHistory.map((item, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>

                    <td>
                      <span className="text-green-500">{item?.email}</span>
                      <br />
                      <span className="md:hidden">
                        {item?.transactionId} <br /> {`${item?.date.split("T")[0]}`} 
                        <span className="font-semibold ml-2">{`${
                          item?.date.split("T")[1].split(".")[0]
                        }`}</span>
                      </span>
                    </td>
                    <td className="hidden md:table-cell">{item?.transactionId} {item?.cartIds?.length}</td>
                    <td >{item?.cartIds?.length} <span className="md:hidden"><br />${item?.price}</span></td>
                   
                    <td className="hidden md:table-cell">${item?.price}</td>
                    <td className="hidden md:table-cell">
                      {`${item?.date.split("T")[0]}`}{" "}
                      <span className="font-semibold ml-2">{`${
                        item?.date.split("T")[1].split(".")[0]
                      }`}</span>
                    </td>
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

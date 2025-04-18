import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const ContactMsg = () => {
    const axiosPublic=useAxiosPublic()
  const { data: contactMsg,isLoading, refetch } = useQuery({
    queryKey: ["contactMsg"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contactMsg");

      return res.data;
    },
  });

  if(isLoading)
    {
      return <div>Loading....</div>
    }

  console.log("contactMsg==>", contactMsg);

  return (
    <div>
      <SectionTitle
        heading={"Support"}
        subHeading={"Support messages"}
      ></SectionTitle>

      {/* support messages */}
      {
        contactMsg?<div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {
                contactMsg.map((msg,idx)=><tr key={idx}>
                    <th>{idx+1}</th>
                    <td>{msg.name||"Unknown"}</td>
                    <td>{msg.email||"Unknown"}</td>
                    <td>{msg.phone||"Unknown"}</td>
                    <td>{msg.msg}</td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>:<div className="text-red-500 text-center">No Contact Messages Yet!</div>
      }
      
    </div>
  );
};

export default ContactMsg;

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

  // console.log("contactMsg==>", contactMsg);

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
              <th className="hidden md:table-cell">Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden md:table-cell">Phone</th>
              <th className="table-cell md:hidden">Name/Email/Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {
                contactMsg.map((msg,idx)=><tr key={idx}>
                    <th>{idx+1}</th>
                    <td className="hidden md:table-cell text-green-500">{msg.name||"Unknown"}</td>
                    <td className="hidden md:table-cell">{msg.email||"Unknown"}</td>
                    <td className="hidden md:table-cell">{msg.phone||"Unknown"}</td>
                    {/*for mobile device */}
                    <td className="table-cell md:hidden">{msg.name||"Unknown"} <br />
                    {msg.email||"Unknown"} <br />
                    {msg.phone||"Unknown"}</td>
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

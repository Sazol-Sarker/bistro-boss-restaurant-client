import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users",{headers:{
      //   authorization:`Bearer ${localStorage.getItem('access-token')}`
      // }});
      const res = await axiosSecure.get("/users");

      //   console.log(res.data);
      return res.data;
    },
  });

  //   console.log("users=>", users);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  //   console.log(users.length);

  const handleUserDelete = (id) => {
    // console.log("deleted user id=>",id);
    // DELETE API: users + tanstack query refetch
    axiosSecure
      .delete(`/users/${id}`)
      .then((res) => {
        // console.log("Delete response from db=>", res.data);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserRoleUpdate = (id, newRole) => {
    // PATCH API: users
    axiosSecure
      .patch(`/users/${id}`, { newRole })
      .then((res) => {
        // console.log("patch user response==>", res.data);
        if (res.data.modifiedCount > 0) {
          toast(`User role updated to ${newRole}`);
          refetch();
        }
      })
      .catch((error) => {
        // console.log("error==>", error);
      });
  };

  return (
    <div className="w-full ">
      <div className="text-xl md:text-2xl font-bold uppercase flex items-center justify-center mb-5">
        total users: {users.length}
      </div>

      {/* table*/}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-xs md:text-md uppercase text-center bg-[#D1A054] text-white ">
                <th className="border-tl-2 rounded-tl-md hidden md:table-cell">
                  #
                </th>
                <th className="hidden md:table-cell">Name</th>
                <th className="md:hidden">Name/Email</th>
                <th className="hidden md:table-cell ">Email</th>
                <th className="border-tr-2 rounded-tr-md">Role/Action</th>
                {/* <th className="b"></th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, idx) => (
                <tr key={idx}>
                  <th className="hidden md:table-cell">{idx + 1}</th>
                  <td>
                    <span className="text-green-500">{user.name}</span> <br /><span className="md:hidden">{user.email}</span>
                  </td>
                  <td className="hidden md:table-cell">{user.email}</td>
                  <td className="flex  items-center justify-center gap-x-1 md:gap-x-4">
                    {user?.role == "admin" ? (
                      <div className="cursor-pointer flex flex-col items-center">
                        <button className="px-2 py-1 bg-[#D1A054] w-10 flex flex-col items-center rounded-md ">
                          <FaUserSecret
                            onClick={() =>
                              handleUserRoleUpdate(user._id, "user")
                            }
                            className="text-lg"
                          />

                          <span>{user?.role}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="cursor-pointer flex flex-col items-center">
                        <button
                          title="Click to change role"
                          className="px-2 py-1 bg-[#D1A054] w-10 text-white flex flex-col items-center rounded-md "
                        >
                          <FaUsers
                            onClick={() =>
                              handleUserRoleUpdate(user._id, "admin")
                            }
                            className="text-lg  cursor-pointer"
                          />
                          <span>{user?.role}</span>
                        </button>
                      </div>
                    )}

                    <button
                      title="Delete the user"
                      onClick={() => handleUserDelete(user._id)}
                      className="bg-[#B91C1C] p-2 rounded-lg"
                    >
                      <FaRegTrashCan className="text-white" />
                    </button>
                  </td>
                  {/* <td>
                    <button title="Delete the user"
                      onClick={() => handleUserDelete(user._id)}
                      className="bg-[#B91C1C] p-2 rounded-lg"
                    >
                      <FaRegTrashCan className="text-white" />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-red-500 flex justify-center">
          
          No users found in database
        </div>
      )}
    </div>
  );
};

export default AllUsers;

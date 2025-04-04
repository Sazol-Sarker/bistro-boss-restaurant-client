import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa6";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users",{headers:{
        authorization:`Bearer ${localStorage.getItem('access-token')}`
      }});
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
        console.log("error==>", error);
      });
  };

  return (
    <div className="w-full border-2 border-teal-500">
      <div className="text-2xl font-bold uppercase flex items-center justify-center mb-5">
        total users: {users.length}
      </div>

      {/* table*/}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-md uppercase text-center bg-[#D1A054] text-white">
                <th className="border-tl-2 rounded-tl-md">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>roll</th>
                <th className="border-tr-2 rounded-tr-md">action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role == "admin" ? (
                      <div className="cursor-pointer flex flex-col items-center">
                        <button className="px-2 py-1 bg-[#D1A054] w-10 flex flex-col items-center rounded-md ">
                          <FaUserSecret
                            onClick={() =>
                              handleUserRoleUpdate(user._id, "user")
                            }
                            className="text-lg "
                          />

                          <span>{user?.role}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="cursor-pointer flex flex-col items-center">
                        <button className="px-2 py-1 bg-[#D1A054] w-10 text-white flex flex-col items-center rounded-md ">
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
                  </td>
                  <td>
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className="bg-[#B91C1C] p-2 rounded-lg"
                    >
                      <FaRegTrashCan className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-red-500 flex justify-center">
          {" "}
          No users found in database
        </div>
      )}
    </div>
  );
};

export default AllUsers;

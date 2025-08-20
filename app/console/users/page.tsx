"use client";
import { User } from "@/commenType/commenTypes";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useEffect } from "react";

const UsersPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);

  const usersTableHeader = [
    {
      name: "Name",
      className:
        "md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate",
    },
    { name: "Email", className: "max-sm:hidden" },
    { name: "Phone", className: "" },
    { name: "Permission", className: "max-sm:hidden" },
    { name: "Auth Method", className: "max-sm:hidden" },
    { name: "Status", className: "max-sm:hidden" },
    { name: "Role", className: "max-sm:hidden" },
    // { name: "Created At",className: "" },
    // { name: "Last Logged In",className: "" },
    { name: "Action", className: "" },
  ];

  const GetUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setUsers(
          res.data.data.map((user: User) => ({
            id: user.id,
            name: user.name || "N/A",
            email: user.email || "N/A",
            phoneNumber: user.phoneNumber || "N/A",
            permission: user.permission || "N/A",
            authMethod: user.authMethod || "N/A",
            status: user.status || "N/A",
            role: user.role || "N/A",
            createdAt: user.createdAt || "N/A",
            lastLoggedIn: user.lastLoggedIn || "N/A",
          }))
        );
      } else {
        console.error("Failed to fetch users:", res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      GetUsers();
    }
  }, [TOKEN]);

  return (
    <>
      <Navbar NavType={LicenseTypes.ADMIN} />
      <header className="mt-16 relative bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full md:p-10 p-4">
              <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table className="table-fixed w-full overflow-hidden">
                  <thead className="text-gray-900 text-sm text-left">
                    <tr>
                      {usersTableHeader.map((header, index) => (
                        <th
                          key={index}
                          className={`${header.className} px-4 py-3`}
                        >
                          {header.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-500">
                    {users &&
                      users.map((user, index) => (
                        <tr key={index} className="border-t border-gray-500/20">
                          <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                            <div className="bg-gray-500/10 rounded p-2">
                              {/* <Image
                        src={user ? "" : "/placeholder.png"}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      /> */}
                              {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "N/A"}
                            </div>
                            <span className="truncate w-full">{user.name}</span>
                          </td>
                          <td className="px-4 py-3 max-sm:hidden">
                            {user.email}
                          </td>
                          <td className="px-4 py-3">{user.phoneNumber}</td>
                          <td className="px-4 py-3 max-sm:hidden">
                            {user.authMethod}
                          </td>
                          <td className="px-4 py-3 max-sm:hidden">
                            {user.permission}
                          </td>
                          <td className="px-4 py-3 max-sm:hidden">
                            {user.status}
                          </td>
                          <td className="px-4 py-3 max-sm:hidden">
                            {user.role}
                          </td>
                          {/* <td className="px-4 py-3 max-sm:hidden">
                          <button className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                            <span className="hidden md:block">Visit</span>
                            <Image
                        className="h-3.5"
                        src={"/"}
                        alt="redirect_icon"
                      />
                          </button>
                        </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="mt-16 flex-1 min-h-screen flex flex-col justify-between"></div>
    </>
  );
};

export default UsersPage;

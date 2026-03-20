"use client";
import { AppContext } from "@/context/context";
import React, { useContext } from "react";
import Loading from "./helpers/Loading";

const UserProfile = () => {
  const { state } = useContext(AppContext);
  if (!state.user?.id) {
    return (
      <p className="text-center mt-10">
        <Loading />
      </p>
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Name" value={state.user.name} />
            <ProfileItem label="Email" value={state.user.email} />
            <ProfileItem label="Phone Number" value={state.user.phoneNumber} />
            <ProfileItem label="Role" value={state.user.role} />
            <ProfileItem label="Permission" value={state.user.permission} />
            <ProfileItem label="Auth Method" value={state.user.authMethod} />
            <ProfileItem label="Status" value={state.user.status} />

            <ProfileItem
              label="Created At"
              value={new Date(state.user.createdAt).toLocaleDateString()}
            />

            {/* <ProfileItem
            label="Last Login"
            value={new Date(state.user.lastLoggedInAt).toLocaleDateString()}
          /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;

interface ProfileItemProps {
  label: string;
  value?: string | number;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800">
        {value ?? "Not Available"}
      </p>
    </div>
  );
};

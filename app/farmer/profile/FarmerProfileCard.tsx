"use client";

export interface FarmerProfile {
  name: string;
  landSizeAcres: number;
  soilType: string;
  irrigationType: string;
  farmingType: string;
  state: string;
  district: string;
  village: string;
  latitude: number;
  longitude: number;
  pincode: string;
}

export default function FarmerProfileCard({
  profile,
}: {
  profile: FarmerProfile;
}) {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              🌾 {profile.name}
            </h2>
            <p className="text-sm text-gray-500">
              Farmer Profile
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {profile.farmingType}
          </span>
        </div>

        {/* Land Details */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Land Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Land Size" value={`${profile.landSizeAcres} Acres`} />
            <Info label="Soil Type" value={profile.soilType} />
            <Info label="Irrigation" value={profile.irrigationType} />
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Location
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Info label="State" value={profile.state} />
            <Info label="District" value={profile.district} />
            <Info label="Village" value={profile.village} />
            <Info label="Pincode" value={profile.pincode} />
          </div>
        </div>

        {/* GPS */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            GPS Coordinates
          </h3>

          <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
            Latitude: {profile.latitude} <br />
            Longitude: {profile.longitude}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable info row */
function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 border rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}
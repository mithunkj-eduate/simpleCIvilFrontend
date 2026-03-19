import Navbar from "@/components/commen/Navbar";
import Footer from "@/components/Footer";
import UserProfile from "@/components/UserProfile";
import { LicenseTypes } from "@/utils/enum.types";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar NavType={LicenseTypes.USER} />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default UserProfilePage;

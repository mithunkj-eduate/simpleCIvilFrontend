import { BASE_URL } from "@/components/helpers/apiheader";
import { SafeImage } from "../utils/SafeImage";


const ImageGalary = () => {
  return (
    <div>
      <h2>export default ImageGalary</h2>

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample05.jpg`}
        className=""
      />
      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample01.jpeg`}
        className=""
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample02.jpg`}
        className=""
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample03.jpg`}
        className=""
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample04.jpg`}
        className=""
      />
    </div>
  );
};

export default ImageGalary;

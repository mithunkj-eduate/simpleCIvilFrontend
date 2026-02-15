"use client";
import { BASE_URL } from "@/components/helpers/apiheader";
import Image from "next/image";
import React from "react";

import { useState } from "react";

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function SafeImage({ src, width, height, alt }: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  if (!src) return <div>Loading ...</div>;
  return (
    <Image
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      unoptimized
      onError={() => {
        setImgSrc("/placeholder.png"); // must exist in frontend /public
      }}
    />
  );
}

const ImageGalary = () => {
  return (
    <div>
      <h2>export default ImageGalary</h2>

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample05.jpg`}
      />
      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample01.jpeg`}
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample02.jpg`}
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample03.jpg`}
      />

      <SafeImage
        width={200}
        height={200}
        alt="newImage"
        src={`${BASE_URL}/public/sample04.jpg`}
      />
    </div>
  );
};

export default ImageGalary;

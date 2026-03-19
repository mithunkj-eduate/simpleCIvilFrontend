"use client";
import Image from "next/image";
import React from "react";

import { useState } from "react";

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
  onClick?: () => void;
}

export function SafeImage({
  src,
  width,
  height,
  alt,
  className,
  onClick,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  if (!src) return <div>Loading ...</div>;

  return (
    <Image
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onClick={onClick ? onClick : () => {}}
      unoptimized
      onError={()=> {
        setImgSrc("/placeholder.jpg"); // must exist in frontend /public
      }}
    />
  );
}

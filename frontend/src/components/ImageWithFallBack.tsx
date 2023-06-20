import React, { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  className: string;
  alt: string;
}
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  className,
  fallbackSrc = "../../src/assets/images/placeholder.svg",
  alt,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      src={imageSrc || fallbackSrc}
      alt={alt}
      onError={handleImageError}
      className={className}
    />
  );
};

export default ImageWithFallback;

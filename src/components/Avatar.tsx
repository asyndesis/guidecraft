import React from "react";
import { Image, ImageProps, ImageStyle } from "react-native";

const SIZES = {
  sm: 16,
  md: 24,
  lg: 42,
};

type SizeType = keyof typeof SIZES;

interface AvatarProps {
  size: SizeType | number;
  src?: string;
  imageProps?: ImageProps;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size, imageProps }) => {
  const derivedSize = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  return (
    <Image
      source={{ uri: src }}
      style={
        {
          width: derivedSize,
          height: derivedSize,
          borderRadius: derivedSize / 2,
        } as ImageStyle
      }
      {...imageProps}
    />
  );
};

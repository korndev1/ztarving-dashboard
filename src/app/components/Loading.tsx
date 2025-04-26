// components/Loading.tsx
import { Colors } from "@/Constant/Colors";
import React from "react";
import {
  MutatingDots,
} from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1 }}
      className="flex items-center justify-center h-full w-full absolute "
    >
      <MutatingDots color={Colors.primary} secondaryColor={Colors.white} />
    </div>
  );
};

export default Loading;

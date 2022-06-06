import React from "react";

import { View, Text } from "react-native";
import {
  StyledShimmerEffect,
  ShimmerText,
  StyledShimmerStatus,
  ShimmerSefaz,
  ShimmerPortaria,
  ShimmerDivergencia,
} from "./ShimmerEffect.styled";
export default function ShimmerEffect() {
  return (
    <StyledShimmerEffect>
      <ShimmerText autoRun={true} visible={false} height={20} />
      <ShimmerText autoRun={true} visible={false} height={20} />
      <ShimmerText autoRun={true} visible={false} height={20} />
      <ShimmerText autoRun={true} visible={false} height={20} />
    </StyledShimmerEffect>
  );
}

import React from "react";

import { View, Text } from "react-native";
import {
  StyledDetailShimmerEffect,
  ShimmerText,
  ShimmerInput,
  Styledinput,
  ShimmerInputCustom,
  ShimmerTextCustom,
  StyledContainerInput,
} from "./DetailShimmerEffect.styled";
export default function DetailShimmerEffect() {
  return (
    <StyledDetailShimmerEffect>
      <ShimmerText autoRun={true} visible={false} height={30} />
      <ShimmerText autoRun={true} visible={false} height={30} />
      <ShimmerText autoRun={true} visible={false} height={30} />
      <ShimmerText autoRun={true} visible={false} height={30} />
      <ShimmerText autoRun={true} visible={false} height={30} />

      <StyledContainerInput>
        <ShimmerInputCustom autoRun={true} visible={false} />

        <Styledinput>
          <ShimmerTextCustom autoRun={true} visible={false} height={20} />
        </Styledinput>
      </StyledContainerInput>
    </StyledDetailShimmerEffect>
  );
}

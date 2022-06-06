import styled from "styled-components/native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export const StyledDetailShimmerEffect = styled.View`
  background: #fff;
  border-radius: 15px;
  margin: 10px 0px;
  padding: 15px;
`;
export const ShimmerText = styled(ShimmerPlaceHolder)`
  width: 100%;
  margin-top: 5px;
  padding-bottom: 10px;
`;
export const ShimmerTextCustom = styled(ShimmerPlaceHolder)`
  width: 60%;
  margin-top: 5px;
  margin-right: 5px;
`;
export const ShimmerInput = styled(ShimmerPlaceHolder)`
  flex: 1;
  height: 50px;
  margin-top: 10px;
  align-items: flex-start;
  border-bottom-width: 3px;
  border-bottom-color: #ccc;
`;
export const ShimmerInputCustom = styled(ShimmerInput)`
  margin-right: 5px;
`;
export const Styledinput = styled.View`
  flex-direction: row;
  align-items: flex-end;
  width: 40%;
`;
export const StyledContainerInput = styled.View`
  flex-direction: row;
`;

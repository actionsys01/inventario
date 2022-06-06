import styled from "styled-components/native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export const StyledShimmerEffect = styled.View`
  width: 90%;
  align-items: center;
  margin: 15px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  align-self: center;
`;
export const ShimmerText = styled(ShimmerPlaceHolder)`
  width: 100%;
  margin: 5px 0px;
`;

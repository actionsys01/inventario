import styled from "styled-components/native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
export const StyledLineRenderItem = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: flex-end;
`;
export const StyledSearch = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  border-width: 3px;
  border-color: #ccc;
  border-radius: 15px;
  padding: 0px 5px;
  margin-bottom: 10px;
`;
export const StyledLineRenderItemCustom = styled(StyledLineRenderItem)`
  margin-top: 0px;
`;

export const InputAmount = styled.TextInput`
  padding: 10px;
  width: 80%;
  margin-right: 10px;
  border-bottom-width: 3px;
  border-bottom-color: #ccc;
`;
export const InputSearch = styled.TextInput`
  padding: 10px;
  flex: 1;
`;

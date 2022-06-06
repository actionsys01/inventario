import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Input from "../../components/Input";
export const StyledInput = styled(Input)`
  padding: 15px;
  background: #fff;
  margin: 10px 0px;
  border-radius: 15px;
`;
export const StyledCreateCount = styled.View`
  background: #f3f3f3;
  padding: 10px;
  flex: 1;
`;
export const ButtonCreateButton = styled.TouchableHighlight`
  padding: 15px;
  border: 1px solid #77ce6d;
  border-radius: 15px;
  background: #77ce6d;
  width: 100%;
`;
export const TextButtonCreateInput = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  letter-spacing: 2.8px;
`;

export const ContainerButtonCreateCount = styled.View``;

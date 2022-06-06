import styled from "styled-components/native";
import Input from "../../components/Input";
import { Dimensions } from "react-native";

export const StyledUserSettings = styled.View`
  flex: 1;
  background: #f3f1f1;
  padding: 10px 10px;
`;
export const InputSettings = styled(Input)`
  background-color: #fff;
  border-radius: 15px;
  flex: 1;
  padding: 15px 0px 15px 5px;
`;
export const ButtonSave = styled.TouchableHighlight`
  margin-top: 10px;
  background: #77ce6d;
  padding: 15px;
  border-width: 1px;
  border-radius: 15px;
  border-color: #77ce6d;
  align-items: center;
  justify-content: center;
`;
export const TextButtonSave = styled.Text`
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
  text-align: center;
`;

export const Title = styled.Text`
  text-align: left;
  color: #5e5e5e;
  padding: 10px 0px;
`;
export const ContainerTwoInputs = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  background: #fff;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
`;
export const StyledServer = styled.View`
  flex-direction: row;
  background: #fff;
  border-radius: 15px;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
`;
export const StyledPicker = styled.View`
  flex-direction: row;
  background: #fff;
  /* background: #f7f; */
  border-radius: 15px;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

export const ContainerButtonSave = styled.View``;

export const StyledDoor = styled.View`
  flex: 1;
  margin-right: 10px;
`;

export const StyledEndpoint = styled(StyledDoor)`
  margin-right: 0px;
`;

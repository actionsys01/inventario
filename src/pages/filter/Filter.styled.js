import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text";

export const StyledFilter = styled.View`
  flex: 1;
  background: #f3f3f3;
  align-items: center;
`;

export const ButtonFilter = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  padding: 15px;
  border-color: #fff;
`;
export const TextButtonFilter = styled.Text`
  font-weight: bold;
  color: #fff;
`;
export const ButtonBack = styled.TouchableHighlight`
  margin-left: 10px;
  padding: 10px;
`;

export const StyledPicker = styled.View`
  /* flex-direction: row; */
  background: #fff;
  border-radius: 15px;
  padding: 4px;
  margin-top: 20px;
  width: 95%;
`;
export const ButtonInsertFilter = styled.TouchableHighlight`
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.input ? "#77ce6d" : "#757575")};
  border: 1px solid ${(props) => (props.input ? "#77ce6d" : "#757575")};
`;
export const TextInsertFilter = styled.Text`
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
  text-align: center;
`;

export const TitleFilterSelected = styled.Text`
  color: #000;
  text-align: center;
`;
export const TextFilterSelected = styled.Text`
  color: #000;
  text-align: center;
  font-weight: bold;
`;
export const InputFilter = styled(TextInputMask)`
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 15px;
  margin: 5px 0px;
`;

export const StyledModal = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: space-between;
`;

export const TextError = styled.Text`
  color: #f82;
  text-align: center;
`;
export const ContainerInfo = styled.View``;

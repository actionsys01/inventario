import styled from "styled-components/native";
import Input from "../../components/Input";

export const StyledLogin = styled.View`
  background: #e8e8e8;
  flex: 1;
  padding: 10px;
`;
export const TextUser = styled.Text`
  color: #5e5e5e;
  font-weight: bold;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
`;
export const TextButtonSignIn = styled.Text`
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
  text-align: center;
`;

export const InputLogin = styled(Input)`
  background-color: #fff;
  border-radius: 15px;
  flex: 1;
  padding: 15px 0px 15px 5px;
`;
export const TextButtonSettings = styled(TextButtonSignIn)`
  margin-left: 5px;
`;
export const TextPassword = styled(TextUser)`
  color: #5e5e5e;
  font-weight: bold;
`;
export const ContainerInput = styled.View`
  flex-direction: row;
  background: #fff;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 15px;
`;

export const ButtonSignIn = styled.TouchableHighlight`
  background: #498fcc;
  width: 100%;
  padding: 15px;
  border-width: 1px;
  border-radius: 15px;
  border-color: #498fcc;
  margin-bottom: 10px;
`;
export const ButtonSettings = styled(ButtonSignIn)`
  background: #ffb84d;
  border-color: #ffb84d;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FormLogin = styled.KeyboardAvoidingView`
  justify-content: center;
  flex: 1;
`;

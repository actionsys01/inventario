import styled from "styled-components/native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { TextInputMask } from "react-native-masked-text";
export const ShimmerBarCode = styled(ShimmerPlaceHolder)`
  width: 30%;
  margin-top: 10px;
`;

export const StyledDetail = styled.View`
  flex: 1;
  background: #f3f3f3;
  padding: 10px;
`;

export const ButtonBarCode = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 45%;
`;

export const StyleBarCode = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TitleBarcode = styled.Text`
  margin-left: 10px;
`;
export const ContainerInfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
export const ContainerInfoItemCustom = styled(ContainerInfoItem)`
  justify-content: flex-start;
  margin-top: 0px;
`;
export const TextTitleDetail = styled.Text`
  color: #1d4a71;
  font-weight: bold;
  margin-right: 5px;
`;
export const TextSubTitleDetail = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 12px;
  margin-right: 5px;
`;

export const StyledItem = styled.KeyboardAvoidingView`
  background: #ffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 10px 0px;
  padding: 15px;
`;
export const LineInput = styled.View`
  flex-direction: row;
  align-items: center;
  background: pink;
  margin-top: 10px;
`;
export const InputInfo = styled.TextInput`
  margin-top: 10px;
  padding-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 15px;
  border-bottom-width: 3px;
  border-bottom-color: #ccc;
  width: ${width * 0.25}px;
`;
export const InputInfoCustom = styled(TextInputMask)`
  margin-top: 10px;
  padding-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 15px;
  border-bottom-width: 3px;
  border-bottom-color: #ccc;
  width: ${width * 0.25}px;
`;

export const StyledLine = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;
export const LineDetail = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
`;
export const StyledLineDetail = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const ButtonReport = styled.TouchableHighlight`
  border: 1px solid #77ce6d;
  border-radius: 15px;
  background: #77ce6d;
  padding: 20px;
  flex: 1;
`;
export const ButtonFinish = styled(ButtonReport)`
  background: ${(props) => (props.data ? "#498fcc" : "#757575")};
  border: 1px solid ${(props) => (props.data ? "#498fcc" : "#757575")};
  margin-left: 5px;
`;
export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
  text-align: center;
`;
export const TextButtonCustom = styled(TextButton)``;

export const ContainerNotFound = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

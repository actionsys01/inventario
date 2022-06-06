import styled from "styled-components/native";

export const StyledDashboard = styled.View`
  flex: 1;
  background: #f3f3f3;
`;

export const StyledRenderItem = styled.TouchableOpacity`
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;
export const StyledLine = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
export const StyledLineCustom = styled(StyledLine)`
  padding-bottom: 0px;
`;

export const ContainerStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const TextTitleCustom = styled.Text`
  color: #1d4a71;
  font-weight: bold;
  margin-right: 5px;
`;
export const TextSubtitleCustom = styled(TextTitleCustom)`
  color: #000;
  font-size: 12px;
`;
export const TextSubtitleCustomProvider = styled(TextSubtitleCustom)`
  margin-right: 5px;
  margin-left: 0px;
  font-size: 12px;
`;

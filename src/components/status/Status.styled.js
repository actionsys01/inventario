import styled from "styled-components/native";
import { STATUS } from "../../constants/status";

export const TextStatus = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const StyledSefaz = styled.View`
  background-color: ${(props) => {
    if (props.status === STATUS.SEFAZ.NAO_AUTORIZADA) {
      return "#47BB85";
    }
    if (
      props.status === STATUS.SEFAZ.CANCELADA ||
      props.status === STATUS.SEFAZ.SEFAZ_USO_DENEGADOUSO_DENEGADO
    ) {
      return "#F24A28";
    }
    return "#303030 ";
  }};
  border-color: ${(props) => {
    if (props.status === STATUS.SEFAZ.NAO_AUTORIZADA) {
      return "#47BB85";
    }
    if (
      props.status === STATUS.SEFAZ.CANCELADA ||
      props.status === STATUS.SEFAZ.USO_DENEGADO
    ) {
      return "#F24A28";
    }
    return "#303030 ";
  }};
  color: #fff;
  font-weight: bold;
  text-align: center;
  flex: 1;
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  margin-right: 5px;
  padding: 5px 5px;
`;

export const StyledPortaria = styled(StyledSefaz)`
  background-color: ${(props) => {
    if (
      props.status === STATUS.PORTARIA.ENTRADA_AUTORIZADA ||
      props.status === STATUS.PORTARIA.ENTRADA_FECHADA
    ) {
      return "#47BB85";
    }
    if (
      props.status === STATUS.PORTARIA.NAO_SE_APLICA ||
      props.status === STATUS.PORTARIA.ENTREGA_CANCELADA
    ) {
      return "#F24A28";
    }
    return "#303030 ";
  }};
  border-color: ${(props) => {
    if (
      props.status === STATUS.PORTARIA.ENTRADA_AUTORIZADA ||
      props.status === STATUS.PORTARIA.ENTRADA_FECHADA
    ) {
      return "#47BB85";
    }
    if (
      props.status === STATUS.PORTARIA.NAO_SE_APLICA ||
      props.status === STATUS.PORTARIA.ENTREGA_CANCELADA
    ) {
      return "#F24A28";
    }
    return "#303030 ";
  }};
`;
export const StyledDivergencia = styled(StyledSefaz)`
  background-color: ${(props) => {
    if (
      props.status === STATUS.DIVERGENCIA.SEM_DIVERGENCIA ||
      props.status === STATUS.DIVERGENCIA.AUTORIZADA
    ) {
      return "#47BB85";
    }
    if (!props.status) {
      return "#303030 ";
    }
    return "#F24A28";
  }};
  border-color: ${(props) => {
    if (
      props.status === STATUS.DIVERGENCIA.SEM_DIVERGENCIA ||
      props.status === STATUS.DIVERGENCIA.AUTORIZADA
    ) {
      return "#47BB85";
    }
    if (!props.status) {
      return "#303030 ";
    }
    return "#F24A28";
  }};
  margin-right: 0px;
`;

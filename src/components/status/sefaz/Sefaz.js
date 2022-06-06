import React from "react";
import { StyledSefaz, TextStatus } from "../Status.styled";

export default function Sefaz({ status }) {
  return (
    <StyledSefaz status={status}>
      <TextStatus>sefaz</TextStatus>
    </StyledSefaz>
  );
}

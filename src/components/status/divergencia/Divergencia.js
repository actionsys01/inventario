import React from "react";
import { StyledDivergencia, TextStatus } from "../Status.styled";

export default function Divergencia({ status }) {
  return (
    <StyledDivergencia status={status}>
      <TextStatus>portaria</TextStatus>
    </StyledDivergencia>
  );
}

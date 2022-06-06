import React from "react";
import { StyledPortaria, TextStatus } from "../Status.styled";

export default function Portaria({ status }) {
  return (
    <StyledPortaria status={status}>
      <TextStatus>portaria</TextStatus>
    </StyledPortaria>
  );
}

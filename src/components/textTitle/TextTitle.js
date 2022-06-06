import React from "react";
import { StyledTextTitle } from "./TextTitle.styled";

/**
 * Componente que pode ser utilizado como titulo
 * @param  label - nome que sera apresentado
 */
export default function TextTitle({ label }) {
  return <StyledTextTitle>{label}</StyledTextTitle>;
}

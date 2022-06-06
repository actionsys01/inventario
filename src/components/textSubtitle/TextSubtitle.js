import React from "react";
import { StyledTextSubtitle } from "./TextSubtitle.style";

/**
 *  Componente que pode ser utilizado como subtitulo
 * @param label - nome que sera apresentado
 */
function TextSubtitle({ label }) {
  return <StyledTextSubtitle>{label}</StyledTextSubtitle>;
}

export default TextSubtitle;

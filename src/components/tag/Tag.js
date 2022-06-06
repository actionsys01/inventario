import React from "react";
import { StyledTag, ContainerTag, TextTag } from "./Tag.styled";
import { AntDesign } from "@expo/vector-icons";

/**
 *
 * Componente que apresenta os filtros inseridos pleo usuario
 *
 * @param  filters - lista de filtros que foi inserido pelo usuario
 * @param  handleRemoveItem - funcao que remove o filtro selecionado
 */
export default function Tag({ filters, handleRemoveItem }) {
  return (
    <StyledTag>
      {filters.map((item, index) => (
        <ContainerTag key={index}>
          <AntDesign
            name="closecircle"
            size={20}
            color="#6D6D6D"
            onPress={() => handleRemoveItem(item)}
          />
          <TextTag>
            {`${item.label} : ${item.input.substring(0, 8)}...`}
          </TextTag>
        </ContainerTag>
      ))}
    </StyledTag>
  );
}

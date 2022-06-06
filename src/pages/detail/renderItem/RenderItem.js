import React, { useState } from "react";
import {
  StyledItem,
  TextTitleDetail,
  TextSubTitleDetail,
} from "../Detail.styled";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  StyledLineRenderItem,
  InputAmount,
  StyledLineRenderItemCustom,
  InputSearch,
  StyledSearch,
} from "./RenderItem.styled";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
export default function RenderItem({
  items,
  handleInput,
  handleSearch,
  search,
  setSearch,
}) {
  return (
    <>
      <StyledSearch>
        <>
          <MaterialIcons name="search" size={25} color="#ccc" />
          <InputSearch
            maxLength={10}
            onChangeText={handleSearch}
            placeholder="Buscar itens"
            value={search}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <MaterialIcons name="cancel" size={24} color="#498FCC" />
            </TouchableOpacity>
          )}
        </>
      </StyledSearch>
      <ScrollView>
        {items.map((item, index) => (
          <StyledItem key={index}>
            <StyledLineRenderItemCustom>
              <TextTitleDetail>Item</TextTitleDetail>
              <TextSubTitleDetail>
                {item.ItemLongo === " " ? "N/A" : item.ItemLongo}
              </TextSubTitleDetail>
              <TextTitleDetail>Desc. Item</TextTitleDetail>
              <TextSubTitleDetail>
                {item.DescricaoCont === " " ? "N/A" : item.DescricaoCont}
              </TextSubTitleDetail>
            </StyledLineRenderItemCustom>
            <StyledLineRenderItem>
              <TextTitleDetail>Lote</TextTitleDetail>
              <TextSubTitleDetail>
                {item.Lote === " " ? "N/A" : item.Lote}
              </TextSubTitleDetail>
              <TextTitleDetail>Local</TextTitleDetail>
              <TextSubTitleDetail>
                {item.LocalNaoFormatado === " "
                  ? "N/A"
                  : item.LocalNaoFormatado}
              </TextSubTitleDetail>
            </StyledLineRenderItem>
            <StyledLineRenderItem>
              <TextTitleDetail>Cat. Vendas 1</TextTitleDetail>
              <TextSubTitleDetail>
                {item.CategVendas1 === " " ? "N/A" : item.CategVendas1}
              </TextSubTitleDetail>
              <TextTitleDetail>Cat. Vendas 2</TextTitleDetail>
              <TextSubTitleDetail>
                {item.CategVendas2 === " " ? "N/A" : item.CategVendas2}
              </TextSubTitleDetail>
            </StyledLineRenderItem>
            <StyledLineRenderItem>
              <TextTitleDetail>Cat. Vendas 3</TextTitleDetail>
              <TextSubTitleDetail>
                {item.CategVendas3 === " " ? "N/A" : item.CategVendas3}
              </TextSubTitleDetail>
              <TextTitleDetail>Cat. Vendas 4</TextTitleDetail>
              <TextSubTitleDetail>
                {item.CategVendas4 === " " ? "N/A" : item.CategVendas4}
              </TextSubTitleDetail>
            </StyledLineRenderItem>
            <StyledLineRenderItem>
              <TextTitleDetail>Cat. Vendas 5</TextTitleDetail>
              <TextSubTitleDetail>
                {item.CategVendas5 === " " ? "N/A" : item.CategVendas5}
              </TextSubTitleDetail>
            </StyledLineRenderItem>
            <StyledLineRenderItem>
              <InputAmount
                keyboardType="numeric"
                maxLength={10}
                value={item.Quantidade == 0 ? "" : item.Quantidade.toString()}
                onChangeText={(amount) => handleInput(amount, item)}
                placeholder="Digite a quantidade"
              />
              <TextTitleDetail>UM</TextTitleDetail>
              <TextSubTitleDetail>{item.UM}</TextSubTitleDetail>
            </StyledLineRenderItem>
          </StyledItem>
        ))}
      </ScrollView>
    </>
  );
}

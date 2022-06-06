import { BASE_ENDPOINTS } from "../../constants/api";
import api from "../api";

export async function createCount(item) {
  let data = {
    Filial: item.filial,
    Item: item.item,
    Descricao: item.descricao,
    Lote: item.lote,
    LocalNaoFormatado: item.local,
    Imprimir1_blank: "1",
  };

  return await api.post(BASE_ENDPOINTS.CREATE_COUNT, data);
}
export async function endCount(items, countCode) {
  for (const item of items) {
    let data = {
      NumContagem: countCode,
      BranchPlant: item.Filial,
      ItemNumber: item.ItemLongo,
      LocalNaoFormatdo: item.LocalNaoFormatado,
      Lote: item.Lote,
      Quantidade: item.Quantidade,
    };

    api.post(BASE_ENDPOINTS.END_COUNT, data);
  }

  return true;
}

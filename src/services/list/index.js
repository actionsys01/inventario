import { BASE_ENDPOINTS } from "../../constants/api";
import api from "../api";

export function getCout(filters) {
  let data = {
    CodContagem: 0,
  };

  filters.forEach((item) => {
    data[item.value] = item.input;
  });

  return api.post(BASE_ENDPOINTS.LIST, data);
}

export function getCountCodeItens(code) {
  let data = { CodContagem: code };
  console.log("dda", api.defaults);

  return api.post(BASE_ENDPOINTS.LIST_ITEMS, data, { crossdomain: true });
}

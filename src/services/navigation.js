import { CommonActions } from "@react-navigation/native";
import React from "react";

export const navigationRef = React.createRef();

/**
 * As vezes e preciso disparar uma navegação em locais onde nao se tem acesso
 * ao "navigation", para esses casos e necessario acessar a ref do navigation container
 * link  - https://reactnavigation.org/docs/navigating-without-navigation-prop/
 * @param {} routeName - nome da rota que sera acessada
 */
export const refresh = (routeName) => {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: {
        refresh: true,
      },
    })
  );
};

export default {
  refresh,
};

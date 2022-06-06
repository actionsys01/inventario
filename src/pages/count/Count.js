import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import {
  StyledDashboard,
  StyledRenderItem,
  StyledLine,
  StyledLineCustom,
} from "./Count.styled";
import ShimmerEffect from "./shimmerEffect/ShimmerEffect";
import { useAuth } from "../../contexts/AuthProvider";
import { getCout } from "../../services/list";
import { useFilter } from "../../contexts/FilterProvider";
import Header from "./header/Header";
import { toast } from "../../function/toast";
import { ContainerNotFound } from "../detail/Detail.styled";
import NotFound from "../../../assets/images/not_found.svg";
import TextTitle from "../../components/textTitle/TextTitle";
import TextSubtitle from "../../components/textSubtitle/TextSubtitle";

export default function Count({ navigation, route }) {
  const { filters } = useFilter();
  const { currentUser } = useAuth();
  const [nfe, setNfes] = useState([]);
  const [isFetch, setIsFetch] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const window = useWindowDimensions();

  function onRefresh() {
    setRefreshing(true);
    getItems();
  }

  //executa a primeira fez, depois de logar ou abrir o app
  useEffect(() => {
    setIsFetch(true);
    getItems();
  }, []);

  useEffect(() => {
    /**
     * Caso a tela esteja focada e a variavel "refresh" igual "true"
     * significa que foi solicitado o refresh da lista
     */
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params) {
        if (route.params.refresh) {
          setIsFetch(true);
          getItems();
        }
        //inserido valor default
        navigation.setParams({ refresh: false });
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  function getItems() {
    getCout(filters)
      .then((response) => {
        const nfes = response.data.Q72_Act_ActionSysInventario_ListarContagem_1;
        if (nfes.records > 0) {
          setNfes(
            response.data.Q72_Act_ActionSysInventario_ListarContagem_1.rowset
          );
        } else {
          setNfes([]);
          toast("Nenhum dado localizado");
        }
      })
      .catch(() => {
        toast("Ocorreu um erro ao buscar dados");
      })
      .finally(() => {
        setIsFetch(false);
        setRefreshing(false);
      });
  }

  function renderItem({ item }) {
    return (
      <StyledRenderItem onPress={() => navigation.navigate("Detail", { item })}>
        <StyledLine>
          <TextTitle label="Número Ciclo" />
          <TextSubtitle label={item.NumCiclo} />
          <TextTitle label="Descrição" />
          <TextSubtitle label={item.DescCont} />
        </StyledLine>
        <StyledLine>
          <TextTitle label="Status" />
          <TextSubtitle label={item.DescStatusCiclo} />
        </StyledLine>
        <StyledLine>
          <TextTitle label="Data" />
          <TextSubtitle label={item.DataCont} />
        </StyledLine>
        <StyledLineCustom>
          <TextTitle label="Locais p/Cont." />
          <TextSubtitle label={item.LocaisCont} />
          <TextTitle label="Itens p/contar:" />
          <TextSubtitle label={item.ItensContar} />
        </StyledLineCustom>
      </StyledRenderItem>
    );
  }

  return (
    <StyledDashboard>
      <Header />
      {isFetch ? (
        <>
          <ShimmerEffect />
          <ShimmerEffect />
          <ShimmerEffect />
          <ShimmerEffect />
          <ShimmerEffect />
        </>
      ) : (
        <>
          {nfe.length === 0 ? (
            <ContainerNotFound>
              <NotFound width={window.width * 2} height={window.width * 0.5} />
              <Text style={{ marginTop: 10 }}>Nenhuma contagem localizada</Text>
            </ContainerNotFound>
          ) : (
            <FlatList
              data={nfe}
              renderItem={renderItem}
              style={{ padding: 15 }}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  colors={["#1D4A71"]}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              }
            />
          )}
        </>
      )}
    </StyledDashboard>
  );
}

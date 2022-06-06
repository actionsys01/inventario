import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  StyledDetail,
  StyleBarCode,
  TitleBarcode,
  ButtonBarCode,
  StyledItem,
  ContainerInfoItem,
  LineInput,
  ContainerInfoItemCustom,
  TextTitleDetail,
  InputInfo,
  StyledLine,
  ContainerButton,
  StyledButton,
  ButtonReport,
  ButtonFinish,
  TextButton,
  TextButtonCustom,
  ContainerNotFound,
  ShimmerBarCode,
  TextStatus,
  StyledLineDetail,
  TextSubTitleDetail,
  LineDetail,
} from "./Detail.styled";
import TextTitle from "../../components/textTitle/TextTitle";
import TextSubtitle from "../../components/textSubtitle/TextSubtitle";
import {
  StyledSefaz,
  StyledPortaria,
  StyledDivergencia,
  ContainerStatus,
} from "../count/Count.styled";
import { getCountCodeItens } from "../../services/list";
import DetailShimmerEffect from "./shimmerEffect/DetailShimmerEffect";
import NotFound from "../../../assets/images/not_found.svg";
import Toast from "react-native-tiny-toast";
import LoadingScore from "./loadingScore/LoadingScore";
import RenderItem from "./renderItem/RenderItem";
import HideInfoWithKeyboard from "../../components/hideInfoWithKeyboard/HideInfoWithKeyboard";
import { useFilter } from "../../contexts/FilterProvider";
import { toast } from "../../function/toast";
import NavigationService from "../../services/navigation";
import { endCount } from "../../services/count";
import { useAuth } from "../../contexts/AuthProvider";

function Detail({ navigation, route }) {
  const { currentUser } = useAuth();
  const { cleanFilter } = useFilter();
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [processing, setProcessing] = useState("NONE");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const window = useWindowDimensions();

  const { DescCont, NumCiclo, Filial } = route.params.item;

  useEffect(() => {
    navigation.setOptions({ title: `CICLO: ${NumCiclo}` });
    getItens();
  }, []);

  function getItens() {
    getCountCodeItens(NumCiclo)
      .then((response) => {
        const item =
          response.data.Q72_Act_ActionSysInventario_ListarItensContagem_1
            .rowset;
        setData(item);
        setFilteredData(item);
      })
      .catch((error) => {
        toast(
          "Ocorreu um erro ao buscar dados",
          Toast.position.CENTER,
          Toast.duration.LONG
        );
      })
      .finally(() => {
        setIsFetch(false);
      });
  }

  async function handleInput(value, item) {
    const newdata = data.slice();
    //obtem o index do item selecionado
    const index = newdata.indexOf(item);

    newdata.splice(index, 1, item);

    //inserir as dados digitados pelo usuario
    //nos campos correspondentes
    item.Quantidade = value.replace(/[^0-9]/g, "");

    console.log(item);
    setData(newdata);
  }

  function handleEndCount() {
    Keyboard.dismiss();

    const newdata = data.slice();

    //verifica se a qtd que e um campo obrigatorio foi preenchidos em todos os itens
    const isAmount = newdata.find((item) => {
      return !item.Quantidade || item.Quantidade == 0;
    });

    if (isAmount) {
      Alert.alert(
        "Finalizar contagem",
        "Deseja confirmar contagem mesmo com itens não preenchidos?",
        [
          {
            text: "Sim",
            onPress: () => count(),
            style: "cancel",
          },
          { text: "Não", onPress: () => {} },
        ],
        { cancelable: false }
      );
    } else {
      count();
    }
  }

  function count() {
    setLoading(true);
    const response = endCount(data, NumCiclo);

    if (response) {
      setTimeout(() => {
        cleanFilter();
        setProcessing("SUCESS");
        setTimeout(() => {
          setLoading(false);
          NavigationService.refresh("Count");
        }, 5000);
      }, 5000);
    }
  }

  function handleSearch(search) {
    console.log(search);
    setSearchField(search);
  }

  const filterData = filteredData.filter(
    (item) =>
      item.Lote.toLowerCase().includes(searchField.toLowerCase()) ||
      item.LocalNaoFormatado.toLowerCase().includes(
        searchField.toLowerCase()
      ) ||
      item.ItemLongo.toLowerCase().includes(searchField.toLowerCase()) ||
      item.CategVendas1.toLowerCase().includes(searchField.toLowerCase()) ||
      item.CategVendas2.toLowerCase().includes(searchField.toLowerCase()) ||
      item.CategVendas3.toLowerCase().includes(searchField.toLowerCase()) ||
      item.CategVendas4.toLowerCase().includes(searchField.toLowerCase()) ||
      item.CategVendas5.toLowerCase().includes(searchField.toLowerCase()) ||
      item.DescricaoCont.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <StyledDetail>
          <LoadingScore show={loading} error={error} processing={processing} />
          <StyledLineDetail>
            <TextTitleDetail>N. Ciclo</TextTitleDetail>
            <TextSubTitleDetail>{NumCiclo}</TextSubTitleDetail>
            <LineDetail>
              <TextTitleDetail>Descrição</TextTitleDetail>
              <TextSubTitleDetail>{DescCont}</TextSubTitleDetail>
            </LineDetail>
          </StyledLineDetail>
          <StyledLineDetail>
            <TextTitleDetail>Filial</TextTitleDetail>
            <TextSubTitleDetail>{Filial.trim()}</TextSubTitleDetail>
            <LineDetail>
              <TextTitleDetail>Contador por</TextTitleDetail>
              <TextSubTitleDetail>{currentUser.user}</TextSubTitleDetail>
            </LineDetail>
          </StyledLineDetail>
          {isFetch ? (
            <>
              <DetailShimmerEffect />
              <DetailShimmerEffect />
              <DetailShimmerEffect />
              <DetailShimmerEffect />
            </>
          ) : (
            <>
              {data.length > 0 ? (
                <RenderItem
                  items={filterData}
                  handleInput={handleInput}
                  handleSearch={handleSearch}
                  search={searchField}
                  setSearch={setSearchField}
                />
              ) : (
                <ContainerNotFound>
                  <NotFound
                    width={window.width * 2}
                    height={window.width * 0.5}
                  />
                  <Text style={{ marginTop: 10 }}>
                    Itens da nota não localizados
                  </Text>
                </ContainerNotFound>
              )}

              <HideInfoWithKeyboard>
                <ContainerButton>
                  <ButtonReport
                    onPress={handleEndCount}
                    underlayColor="#5ecf51"
                  >
                    <TextButton>CONFIRMAR</TextButton>
                  </ButtonReport>
                </ContainerButton>
              </HideInfoWithKeyboard>
            </>
          )}
        </StyledDetail>
      </>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(Detail);

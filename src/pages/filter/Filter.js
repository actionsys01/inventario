import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  createRef,
} from "react";
import { View, Platform, Keyboard, useWindowDimensions } from "react-native";
import Toast from "react-native-tiny-toast";
import { Ionicons } from "@expo/vector-icons";
import {
  StyledPicker,
  StyledFilter,
  ButtonInsertFilter,
  TextInsertFilter,
  TitleFilterSelected,
  TextFilterSelected,
  InputFilter,
  StyledModal,
  ContainerInfo,
  TextError,
} from "./Filter.styled";
import {
  FILTERS,
  FILTERS_ENUMS,
  FILTER_NAVIGATION,
  STATUS_DE_ATE,
} from "../../constants/filter";
import Tag from "../../components/tag/Tag";
import { useFilter } from "../../contexts/FilterProvider";
import Modal from "../../components/modal/Modal";
import ButtonGoBack from "../../components/buttonGoBack/ButtonGoBack";
import { toast } from "../../function/toast";
import {Picker} from "@react-native-picker/picker";
import NavigationService from "../../services/navigation";
import { useBackHandler } from "@react-native-community/hooks";
export default function Filter({ navigation }) {
  const { filters, prevFilters, saveFilter, removeFilter } = useFilter();
  const inputRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [currentFilters, setCurrentFilters] = useState([]);
  const windows = useWindowDimensions();

  useEffect(() => {
    //armazena o filtro atual
    setCurrentFilters(filters);
  }, []);

  useBackHandler(() => {
    if (filters || !filters) {
      handleGoBack();
      return true;
    }
    return false;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ButtonGoBack onPress={handleGoBack} />,
    });
  }, [navigation, filters, prevFilters, currentFilters, isModalVisible]);

  //resposanvel por checar o filtro
  //efetua o find ou go back
  function handleGoBack() {
    //caso o filtro atual seja igual ao filtro(context), significa
    //que nao houve alteracao
    if (JSON.stringify(currentFilters) === JSON.stringify(filters)) {
      if (isModalVisible) {
        setIsModalVisible(!isModalVisible);
      } else {
        navigation.goBack();
      }
    } else {
      NavigationService.refresh("Count");
    }
  }

  function handleFilter(filter) {
    console.log('filter', filter)
    setFilter(filter);
    if (Platform.OS != "ios") {
      handleSubmit(filter);
    }
  }

  function handleSubmit(value) {
    const filterSelected = Platform.OS == "ios" ? filter : value;

    if (filterSelected) {
      const isSelected = filters.find((item) => {
        return item.value === filterSelected;
      });

      if (isSelected) {
        toast("Filtro já selecionado");
      } else {
        const option = FILTERS.find((item) => {
          return item.value === filterSelected;
        });
        setIsModalVisible(true);
        setFilterSelected(option.label);

        const statusDeAte =
          option.label === FILTERS_ENUMS.STATUS_ATE.label ||
          option.label === FILTERS_ENUMS.STATUS_DE.label;

        if (statusDeAte) {
          setError("Ex:. 10, 20, 30, 40, 50, 60, 99");
        }
      }
    }
  }

  //inseri o filtro informado pelo usuario
  function handleInsertFilter() {
    const dataDeAte =
      filterSelected === FILTERS_ENUMS.DATA_ATE.label ||
      filterSelected === FILTERS_ENUMS.DATA_DE.label;

    const statusDeAte =
      filterSelected === FILTERS_ENUMS.STATUS_ATE.label ||
      filterSelected === FILTERS_ENUMS.STATUS_DE.label;

    if (dataDeAte) {
      validationDataDeAte();
    } else if (statusDeAte) {
      validationsStatusDeAte();
    } else {
      finish();
    }
  }

  function validationDataDeAte() {
    if (input.length < 10) {
      setError("Informe uma data válida, ex:. 25/05/2020");
    } else {
      finish();
    }
  }
  function validationsStatusDeAte() {
    switch (input) {
      case STATUS_DE_ATE.DEZ:
      case STATUS_DE_ATE.VINTE:
      case STATUS_DE_ATE.TRINTA:
      case STATUS_DE_ATE.QUARENTA:
      case STATUS_DE_ATE.CINQUENTA:
      case STATUS_DE_ATE.SESSENTA:
      case STATUS_DE_ATE.NOVENTA_NOVE:
        finish();
        break;

      default:
        setError("Informe um valor, ex:. 10, 20, 30, 40, 50, 60, 99");
        break;
    }
  }

  function finish() {
    if (input) {
      Keyboard.dismiss();
      saveFilter({ label: filterSelected, input: input, value: filter });
      setIsModalVisible(false);
      setInput("");
      setFilterSelected("");
      setFilter("");
      setError("");
    }
  }
  //resposanvel por fechar o modal
  function toggleModal() {
    setIsModalVisible(!isModalVisible);
    Keyboard.dismiss();
    setInput("");
    setFilter("");
    setFilterSelected("");
    setError("");
  }

  const keyboardType =
    filterSelected === FILTERS_ENUMS.FILIAL.label ||
    filterSelected === FILTERS_ENUMS.DESCRICAO.label
      ? "default"
      : "numeric";

  const inputType =
    filterSelected === FILTERS_ENUMS.DATA_DE.label ||
    filterSelected === FILTERS_ENUMS.DATA_ATE.label
      ? "datetime"
      : "custom";
  
  useEffect(() => {
    console.log('filterSelected', filterSelected)
  
    
  }, [filterSelected])
  useEffect(() => {
    console.log('filter', filter)
  
    
  }, [filter])
  

  return (
    <StyledFilter>
      <StyledPicker>
        <Picker
          value={filter}
          // selectedValue={{
          //   label: "Selecione o filtro",
          //   value: "",
          // }}
          placeholder={{
            label: "Selecione o filtro",
            value: "",
          }}
          doneText="Selecionar"
          style={{
            inputIOS: {
              borderRadius: 15,
              backgroundColor: "#fff",
              padding: 15,
              width: windows.width * 0.9,
            },
            inputAndroid: {
              borderRadius: 15,
              backgroundColor: "#fff",
              padding: 15,
              width: windows.width * 0.9,
            },
            placeholder: {
              color: "#000",
            },
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          onValueChange={(value) => handleFilter(value)}
          onDonePress={handleSubmit}
          // items={FILTERS}
          useNativeAndroidPickerStyle={true} //android only
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
          }}>
          {FILTERS.map((item) => <Picker.Item  label={item.label} value={item.value}/>)}
          </Picker>
        
      </StyledPicker>
      <Tag filters={filters} handleRemoveItem={removeFilter} />

      <StyledModal
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior={Platform.OS == "ios" ? "padding" : null}
        enabled
        keyboardVerticalOffset={70}
      >
        <Modal show={isModalVisible} close={toggleModal}>
          <ContainerInfo>
            <TitleFilterSelected>
              Filtro selecionado:
              <TextFilterSelected> {filterSelected}</TextFilterSelected>
            </TitleFilterSelected>
          </ContainerInfo>
          {error.length > 0 && <TextError>{error}</TextError>}
          <InputFilter
            ref={inputRef}
            type={inputType}
            keyboardType={keyboardType}
            value={input}
            onChangeText={(input) => setInput(input)}
            onSubmitEditing={handleInsertFilter}
            options={{
              format: "DD/MM/YYYY",
              //inserido "astericos" para que seja possivel inserir qualquer valor
              mask:
                "****************************************************************",
            }}
          />

          <ButtonInsertFilter
            onPress={handleInsertFilter}
            underlayColor="#5ecf51"
            disabled={!input}
            input={input}
          >
            <TextInsertFilter>INSERIR</TextInsertFilter>
          </ButtonInsertFilter>
        </Modal>
      </StyledModal>
    </StyledFilter>
  );
}

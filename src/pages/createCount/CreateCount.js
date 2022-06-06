import React, { useRef, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {
  StyledInput,
  StyledCreateCount,
  ButtonCreateButton,
  TextButtonCreateInput,
} from "./CreateCount.styled";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import Toast from "react-native-tiny-toast";
import { createCount } from "../../services/count";
import { toast } from "../../function/toast";
import TextTitle from "../../components/textTitle/TextTitle";
import Header from "../count/header/Header";
import NavigationService from "../../services/navigation";
import { useFilter } from "../../contexts/FilterProvider";
export default function CreateCount({ navigation }) {
  const { cleanFilter } = useFilter();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    Keyboard.dismiss();
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        filial: Yup.string().required("Filial é obrigatória"),
        descricao: Yup.string().required("Descrição é obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(true);
      createCount(data)
        .then((response) => {
          const { NumJob } = response.data;
          toast(
            `Execução da Lista enviada ao ERP.\nCaso seja um item e filial válidos,\nlista será criada\nJob Number da execução: ${NumJob}`,
            Toast.position.CENTER,
            Toast.duration.LONG
          );
          cleanFilter();
          formRef.current.reset();
          setTimeout(() => {
            NavigationService.refresh("Count");
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          Keyboard.dismiss();
          toast(
            "Ops...Ocorreu um erro, tente novamente!",
            Toast.position.CENTER,
            Toast.duration.LONG
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      const validationErrors = {};
      Keyboard.dismiss();
      if (err instanceof Yup.ValidationError) {
        const message = err.inner[0].message;
        toast(message, "", Toast.duration.LONG);
      }
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Header />
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS == "ios" ? "padding" : null}
          enabled
        >
          <StyledCreateCount>
            <ScrollView>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <TextTitle label="*Filial" />
                <StyledInput
                  name="filial"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef("item").focus()
                  }
                  returnKeyType="next"
                />
                <TextTitle label="Item" />
                <StyledInput
                  name="item"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef("descricao").focus()
                  }
                  returnKeyType="next"
                />
                <TextTitle label="*Descrição" />
                <StyledInput
                  name="descricao"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef("lote").focus()
                  }
                  returnKeyType="next"
                />
                <TextTitle label="Lote" />
                <StyledInput
                  name="lote"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef("local").focus()
                  }
                  returnKeyType="next"
                />
                <TextTitle label="Local" />
                <StyledInput
                  name="local"
                  onSubmitEditing={() => formRef.current.submitForm()}
                />
              </Form>
            </ScrollView>
            <ButtonCreateButton
              disabled={loading}
              underlayColor="#5ecf51"
              onPress={() => formRef.current.submitForm()}
            >
              <>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <TextButtonCreateInput>CRIAR CONTAGEM</TextButtonCreateInput>
                )}
              </>
            </ButtonCreateButton>
          </StyledCreateCount>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
}

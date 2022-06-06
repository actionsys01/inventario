import {
  ScrollView,
  Keyboard,
  StyleSheet,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Form } from "@unform/mobile";
import { AntDesign } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  ButtonSave,
  TextButtonSave,
  StyledUserSettings,
  Title,
  ContainerTwoInputs,
  StyledEndpoint,
  StyledDoor,
  ContainerInput,
  StyledServer,
  StyledPicker,
  InputSettings,
} from "./UserSettings.styled";
import * as Yup from "yup";
import { useSettings } from "../../contexts/SettingsProvider";
import Selector from "../../components/Selector";
import { toast } from "../../function/toast";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function UserSettings({ navigation: { navigate } }) {
  const formRef = useRef(null);
  const pickerRef = useRef(null);
  const { saveSettings, settings } = useSettings();
  const window = useWindowDimensions();
  async function handleSubmit(data) {
    console.log("daga", data);
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        protocol: Yup.string().required("Protocolo é obrigatório"),
        server: Yup.string().required("Servidor é obrigatório"),
        endpoint: Yup.string().required("Endpoint é obrigatório"),
        port: Yup.string().required("Porta é obrigatório"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      saveSettings(data);
      navigate("Login");
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        Keyboard.dismiss();
        const message = err.inner[0].message;
        toast(message);
      }
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#1D4A71" translucent style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior={Platform.OS == "ios" ? "padding" : null}
          enabled
          keyboardVerticalOffset={70}
        >
          <StyledUserSettings>
            <ScrollView>
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={settings}
              >
                <Title>PROTOCOLO</Title>
                {/* <StyledPicker> */}
                  <Selector
                    name="protocol"
                    settings={settings}
                    items={[
                      { label: "HTTPS", value: "https://" },
                      { label: "HTTP", value: "http://" },
                    ]}
                    placeholder={{
                      label: "Selecione o protocolo",
                      value: "",
                    }}
                  />
                {/* </StyledPicker> */}
                <Title>IP DO SERVIDOR</Title>
                <StyledServer>
                  <MaterialCommunityIcons
                    name="server"
                    size={25}
                    color="#498FCC"
                  />
                  <InputSettings
                    name="server"
                    placeholder="177.188.121.133 ou action92"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      formRef.current.getFieldRef("port").focus()
                    }
                    blurOnSubmit={false}
                  />
                </StyledServer>
                <ContainerTwoInputs>
                  <StyledDoor>
                    <Title>PORTA</Title>
                    <ContainerInput>
                      <MaterialCommunityIcons
                        name="door-open"
                        size={25}
                        color="#498FCC"
                      />
                      <InputSettings
                        name="port"
                        placeholder="8081"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          formRef.current.getFieldRef("endpoint").focus()
                        }
                        blurOnSubmit={false}
                      />
                    </ContainerInput>
                  </StyledDoor>
                  <StyledEndpoint>
                    <Title>ENDPOINT</Title>
                    <ContainerInput>
                      <AntDesign name="enviromento" size={25} color="#498FCC" />
                      <InputSettings
                        name="endpoint"
                        placeholder="jderest"
                        returnKeyType="done"
                        onSubmitEditing={() => formRef.current.submitForm()}
                        blurOnSubmit={false}
                        s
                      />
                    </ContainerInput>
                  </StyledEndpoint>
                </ContainerTwoInputs>
              </Form>
            </ScrollView>

            <ButtonSave
              onPress={() => formRef.current.submitForm()}
              underlayColor="#5ecf51"
            >
              <TextButtonSave>SALVAR</TextButtonSave>
            </ButtonSave>
          </StyledUserSettings>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { Form } from "@unform/mobile";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Image,
} from "react-native";
import {
  TextUser,
  TextPassword,
  ContainerInput,
  ButtonSignIn,
  ButtonSettings,
  StyledLogin,
  TextButtonSignIn,
  TextButtonSettings,
  FormLogin,
  InputLogin,
} from "./Login.styled";
import { useAuth } from "../../contexts/AuthProvider";
import { signInRequest } from "../../services/auth";
import { useSettings } from "../../contexts/SettingsProvider";
import Toast from "react-native-tiny-toast";
import { API_ERROR } from "../../constants/api.errors";
import { toast } from "../../function/toast";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import HideInfoWithKeyboard from "../../components/hideInfoWithKeyboard/HideInfoWithKeyboard";
import { useKeyboard } from "@react-native-community/hooks";
import { Platform } from "react-native";
export default function Login({ navigation }) {
  const { baseUrl } = useSettings();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const formRef = useRef(null);
  const window = useWindowDimensions();
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    if (Platform.OS == "ios") {
      Keyboard.addListener("keyboardWillShow", _keyboardDidShow);
      Keyboard.addListener("keyboardWillHide", _keyboardDidHide);
    } else {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    }

    return () => {
      if (Platform.OS == "ios") {
        Keyboard.removeListener("keyboardWillShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardWillHide", _keyboardDidHide);
      } else {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      }
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboard(true);
  };

  const _keyboardDidHide = () => {
    setKeyboard(false);
  };

  async function handleSubmit(data) {
    if (!baseUrl) {
      Keyboard.dismiss();
      toast("Preencha os dados de configurações", "", Toast.duration.LONG);
    } else {
      try {
        // Remove all previous errors
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          user: Yup.string().required("Usuário é obrigatório"),
          password: Yup.string()
            .min(3, "Senha precisa ter no mínimo 3 caracteres")
            .required("Senha é obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        signInRequest(data, baseUrl)
          .then(() => {
            signIn(data);
          })
          .catch((error) => {
            Keyboard.dismiss();
            let message;
            if (error.message === API_ERROR.TIMEOUT.ERROR) {
              message = API_ERROR.TIMEOUT.MESSAGE;
            } else if (error.message === API_ERROR.NETWORK_ERROR.ERROR) {
              message = API_ERROR.NETWORK_ERROR.MESSAGE;
            } else {
              message = API_ERROR.USER_INCORRECT.MESSAGE;
            }

            //apresenta a mensagem de erro ao usuario
            toast(message, "", Toast.duration.LONG);
          })
          .finally(() => setLoading(false));
      } catch (err) {
        const validationErrors = {};
        Keyboard.dismiss();
        if (err instanceof Yup.ValidationError) {
          const message = err.inner[0].message;
          toast(message, "", Toast.duration.LONG);
        }
      }
    }
  }

  function handleSettings() {
    Keyboard.dismiss();
    navigation.navigate("UserSettings");
  }

  return (
    <>
      <StatusBar backgroundColor="#E8E8E8" translucent style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledLogin>
          {!keyboard && (
            <LinearGradient
              start={{ x: 0.5, y: 1.2 }}
              end={{ x: 0, y: 0.6 }}
              locations={[0.9, 0.9]}
              colors={["#1D4A71", "#E8E8E8"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: window.height,
              }}
            />
          )}

          <Form ref={formRef} onSubmit={handleSubmit}>
            <View
              style={{
                marginTop: keyboard ? 30 : 0,
                width: "100%",
                height: "100%",
                justifyContent: keyboard ? "flex-start" : "center",
                alignItems: "center",
              }}
            >
              <HideInfoWithKeyboard>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Image
                    style={{ width: 150, height: 130 }}
                    source={require("../../../assets/images/actionsys-logo.png")}
                  />
                </View>
              </HideInfoWithKeyboard>
              <TextUser>USUÁRIO</TextUser>
              <ContainerInput>
                <SimpleLineIcons name="user" size={20} color="#498FCC" />
                <InputLogin
                  name="user"
                  placeholder="Digite o usúario"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    formRef.current.getFieldRef("password").focus()
                  }
                  blurOnSubmit={false}
                />
              </ContainerInput>
              <TextPassword>SENHA</TextPassword>
              <ContainerInput>
                <SimpleLineIcons name="lock" size={20} color="#498FCC" />
                <InputLogin
                  name="password"
                  placeholder="Digite a senha"
                  secureTextEntry={visiblePassword}
                  returnKeyType="done"
                  onSubmitEditing={() => formRef.current.submitForm()}
                  blurOnSubmit={false}
                />
                <MaterialIcons
                  name={!visiblePassword ? "visibility" : "visibility-off"}
                  size={25}
                  color="#498fcc"
                  onPress={() => setVisiblePassword(!visiblePassword)}
                />
              </ContainerInput>
              <ButtonSignIn
                underlayColor="#368dd9"
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                <>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <TextButtonSignIn>ENTRAR</TextButtonSignIn>
                  )}
                </>
              </ButtonSignIn>
              <ButtonSettings underlayColor="#faad39" onPress={handleSettings}>
                <>
                  <SimpleLineIcons name="settings" size={18} color="#fff" />
                  <TextButtonSettings>CONFIGURAÇÕES</TextButtonSettings>
                </>
              </ButtonSettings>
            </View>
          </Form>
        </StyledLogin>
      </TouchableWithoutFeedback>
    </>
  );
}

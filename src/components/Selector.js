import { useField } from "@unform/core";
import React, { useRef, useState, useEffect } from "react";
import {Picker} from "@react-native-picker/picker";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
/**
 * Componente Picker criado para ser utilizado junto com unform - rockeseat
 * @param name  - nome do picker
 * @param children - componentes filhos - itens picker
 * @param settings.protocol - recuperar o valor que foi salvo do protocolo selecionado
 * @param placeholder - objeto placeholder que sera apresetando
 * @param items - itens que serap apresentados no picker
 *
 */
export default function Selector({
  name,
  settings,
  items,
  placeholder,
  // ...rest
}) {
  const pickerRef = useRef(null);
  const [option, setOption] = useState(settings.protocol);
  const { fieldName, registerField } = useField(name);
  const windows = useWindowDimensions();

  useEffect(() => {
    console.log('pickerRef.current', pickerRef.current)
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      path: "props.value",
    });
  }, [registerField]);

  useEffect(() => {
    console.log('option', option)
  }, [option])

  return (
    <Picker
      // {...rest}
      placeholder={placeholder}
      ref={pickerRef}
      value={option}
      selectedValue={option}
      // doneText="Selecionar"
      style={{
        ...pickerSelectStyles,
        inputIOS: {
          borderRadius: 15,
          backgroundColor: "#f7f",
          padding: 15,
          width: windows.width * 0.85,
        },
        inputAndroid: {
          borderRadius: 15,
          backgroundColor: "#f7f",
          padding: 15,
          width: windows.width * 0.85,
        },
        iconContainer: {
          top: Platform.OS == "ios" ? 10 : 15,
          right: 12,
        },
      }}
      onValueChange={(value) => setOption(value)}
      // items={items}
      useNativeAndroidPickerStyle={false} //android only
      Icon={() => {
        return <Ionicons name="md-arrow-down" size={24} color="gray" />;
      }}>
      {items.map((it) => <Picker.Item label={it.label} value={it.value} />)}
      
      
      </Picker>
    
  );
}
const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: "#000",
  },
});

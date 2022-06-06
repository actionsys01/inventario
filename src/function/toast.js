import Toast from "react-native-tiny-toast";

/**
 * Toast utilizado para apresentar mensagens
 *
 * @param {*} message - nensagem que sera apresentado
 * @param {*} position - posicionamento do toast
 * @param {*} duration - tempo que sera apresentado o toast
 */
export function toast(message, position, duration) {
  console.log("position", position);
  console.log("Toast.position.BOTTOM", Toast.position.BOTTOM);
  console.log("Toast.position.CENTER", Toast.position.CENTER);
  Toast.show(message, {
    containerStyle: { borderRadius: 30, padding: 15 },
    textStyle: { fontSize: 13 },
    position:
      position === Toast.position.CENTER ? position : Toast.position.BOTTOM,
    duration:
      duration === Toast.duration.LONG
        ? Toast.duration.LONG
        : Toast.duration.SHORT,
  });
}

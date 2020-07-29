import { exp } from "react-native-reanimated";

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
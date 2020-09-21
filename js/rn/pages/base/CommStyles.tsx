import {StyleSheet} from "react-native";
import {scale} from "../../public/tools/Scale";

/**
 * 公共的基础 style
 */
const CommStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  line_v: {
    width: scale(1),
    backgroundColor: 'grey',
  },
  line_h: {
    height: scale(1),
    backgroundColor: 'grey',
  },
});

export default CommStyles;

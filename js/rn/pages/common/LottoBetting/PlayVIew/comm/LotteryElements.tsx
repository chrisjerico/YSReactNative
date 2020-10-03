import {StyleSheet} from "react-native";
import {scale} from "../../../../../public/tools/Scale";
import * as React from "react";
import {useDimensions} from "@react-native-community/hooks";

//球球 0到9
const BALL_NUMBERS_0_9 = Array.from({length: 10}, (item, index) => index)

//球球 1到10
const BALL_NUMBERS_1_10 = Array.from({length: 10}, (item, index) => index + 1)

export {BALL_NUMBERS_0_9, BALL_NUMBERS_1_10}

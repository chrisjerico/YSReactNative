import {Image, ImageStyle, StyleProp, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import * as React from "react";

interface ImageButtonProps {
    uri: string
    onPress: () => void
    style?: StyleProp<ViewStyle>
    imgStyle?: StyleProp<ImageStyle>
}

const defaultImgStyle: StyleProp<ImageStyle> = {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
}
const defaultViewStyle: StyleProp<ViewStyle> = {
    alignItems: "center",
    justifyContent: "center"
}
export const ImageButton = ({uri, imgStyle, style, onPress}: ImageButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPress()}>
                <Image style={[defaultImgStyle, imgStyle]} source={{uri}}/>
        </TouchableWithoutFeedback>
    )
}

import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";
import theme from "../../../global/styles/theme";

type Props = TextInputProps

export function Input({...rest}: Props) {
    return (
        <Container 
        placeholderTextColor={theme.colors.text_light}
        {...rest}/>
    )
}
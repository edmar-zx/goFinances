import styled from "styled-components"
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled.View`
    background-color: ${ ({theme}) => theme.colors.shape };
    width: ${RFValue(300)}px;
    border-radius: ${({theme}) => theme.borderRadius.large}px;
    padding: 20px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: ${({theme}) => theme.spacing.small};
`
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`
export const Title = styled.Text`
    font-size: ${({theme}) => theme.fontSize.small}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text}
`
export const Icon = styled(Feather)`
    font-size: ${({theme}) => theme.fontSize.xlarge}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.success};
`
export const Footer = styled.View``

export const Amount = styled.Text`
    font-size: ${({theme}) => theme.fontSize.xxlarge};
    font-family: ${({theme}) => theme.fonts.medium};
    margin-top: ${({theme}) => theme.spacing.xlarge};
    color: ${({theme}) => theme.colors.text};

`
export const LastTransaction = styled.Text`
    font-size: ${({theme}) => theme.fontSize.small};
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_light};
`
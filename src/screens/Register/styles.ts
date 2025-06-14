import styled from "styled-components/native";

import{
    RFPercentage,
    RFValue,
} from 'react-native-responsive-fontsize'
import theme from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`

export const Header = styled.View`
    width: 100%;
    height: ${ RFPercentage(20) };
    background-color: ${ ({theme}) => theme.colors.primary };
`

export const Text = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`

import styled from "styled-components/native";

import{
    RFPercentage,
    RFValue,
} from 'react-native-responsive-fontsize'
import theme from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
    background-color: ${ ({theme}) => theme.colors.primary };
    width: 100%;
    height: ${ RFValue(120)}px;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
    font-family: ${({ theme }) => theme.fonts.bold};
   
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-top: ${RFValue(50)}px;;
`

export const Form = styled.View`
    margin-bottom: 60px;
    width: 100%;
    padding: 24px;
`

export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
`
export const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
`;



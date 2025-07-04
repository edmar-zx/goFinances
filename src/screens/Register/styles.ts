import styled from "styled-components/native";
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(120)}px;
    align-items: center;
    justify-content: center;
    padding-bottom: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-top: ${RFValue(50)}px;;
`

export const Form = styled.View`
    margin-bottom: ${RFPercentage(7)}px;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.large}px;
    gap: ${({ theme }) => theme.spacing.medium}px;
`

export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const ButtonWrapper = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.large}px;
  left: ${({ theme }) => theme.spacing.large}px;
  right: ${({ theme }) => theme.spacing.large}px;
`;
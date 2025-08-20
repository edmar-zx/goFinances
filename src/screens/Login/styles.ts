import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`

export const ScreenTop = styled.View`
    height: 65%;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: center;
`
export const ScreenDown = styled.View`
    height: 35%;
    background-color: ${({ theme }) => theme.colors.secondary};
    align-items: center;
    gap: ${RFValue(30)}px;;
`

export const ContentSection = styled.View`
  flex: 1;
  width: 70%;
  align-items: center;
  justify-content: space-evenly;
  padding: ${RFValue(20)}px 0;
  margin-top: ${RFValue(40)}px;
`;

export const MoneyIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(60)}px;
`;

export const LogoGroup = styled.View`
  align-items: center;
  gap: ${RFValue(12)}px;
`;

export const TextStyled = styled.Text<{ variant: 'title' | 'tagline' | 'message' }>`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;

  font-size: ${({ variant, theme }) =>
    variant === 'title'
      ? theme.fontSize.large
      : variant === 'tagline'
      ? theme.fontSize.xlarge
      : theme.fontSize.small};

  font-family: ${({ variant, theme }) =>
    variant === 'message' ? theme.fonts.regular : theme.fonts.medium};
`;
export const SocialButtonsWrapper = styled.View`
  position: absolute;
  top: 65%;
  left: 0;
  right: 0;
  align-items: center;
  gap: ${RFValue(20)}px;

  /* Centraliza o conteúdo verticalmente sobre a linha de divisão */
  transform: translateY(-${RFValue(25)}px);
`;


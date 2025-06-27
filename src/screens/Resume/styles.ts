import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const MonthNavigation = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${ RFValue(40)}px;

`;

export const MonthText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
`;

export const IconButton = styled.TouchableOpacity`
    marginHorizontal: ${ RFValue(70)}px;
`;

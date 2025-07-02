import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";


export const MonthNavigation = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(25)}px;
  padding: 0 16px;

`;

export const MonthText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  
`;

export const IconButton = styled.TouchableOpacity`
    
`;

export const Graphic = styled.View`
  align-items: center;
  
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: stretch; /* ← garante altura total */
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.shape};
  overflow: hidden; /* garante que o ColorBox não saia da borda arredondada */
`;

export const SpaceText = styled.View`
  flex: 1;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;

`;

export const ColorBox = styled.View<{ bgColor: string }>`
  width: 6px;
  background-color: ${({ bgColor }) => bgColor};
`;

export const Text = styled.Text`
  font-size: 14px;
`; 



export const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
`


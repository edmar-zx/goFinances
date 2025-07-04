import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

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

export const SlideContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 4px;
`;

interface DotProps {
  active: boolean;
  type: 'positive' | 'negative';
}

export const Dot = styled.View<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: ${({ active }) =>
    active ? '#FFF' : '#888'};
`;

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
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const IconButton = styled.TouchableOpacity.attrs({
  hitSlop: { top: 40, bottom: 80, left: 80, right: 80 }
})``;

export const Graphic = styled.View`
  align-items: center;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: stretch;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
  border-radius: ${({ theme }) => theme.spacing.small}px;
  background-color: ${({ theme }) => theme.colors.shape};
  overflow: hidden;
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
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const PriceText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
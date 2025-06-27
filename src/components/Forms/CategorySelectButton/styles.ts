import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 16px 18px;


    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${({ theme }) => theme.borderRadius.medium}px;
    margin-bottom: 15px;


`;

export const CategoryText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
      color: ${({ isPlaceholder, theme }) =>
    isPlaceholder ? theme.colors.text_light : theme.colors.text};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;

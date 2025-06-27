// src/components/Forms/styles.ts

import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;
  padding: 20px;
  max-height: 60%;
`;

export const CategoryItem = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const CategoryText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const CancelButton = styled.TouchableOpacity`
  margin-top: 10px;
  align-items: center;
`;

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;


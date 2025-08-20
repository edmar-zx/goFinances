import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 10px;
  width: 80%;
`;

export const IconImage = styled.Image`
  width: ${RFPercentage(5)}px;
  height: ${RFPercentage(5)}px;
`;

export const IconSpacer = styled(IconImage)`
  opacity: 0;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.small  };
  text-align: center;
`;

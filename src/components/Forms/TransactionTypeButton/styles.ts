import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;

  padding: 16px;
  width: 45%;

  ${({ isActive, type }) =>
    isActive && type === 'up' &&
    css`
      background-color: ${({ theme }) => theme.colors.successLight};
    `
  }

  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attentionLight};
    `
  }
`;

export const Icon = styled(Feather) <{ type: 'up' | 'down' }>`
    font-size: ${({ theme }) => theme.fontSize.xlarge}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.small}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: ${({ theme }) => theme.spacing.small}px;
`;
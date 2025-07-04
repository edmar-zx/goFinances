import styled from 'styled-components/native';

interface ContainerProps {
  type?: 'success' | 'error';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 65px;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;;
  padding: 16px 20px;
  margin: 0 10px;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  elevation: 6;
  border-left-width: 10px;
  border-left-color: ${({ type, theme }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
`;

export const Content = styled.View`
  flex-direction: column;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.small};
  text-align: center;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: 12px;
  margin-top: 4px;
`;
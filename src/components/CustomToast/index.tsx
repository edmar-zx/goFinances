import React from 'react';
import { ToastProps } from 'react-native-toast-message';
import { Container, Content, Title, Message } from './styles';

interface CustomToastProps extends ToastProps {
  text1?: string;
  text2?: string;
  onHide?: () => void;
}

export function CustomToast({ text1, text2, type, onHide }: CustomToastProps) {
  return (
    <Container activeOpacity={0.9} onPress={onHide} type={type as 'success' | 'error'}>
      <Content>
        <Title>{text1}</Title>
        {text2 ? <Message>{text2}</Message> : null}
      </Content>
    </Container>
  );
}
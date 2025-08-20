import React from 'react';
import { Container, ContentSection, LogoGroup, MoneyIcon, ScreenDown, ScreenTop, SocialButtonsWrapper, TextStyled } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { SocialButton } from '../../components/SocialButton';
export function Login({ navigation }) {
  return (

<Container>
  <ScreenTop>
    <ContentSection>
      <LogoGroup>
        <MoneyIcon name="currency-exchange" />
        <TextStyled variant="title">gofinances</TextStyled>
      </LogoGroup>

      <TextStyled variant="tagline">
        Controle suas finanças de forma muito mais simples
      </TextStyled>

      <TextStyled variant="message">
        Faça seu login com uma das contas abaixo
      </TextStyled>
    </ContentSection>
  </ScreenTop>

  <ScreenDown />

  <SocialButtonsWrapper>
    <SocialButton
      icon={{ uri: 'https://img.icons8.com/?size=512&id=17949&format=png' }}
      text="Entrar com Google"
    />
    <SocialButton
      icon={{ uri: 'https://img.icons8.com/ios11/512/mac-os.png' }}
      text="Entrar com Apple"
    />
  </SocialButtonsWrapper>
</Container>
  );
}
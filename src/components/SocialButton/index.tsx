import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
  ButtonContainer,
  IconImage,
  ButtonText,
  IconSpacer,
} from './styles';

type Props = TouchableOpacityProps & {
  icon: any;
  text: string;
};

export function SocialButton({ icon, text, ...rest }: Props) {
  return (
    <ButtonContainer activeOpacity={0.7} {...rest}>
      <IconImage source={icon} />
      <ButtonText>{text}</ButtonText>
      <IconSpacer />
    </ButtonContainer>
  );
}
import React from 'react';
import { Container, CategoryText, Icon } from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  const isPlaceholder = title === '' || title === 'Categoria';

  return (
    <Container onPress={onPress}>
      <CategoryText isPlaceholder={isPlaceholder}>
        {isPlaceholder ? 'Categoria' : title}
      </CategoryText>
      <Icon name="chevron-down" />
    </Container>
  );
}

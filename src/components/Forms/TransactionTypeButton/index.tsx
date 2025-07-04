import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title, Icon } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
};

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
    return (
        <Container type = {type} isActive={isActive} {...rest}>
            <Icon name={type === 'up' ? 'arrow-up-circle' : 'arrow-down-circle'} type={type} />
            <Title>{title}</Title>
        </Container>
    )
}
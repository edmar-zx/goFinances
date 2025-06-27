import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 16px 18px;
    border-radius: ${({ theme}) => theme.borderRadius.medium}px;
    align-items: center;
    
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${({ theme }) => theme.fontSize.small}px;
    color: ${({ theme }) => theme.colors.shape};
`;
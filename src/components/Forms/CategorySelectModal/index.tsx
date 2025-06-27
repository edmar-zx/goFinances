import React from 'react';
import { Modal, FlatList, TouchableOpacity } from 'react-native';
import {
    ModalBackground,
    ModalContainer,
    CategoryItem,
    CategoryText,
    CancelButton,
    CancelText,
} from './styles';

type Props = {
    visible: boolean;
    categories: string[];
    onClose: () => void;
    onSelectCategory: (category: string) => void;
};

export function CategorySelectModal({
    visible,
    categories,
    onClose,
    onSelectCategory,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <ModalBackground>
                <ModalContainer>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                onSelectCategory(item);
                                onClose();
                            }}>
                                <CategoryItem>
                                    <CategoryText>{item}</CategoryText>
                                </CategoryItem>
                            </TouchableOpacity>
                        )}
                    />

                    <CancelButton onPress={onClose}>
                        <CancelText>Cancelar</CancelText>
                    </CancelButton>
                </ModalContainer>
            </ModalBackground>
        </Modal>
    );
}


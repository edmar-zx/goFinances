import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    View,
    Modal,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

import {
    Buttons,
    ButtonWrapper,
    Container,
    Form,
    Header,
    Title
} from "./styles";

import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelectModal } from '../../components/Forms/CategorySelectModal';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const categories = [
        'Supermercado',
        'Energia',
        'Água',
        'Transporte',
        'Aluguel',
        'Internet',
        'Telefone',
        'Saúde',
        'Farmácia',
        'Educação',
        'Assinaturas',
        'Lazer',
        'Restaurante',
        'Roupas',
        'Manutenção',
        'Impostos',
        'Doações',
        'Pet',
        'Viagem',
        'Cursos',
        'Compras Online',
        'Serviços Domésticos',
        'Cuidados Pessoais',
        'Emergências',
        'Reserva de Emergência',
        'Poupança',
        'Cartão de Crédito',
        'Salário',
        'Freelance',
        'Rendimentos',
        'Investimentos',
        'Presentes',
        'Reembolsos',
        'Outros',

    ];

    function handleSelectType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleSelectCategory(category: string) {
        setSelectedCategory(category);
        setIsCategoryModalOpen(false);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Header>
                            <Title>Cadastro</Title>
                        </Header>

                        <Form>
                            <Input placeholder="Nome" />
                            <Input placeholder="Preço" />

                            <Buttons>
                                <TransactionTypeButton
                                    title="Income"
                                    type="up"
                                    isActive={transactionType === 'up'}
                                    onPress={() => handleSelectType('up')}
                                />
                                <TransactionTypeButton
                                    title="Outcome"
                                    type="down"
                                    isActive={transactionType === 'down'}
                                    onPress={() => handleSelectType('down')}
                                />
                            </Buttons>

                            <CategorySelectButton
                                title={selectedCategory || 'Categoria'}
                                onPress={() => setIsCategoryModalOpen(true)}
                            />
                        </Form>

                        <ButtonWrapper>
                            <Button title="Enviar" />
                        </ButtonWrapper>

                        {/* Modal de categorias */}
                        <CategorySelectModal
                            visible={isCategoryModalOpen}
                            categories={categories}
                            onClose={() => setIsCategoryModalOpen(false)}
                            onSelectCategory={(category) => setSelectedCategory(category)}
                        />

                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
import { Buttons, ButtonWrapper, Container, Form, Header, Title } from "./styles";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelectModal } from '../../components/Forms/CategorySelectModal';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppTabRoutesParamList } from '../../@types/navigation';
import { postTransaction } from '../../api/api';

import Toast from 'react-native-toast-message';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const categories = [
        "Água", "Aluguel", "Alimentação", "Assinaturas", "Cartão de Crédito",
        "Compras Online", "Cuidados Pessoais", "Cursos", "Doações", "Educação",
        "Emergências", "Energia", "Farmácia", "Freelance", "Impostos",
        "Investimentos", "Internet", "Lazer", "Manutenção", "Pet",
        "Presentes", "Poupança", "Reserva de Emergência", "Reembolsos", "Rendimentos",
        "Restaurante", "Roupas", "Salário", "Saúde", "Serviços Domésticos",
        "Supermercado", "Telefone", "Transporte", "Viagem", "Outros"
    ];

    type NavigationProps = BottomTabNavigationProp<AppTabRoutesParamList>;
    const navigation = useNavigation<NavigationProps>();


    /* --- UTILITÁRIOS --- */
    function handleSelectType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleSelectCategory(category: string) {
        setSelectedCategory(category);
        setIsCategoryModalOpen(false);
    }

    function handlePriceChange(value: string) {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length === 0) {
            setPrice('');
            return;
        }

        let floatValue = parseFloat(numericValue) / 100;
        if (floatValue > 99999999.99) {
            Toast.show({
                type: 'error',
                text1: 'Ops! Esse valor é muito alto.'
            });
            return;
        }

        const formatted = floatValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        setPrice(formatted);
    }

    function parsePriceToNumber(formatted: string): number {
        return Number(formatted.replace(/\s/g, '').replace('R$', '').replace(/\./g, '').replace(',', '.'));
    }

    async function handleSubmit() {
        if (!title || !price || !transactionType || !selectedCategory) {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos obrigatórios.',
            });
            return;
        }

        const numericPrice = parsePriceToNumber(price);
        if (numericPrice <= 0) {
            Toast.show({
                type: 'error',
                text1: 'O valor precisa ser maior que zero.'
            });
            return;
        }

        const transaction = {
            titulo: title,
            valor: numericPrice,
            tipo: transactionType === 'up' ? 'entrada' : 'saida',
            categoria: selectedCategory
        };

        try {
            await postTransaction(transaction);
            Toast.show({
                type: 'success',
                text1: 'Transação salva com sucesso!'
            });
            setTitle('');
            setPrice('');
            setTransactionType('');
            setSelectedCategory('');
            navigation.navigate('Listagem');

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar transação!'
            });
            console.error(error);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <Container>
                        <Header>
                            <Title>Cadastro</Title>
                        </Header>

                        <Form>
                            <Input
                                placeholder="Nome"
                                value={title}
                                onChangeText={setTitle}
                            />
                            <Input
                                placeholder="Preço"
                                value={price}
                                onChangeText={handlePriceChange}
                                keyboardType="numeric"
                            />

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
                            <Button title="Enviar" onPress={handleSubmit} />
                        </ButtonWrapper>

                        <CategorySelectModal
                            visible={isCategoryModalOpen}
                            categories={categories}
                            onClose={() => setIsCategoryModalOpen(false)}
                            onSelectCategory={handleSelectCategory}
                        />
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
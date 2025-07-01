import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Alert
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

import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppTabRoutesParamList } from '../../@types/navigation';
import { postTransaction } from '../../api/api';


export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    type NavigationProps = BottomTabNavigationProp<AppTabRoutesParamList>;
    const navigation = useNavigation<NavigationProps>();

    const categories = ['Supermercado', 'Energia', 'Água', 'Transporte', 'Aluguel', 'Internet', 'Telefone', 'Saúde', 'Farmácia', 'Educação', 'Assinaturas', 'Lazer', 'Restaurante', 'Roupas', 'Manutenção', 'Impostos', 'Doações', 'Pet', 'Viagem', 'Cursos', 'Compras Online', 'Serviços Domésticos', 'Cuidados Pessoais', 'Emergências', 'Reserva de Emergência', 'Poupança', 'Cartão de Crédito', 'Salário', 'Freelance', 'Rendimentos', 'Investimentos', 'Presentes', 'Reembolsos', 'Outros'];

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

        // Se passar do limite de 99.999.999,99, avisa o usuário
        if (floatValue > 99999999.99) {
            Alert.alert(
                'Valor muito alto',
                'O valor máximo permitido é R$ 99.999.999,99'
            );
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
            Alert.alert('Preencha todos os campos');
            return;
        }

        const numericPrice = parsePriceToNumber(price);
        if (numericPrice <= 0) {
            Alert.alert('O valor deve ser maior que zero');
            return;
        }

        const dataBrasilia = new Date();
        dataBrasilia.setHours(dataBrasilia.getHours() - 3); // Brasília = UTC−3

        const transaction = {
            titulo: title,
            valor: numericPrice,
            tipo: transactionType === 'up' ? 'entrada' : 'saida',
            categoria: selectedCategory,
            data: dataBrasilia.toISOString(), // salva como ISO em UTC−3 ajustado
        };

        try {
            await postTransaction(transaction);


            Alert.alert(
                'Transação salva com sucesso!',
                '',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            //Limpa os campos somente após o clique no "OK"
                            setTitle('');
                            setPrice('');
                            setTransactionType('');
                            setSelectedCategory('');
                            navigation.navigate('Listagem');
                        },
                    },
                ]
            );


        } catch (error) {
            Alert.alert('Erro ao salvar transação');
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

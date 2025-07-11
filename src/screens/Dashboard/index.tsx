import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Text,
    TransactionList
} from "./styles";
import { HighlightCard } from '../../components/HighlightCard';
import { Transaction } from '../../components/Transaction';
import { getTransactions, getMonthlySummary } from '../../api/api';

interface MonthlySummary {
    entry: number;
    exit: number;
    total: number;
    lastEntry: string;
    lastExit: string;
}

export function Dashboard() {
    const [data, setData] = useState<any[]>([]);
    const [highlightData, setHighlightData] = useState<MonthlySummary>({
        entry: 0,
        exit: 0,
        total: 0,
        lastEntry: '',
        lastExit: ''
    });

    /* --- ÍCONES COM BASE NO NOME DA CATEGORIA --- */
    const getIconByCategoria = (categoria: string) => {
        const icons: { [key: string]: string } = {
            'Água': 'droplet',
            'Aluguel': 'home',
            'Alimentação': 'coffee',
            'Assinaturas': 'edit-2',
            'Cartão de Crédito': 'credit-card',
            'Compras Online': 'shopping-bag',
            'Cuidados Pessoais': 'user',
            'Cursos': 'book-open',
            'Doações': 'gift',
            'Educação': 'book',
            'Emergências': 'alert-triangle',
            'Energia': 'zap',
            'Farmácia': 'plus-circle',
            'Freelance': 'briefcase',
            'Impostos': 'file-text',
            'Investimentos': 'bar-chart',
            'Internet': 'wifi',
            'Lazer': 'monitor',
            'Manutenção': 'tool',
            'Outros': 'more-horizontal',
            'Pet': 'heart',
            'Presentes': 'gift',
            'Poupança': 'save',
            'Reserva de Emergência': 'shield',
            'Reembolsos': 'rotate-ccw',
            'Rendimentos': 'trending-up',
            'Restaurante': 'coffee',
            'Roupas': 'shopping-bag',
            'Salário': 'dollar-sign',
            'Saúde': 'heart',
            'Serviços Domésticos': 'home',
            'Supermercado': 'shopping-cart',
            'Telefone': 'phone',
            'Transporte': 'truck',
            'Viagem': 'map-pin',
        };
        return icons[categoria] || 'dollar-sign';
    };

    /* --- UTILITÁRIOS --- */
    function getMonthName(date: Date): string {
        return date
            .toLocaleString('pt-BR', { month: 'long' })
            .replace(/^./, c => c.toUpperCase());
    }

    function formatCustomDate(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = getMonthName(date);
        return `${day} de ${month}`;
    }

    function getCurrentMonthInterval(): string {
        const now = new Date();
        const month = getMonthName(now);
        const year = now.getFullYear();
        const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
        return `De 1 a ${lastDay} de ${month}`;
    }

    const fetchData = useCallback(async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;

            const response = await getTransactions(year, month);
            const formatted = response.map(item => ({
                type: item.tipo === 'entrada' ? 'up' : 'down',
                icon: getIconByCategoria(item.categoria),
                title: item.titulo,
                amount: parseFloat(item.valor).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                dataTransaction: new Date(item.data).toLocaleDateString('pt-BR'),
                typeExpense: item.categoria,
            }));
            setData(formatted);
        } catch (err: any) {
            console.error('Erro ao carregar transações:', err.message);
        }
    }, []);

    const fetchMonthlySummary = useCallback(async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;

            const resumo = await getMonthlySummary(year, month);
            setHighlightData({
                entry: resumo.entrada,
                exit: resumo.saida,
                total: resumo.total,
                lastEntry: resumo.ultima_entrada_data
                    ? formatCustomDate(resumo.ultima_entrada_data)
                    : '',
                lastExit: resumo.ultima_saida_data
                    ? formatCustomDate(resumo.ultima_saida_data)
                    : '',
            });
        } catch (error: any) {
            console.error('Erro ao buscar resumo mensal:', error);
        }
    }, []);

    /* --- ATUALIZAÇÃO DA TELA --- */
    useEffect(() => {
        fetchData();
        fetchMonthlySummary();
    }, [fetchData, fetchMonthlySummary]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            fetchMonthlySummary();
        }, [fetchData, fetchMonthlySummary])
    );

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://github.com/edmar-zx/goFinancesWeb/blob/master/assets/images/fotodeperfil.PNG?raw=true' }} />
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Aluno</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type='up'
                    title='Entradas'
                    amount={highlightData.entry.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                    lastTransaction={
                        highlightData.lastEntry
                            ? `Última entrada dia ${highlightData.lastEntry}`
                            : 'Nenhuma entrada'
                    }
                />
                <HighlightCard
                    type='down'
                    title='Saídas'
                    amount={`- ${highlightData.exit.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}`}
                    lastTransaction={
                        highlightData.lastExit
                            ? `Última saída dia ${highlightData.lastExit}`
                            : 'Nenhuma saída'
                    }
                />
                <HighlightCard
                    type='total'
                    title='Total'
                    amount={highlightData.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                    lastTransaction={getCurrentMonthInterval()}
                />
            </HighlightCards>

            <Transactions>
                <Text>Listagem</Text>
                <TransactionList
                    data={data}
                    renderItem={({ item }) => <Transaction data={item} />}
                />
            </Transactions>
        </Container>
    );
}
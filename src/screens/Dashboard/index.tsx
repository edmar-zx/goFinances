import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
    const [data, setData] = useState([]);
    const [highlightData, setHighlightData] = useState<MonthlySummary>({
        entry: 0,
        exit: 0,
        total: 0,
        lastEntry: '',
        lastExit: ''
    });

    const getIconByCategoria = (categoria: string) => {
        const icons: { [key: string]: string } = {
            'Supermercado': 'shopping-cart',
            'Energia': 'zap',
            'Água': 'droplet',
            'Transporte': 'truck',
            'Aluguel': 'home',
            'Internet': 'wifi',
            'Telefone': 'phone',
            'Saúde': 'heart',
            'Farmácia': 'plus-square',
            'Educação': 'book',
            'Assinaturas': 'edit-2',
            'Lazer': 'monitor',
            'Restaurante': 'coffee',
            'Roupas': 'shopping-bag',
            'Manutenção': 'tool',
            'Impostos': 'file-text',
            'Doações': 'gift',
            'Pet': 'github',
            'Viagem': 'navigation',
            'Cursos': 'book-open',
            'Compras Online': 'shopping-cart',
            'Serviços Domésticos': 'briefcase',
            'Cuidados Pessoais': 'user',
            'Emergências': 'alert-triangle',
            'Reserva de Emergência': 'shield',
            'Poupança': 'archive',
            'Cartão de Crédito': 'credit-card',
            'Salário': 'dollar-sign',
            'Freelance': 'dollar-sign',
            'Rendimentos': 'trending-up',
            'Investimentos': 'bar-chart',
            'Presentes': 'gift',
            'Reembolsos': 'corner-down-left',
            'Outros': 'more-horizontal',
        };

        return icons[categoria] || 'dollar-sign';
    };


    function getMonthName(date: Date): string { // Funcao para pegar o nome do mes e deixar em maisculo a primeira letra
        return date.toLocaleString('pt-BR', { month: 'long' }).replace(/^./, c => c.toUpperCase());
    }

    function formatCustomDate(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = getMonthName(date);

        return `${day} de ${month}`;
    }


    function getCurrentMonthInterval(): string { // Funcao para pegar o intervalo entre meses no card Total
        const now = new Date();
        const month = getMonthName(now);
        const year = now.getFullYear();
        const lastDay = new Date(year, now.getMonth() + 1, 0).getDate(); // ultimo dia do mes

        return `De 1 a ${lastDay} de ${month}`;
    }


    useEffect(() => {
        async function fetchMonthlySummary() {
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
            } catch (error) {
                console.error('Erro ao buscar resumo mensal:', error);
            }
        }
        fetchMonthlySummary();
    }, [data]);

    useEffect(() => {
        async function fetchData() {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // +1 para mes correto

                const response = await getTransactions(year, month); // passa ano e mes para api filtrar

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
            } catch (err) {
                console.error('Erro ao carregar transações:', err.message);
            }
        }

        fetchData();
    }, [data]);

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
                            : `Nenhuma saída`
                    }
                />
                <HighlightCard
                    type='total'
                    title='Total'
                    amount={highlightData.total.toLocaleString(`pt-BR`, {
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
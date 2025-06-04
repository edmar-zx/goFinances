import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    DataTransaction,
    TypeExpense,
    LeftGroup
} from "./styles"
import React from 'react';

interface Props {
    type: 'up' | 'down' | 'total'
    title: string
    amount: string
    typeExpense: string
    dataTransaction: string
    icon?: string
}

/* const icon = {
     up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
    sales: 'dollar-sign',
} */


export function Transaction({ type, title, amount, typeExpense, dataTransaction, icon: iconName }: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>
                    {title}
                </Title>
                <Amount type={type}>
                    {amount}
                </Amount>
            </Header>

            <Footer>
                <LeftGroup>
                    <Icon
                        name={iconName ?? (type === 'up' ? 'arrow-up-circle' : 'arrow-down-circle')}
                        type={type}
                    />
                    <TypeExpense type={type}>
                        {typeExpense}
                    </TypeExpense>
                </LeftGroup>

                <DataTransaction type={type}>
                    {dataTransaction}

                </DataTransaction>
            </Footer>
        </Container>
    )
}
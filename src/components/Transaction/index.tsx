import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    DataTransaction,
} from "./styles"
import React from 'react';

interface Props {
    type: 'up' | 'down' | 'total'
    title: string
    amount: string
    dataTransaction: string
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

export function Transaction({type, title, amount, dataTransaction}: Props){
    return(
        <Container type={ type }>
            <Header>
                <Title type={type}>
                    {title}
                </Title>
               <Amount type={type}>
                    { amount }
                </Amount>
            </Header>

            <Footer>
                <Icon 
                    name={ icon[type] }
                    type={ type }
                />
                
                <DataTransaction type={type}>
                    { dataTransaction }

                </DataTransaction>
            </Footer>
        </Container>
    )
}
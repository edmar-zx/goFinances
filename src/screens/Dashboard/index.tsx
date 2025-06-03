import { Feather } from '@expo/vector-icons';
import React from 'react';
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
    Text
} from "./styles";
import { HighlightCard } from '../../components/HighlightCard';
import { Transaction } from '../../components/Transaction';




export function Dashboard(){
    return(
        <Container>
           <Header>
            <UserWrapper>
                <UserInfo>
                    <Photo source ={ {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBANCPL-jtI4TIy52JaivBpQadyJQm1tyiBA&s'}}/>
                    <User>
                        <UserGreeting>Olá</UserGreeting>
                        <UserName>Aluno</UserName>
                    </User>
                </UserInfo>
                <Icon name="power"/>
                
            </UserWrapper>
           </Header>
           <HighlightCards>
                <HighlightCard
                    type='up'
                    title='Entradas'
                    amount='R$ 17.000,00'
                    lastTransaction='Última entrada em 16 de Junho'
                />
                <HighlightCard
                    type='down'
                    title='Saídas'
                    amount='R$ 12.000,00'
                    lastTransaction='Última saída em 16 de Junho'
                />
                <HighlightCard
                    type='total'
                    title='Total'
                    amount='R$ 7.000,00'
                    lastTransaction='De 1 a 16 de Junho'
                />
           </HighlightCards>

           <Transactions>
                <Text>Listagem</Text>
                <Transaction
                    type='total'
                    title='Desenvolvimento de site'
                    amount='R$ 12.000,00'
                    dataTransaction='13/04/2020'
                />
           </Transactions>

        </Container>
    );
}
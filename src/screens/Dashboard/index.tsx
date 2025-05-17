import { Feather } from '@expo/vector-icons';
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
} from "./styles";
import { HighlightCard } from '../../components/HighlightCard';

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
           <HighlightCards
               
           >
                <HighlightCard/>
                <HighlightCard/>
                <HighlightCard/>
           </HighlightCards>

        </Container>
    );
}
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
} from "./styles";

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
                <Feather name="power"/>
                
            </UserWrapper>
           </Header>
        </Container>
    );
}
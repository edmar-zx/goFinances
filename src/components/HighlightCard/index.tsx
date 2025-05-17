import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction,
} from "./styles"

export function HighlightCard(){
    return(
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name="arrow-up-circle"></Icon>
            </Header>
            <Footer>
                <Amount>R$17.000,00</Amount>
                <LastTransaction>Última entrada em 13 de Abril</LastTransaction>
            </Footer>
        </Container>
    )
}
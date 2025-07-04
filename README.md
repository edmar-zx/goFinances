# GoFinances Mobile - Controle Financeiro

## Descrição

Aplicativo mobile para controle financeiro pessoal, onde o usuário pode cadastrar entradas e saídas e visualizar um resumo mensal de suas finanças.

---

## Funcionalidades principais
- Tela inicial com **listagem de transações do mês**.
  
- **Highlight Cards** com resumo de:
  - Total de entradas.
  - Total de saídas.
  - Saldo total.
  - Data da última transação em cada Card.
    
- Cadastro de transações: entradas (receitas) e saídas (despesas) com título, valor, tipo e categoria.
- Seleção de categoria personalizada para cada transação.
- Validações de dados e feedback visual via Toasts (sucesso/erro).
- Resumo mensal por gráfico, mostrando as categorias de transações.
---

## Detalhes do gráfico mensal

- O gráfico exibe a soma das entradas e saídas agrupadas por categoria.
- Até 10 categorias são exibidas separadamente para melhor visualização.
- Se houver mais de 10 categorias, as categorias adicionais são agrupadas na categoria **"Outros"**.
- Essa estratégia mantém o gráfico limpo, evitando excesso de fatias e informações confusas.

---

## Tecnologias utilizadas

- React Native
- Styled Components
- react-native-toast-message
- Expo (para o ambiente mobile)
- Biblioteca de gráficos (`victory-native`)

---


## Instalação

1. Clone o repositório
```bash
git clone https://github.com/edmar-zx/goFinances.git
```

2. Instale as dependências com `npm install` ou `yarn`
```bash
npm install
```
3. Execute o projeto com `npx expo start`
```bash
npx expo start
```
## Como usar

- Cadastre uma nova transação (entrada ou saída).
- Escolha a categoria e digite o valor.
- Vá para a aba Resumo para visualizar o gráfico mensal de categorias.
- O app exibirá até 10 categorias individualmente e agrupará as demais como "Outros".

---
## Uso com a API
- Este app depende de uma API para funcionar corretamente. É necessário clonar e executar o backend disponível neste repositório:
```bash
git clone https://github.com/edmar-zx/goFinancesAPI.git
```

## Observações

- Para uma melhor experiência, o app utiliza fontes customizadas e temas para manter a identidade visual consistente.
- Toasts personalizados informam erros, avisos e confirmações de forma clara para o usuário.

---


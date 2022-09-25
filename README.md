App sendo hospedado na vercel: https://spacex-frontend-mateusdeitos.vercel.app

## Descrição

- Frontend criado com o framework [Next.js](https://nextjs.org/) e a biblioteca de componentes [Mantine](https://mantine.dev)
- Exibe os dados relacionados aos lançamentos da spacex através da api https://github.com/mateusdeitos/spacex-backend
- Utiliza SSG (Static site generation) na home page dos lançamentos [Next.JS SSG](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- Utiliza ISR (Incremental static regeneration) nas páginas de detalhes de um lançamento [Next.JS ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- Utiliza data fetching com [react-query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) e a funcionalidade de [Api Routes](https://nextjs.org/docs/api-routes/introduction) do Next.JS nas páginas de listagem de lançamentos passados/futuros

## Como rodar em desenvolvimento

- Clonar o projeto
- Criar arquivo `.env.local` e preencher os dados conforme o arquivo `.env.example`
- Clonar o projeto da [api](https://github.com/mateusdeitos/spacex-backend) e rodá-lo
- Rodar o servidor de desenvolviento:

```bash
npm run dev
# ou
yarn dev
```

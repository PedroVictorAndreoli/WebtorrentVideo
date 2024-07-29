# Usando este Projeto

## Pré-requisitos

Para rodar o projeto, é necessário ter o Node.js instalado. Você pode baixá-lo [aqui](https://nodejs.org/pt).

## Rodando o Front-end

1. Acesse a pasta raiz do projeto.
2. Execute o comando:
    ```sh
    npm install
    ```
3. Em seguida, execute:
    ```sh
    npm run dev
    ```
4. O front-end estará rodando na porta 5173 por padrão.

![Front-end rodando](https://github.com/user-attachments/assets/dbaf1e6a-b3c1-40d5-91ff-cde1e1dc7317)

## Rodando o Back-end

1. Ainda na pasta raiz do projeto, execute:
    ```sh
    node ./src/service/index.mjs
    ```
2. Sua aplicação estará rodando. Agora, é só inserir o magnet link do vídeo que deseja ver.

## Notas

- Inicialmente, o projeto só funciona com magnet links de arquivos `.mp4`. Caso queira trocar a extensão do arquivo, vá no arquivo `index.mjs` e altere para a extensão desejada.
  
  ![Alterar extensão](https://github.com/user-attachments/assets/907e6135-ac55-4c68-a9bd-299f0c09ded5)

- Caso queira trocar o torrent do vídeo player, é necessário fechar e abrir o servidor back-end novamente.

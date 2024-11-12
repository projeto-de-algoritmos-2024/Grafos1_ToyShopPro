# Projeto de Ordenação Topológica para Fábrica de Carrinhos de Brinquedo

## Informações do Aluno
| Matrícula  | Nome           |
|------------|----------------|
| 170140717 | Eduarda Rodrigues Tavares |
| 211030747 | Filipe Carvalho da Silva  |

---

## Sobre o Projeto
Este projeto visa simular uma fábrica de carrinhos de brinquedo, onde diferentes peças do carrinho precisam ser montadas em uma ordem específica. A aplicação permite que os usuários criem e verifiquem dependências entre essas peças, ajudando a garantir que a sequência de montagem respeite todas as dependências. A aplicação utiliza ordenação topológica para validar a sequência e fornece feedback visual se alguma etapa estiver fora de ordem.

### Funcionalidades
- Arrastar e soltar para organizar a sequência de montagem.
- Conexão manual de peças para definir dependências.
- Verificação da ordem correta de montagem usando ordenação topológica.
- Feedback visual com destaque em vermelho para peças fora de ordem.

---

## Como Executar o Projeto

### Pré-requisitos
Para executar o projeto, você precisa ter instalado:
- Node.js (versão 14 ou superior)
- NPM (geralmente incluído com o Node.js)
- React (a biblioteca é instalada automaticamente com o projeto)

### Passo a Passo para Execução

1. Clonar o Repositório:
   - Com o terminal aberto, clone o repositório do projeto com o comando:
      ```bash
     git clone https://github.com/seuusuario/nome-do-repositorio.git
      ```
   - Navegue até a pasta do projeto com:
     ```bash
     cd Grafos1_ToyShopPro
     ```
2. Instalar Dependências:
   - No diretório do projeto, execute o comando para instalar as dependências:
     ```bash
     npm install
     ```
3. Iniciar o Backend:
   - Certifique-se de que o backend está configurado para receber requisições na rota `/sort` na porta 5000.
   - No diretório do backend, execute o comando para iniciar o servidor:
     ```bash
     node index.js
     ```
4. Iniciar o Frontend:
   - No diretório do frontend, execute o comando para iniciar o servidor de desenvolvimento:
     ```bash
     npm start
     ```
   - O projeto será iniciado em `http://localhost:3000`.

### Como Usar a Aplicação

- **Adicionar Conexões**: Arraste e solte os nós na tela e conecte-os de acordo com a ordem de montagem desejada.
- **Verificar Ordem**: Após definir a ordem, clique em "Verificar Ordem". A aplicação mostrará se a sequência de montagem respeita todas as dependências.
- **Feedback Visual**: Caso alguma peça esteja fora de ordem, ela será destacada em vermelho, e a aplicação sugerirá uma sequência correta.

---

## Tecnologias Utilizadas
- **React**: para o frontend interativo e responsivo.
- **Express e Node.js**: para o backend e processamento da lógica de ordenação topológica.
- **React Flow**: para a criação visual das dependências entre as peças.

## Considerações
Este projeto é uma ótima maneira de visualizar o uso prático de ordenação topológica em uma aplicação de fabricação. Ele ajuda a assegurar que todas as etapas de montagem sigam uma sequência lógica e respeitem as dependências necessárias para garantir a montagem correta de um carrinho de brinquedo.

## Demonstração em Vídeo
Para mais detalhes, assista à [demonstração em vídeo do projeto](https://youtu.be/sR68V6cOgwM).

![image](https://github.com/user-attachments/assets/d5ccf087-12a2-4724-b109-1d4dba769e91)
![image](https://github.com/user-attachments/assets/043f8787-bd2c-44d1-bb5a-fc5c112580e6)
![image](https://github.com/user-attachments/assets/21e7ac85-f297-46ff-99ae-4276800bca80)



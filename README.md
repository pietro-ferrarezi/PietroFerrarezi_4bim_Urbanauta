# URBANAUTA
## Plataforma de divulgação e gerenciamento de iniciativas ambientais em comunidades locais.

## 1. Visão geral
### 1.1. Descrição
A plataforma é uma iniciativa da comunidade de uma cidade para divulgar eventos em prol da recuperação urbana. Conta com a ajuda de voluntários, escolas e pequenos coletivos locais. 

A plataforma possui três áreas principais:
- **Área pública**: Permite explorar projetos, atividades programadas e petições.
- **Área do cliente**: Permite manisfestar interesse e se inscrever nas iniciativas.
- **Painel administrativo**: Permite gerenciar as divulgações.

### 1.2. Problema resolvido
A comunidade divulgava as atividades e registrava interesse através de mensagens, postagens em redes sociais ou oralmente, dificultando a centralização das informações.

O software tem como objetivo reunir essas informações em um só lugar, tornando a gestão mais organizada e prática.


## 2. Público alvo e gestão de usuários
### 2.1. Público-alvo
- Moradores locais interessados em iniciativas ambientais
- Estudantes das escolas locais
- Coletivos e organizações comunitárias
- Equipe responsável pela gestão
- Público majoritariamente jovem

### 2.2. Perfis de usuários
| Perfil | Descrição | Responsabilidades |
| --- | --- | --- |
| Visitante | Usuário sem sessão autenticada | Explorar o catálogo e consultar informações |
| Voluntário | Usuário cadastrado na plataforma | Gerenciar seu perfil e inscrever-se em iniciativas |
| Colaborador | Voluntário que pode criar novas iniciativas | Pode enviar novas propostas de projetos, ativadades e propor petições |
| Administrador | Integrante autorizado da equipe de gestão | Gerenciar iniciativas |

## 3. Funcionalidades
### A. Catálogo
- **Objetivo**: permitir que os visitantes descubram iniciativas.
- **Usuários**: visitantes e clientes.
- **Funcionamento**: exibir descrição, galeria de imagens, localização, atividades e informações de participação.
- **Dados necessários**: título, descrição, imagem, categoria, localização e estado.

### B. Detalhes da iniciativa
- **Objetivo**: apresentar informações completas das iniciativas.
- **Usuários**: visitantes e clientes.
- **Funcionamento**: exibir cartões com imagens, título, categoria, localização e estado do projeto.

### C. Gerenciamento de projetos
- **Objetivo**: permitir que os administradores mantenham o catálogo atualizado.
- **Usuários**: administradores.
- **Funcionamento**: formulário de cadastro e edição com título, descrição, categoria, localização, imagem de capa e estado de publicação.

### D. Gerenciamento de atividades
- **Objetivo**: organizar as atividades associadas a cada projeto.
- **Usuários**: administradores.
- **Funcionamento**: cadastrar atividades com título, descrição, responsável, prazo e estado.
- **Regras**: uma atividade deverá estar associada a um projeto existente.

### E. Gerenciamento de petições
- **Objetivo**: organizar os abaixo-assinados.
- **Usuários**: administradores.
- **Funcionamento**: cadastrar petições com título, descrição, meta de assinaturas e estado.

### F. Gerenciamento de categorias
- **Objetivo**: agrupar projetos em categorias distintas.
- **Usuários**: administradores.
- **Funcionamento**: criar categorias com nomes diferentes.

### G. Participação em projetos
- **Objetivo**: permitir que moradores demonstrem interesse em colaborar.
- **Usuários**: clientes.
- **Funcionamento**: o usuário seleciona a opção de participar e registra uma manifestação de interesse ou assina a petição.
- **Regras**: Solicitações poderão ser aceitas, recusadas ou marcadas como concluídas (exceção de abaixo-assinados).

## 4. Banco de Dados
![DER](./Documentação/DER.png)
-- SQLBook: Code
BEGIN;

TRUNCATE TABLE public.Usuario,
public.Voluntario,
public.Colaborador,
public.Administrador,
public.Categoria,
public.Estado_Atividade,
public.Estado_Manifestacao,
public.Estado_Participacao,
public.Projeto,
public.Iniciativa,
public.Responsavel_Iniciativa,
public.Manifestacao_Interesse,
public.Participacao,
public.Peticao,
public.Assinatura RESTART IDENTITY CASCADE;

-- 1. USUÁRIOS (20)
-- Usuários de teste:
-- Voluntário comum: 11 (Lucas Ribeiro)
-- Colaborador: 3 (Luiza Ferreira)
-- Administrador: 5 (Camila Rocha)
-- Com manifestação pendente: 11 (Lucas Ribeiro)
-- Com manifestação aceita: 12 (Yasmin Pereira)
-- Com manifestação negada: 18 (Letícia Gomes)
-- Com manifestação cancelada: 19 (Diego Carvalho)
-- Com participação concluída: 1 (Marina Costa)
-- Com participação ativa: 9 (Felipe Andrade)
-- Com participação desistente: 4 (Rafael Nascimento)
-- Com mais de uma manifestação: 1 (Marina Costa)
-- Sem manifestação: 3 (Luiza Ferreira)
-- Com assinatura em petição: 20 (Sofia Rodrigues)

-- SENHA PADRÃO: Urbanauta@Teste2026
INSERT INTO
    public.Usuario (nome, email, senha)
VALUES (
        'Marina Costa',
        'marina.costa@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'João Pedro Almeida',
        'joao.almeida@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Luiza Ferreira',
        'luiza.ferreira@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Rafael Nascimento',
        'rafael.nascimento@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Camila Rocha',
        'camila.rocha@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Bruno Lima',
        'bruno.lima@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Aline Martins',
        'aline.martins@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Beatriz Oliveira',
        'beatriz.oliveira@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Felipe Andrade',
        'felipe.andrade@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Gabriela Souza',
        'gabriela.souza@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Lucas Ribeiro',
        'lucas.ribeiro@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Yasmin Pereira',
        'yasmin.pereira@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Thiago Santos',
        'thiago.santos@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Isabela Moreira',
        'isabela.moreira@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Pedro Henrique Silva',
        'pedro.silva@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Ana Clara Mendes',
        'ana.mendes@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Matheus Barbosa',
        'matheus.barbosa@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Letícia Gomes',
        'leticia.gomes@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Diego Carvalho',
        'diego.carvalho@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    ),
    (
        'Sofia Rodrigues',
        'sofia.rodrigues@example.com',
        '$2b$12$g3DXKr/JV/sFe6zi9ighdu3WVocB6nSigRfYYvAD5dvvVKgl/aZ9W'
    );

-- 2. TODOS SÃO VOLUNTÁRIOS (20)
-- ID_VOLUNTARIO = ID_USUARIO neste banco recém-populado.

INSERT INTO
    public.Voluntario (ID_USUARIO)
VALUES (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10),
    (11),
    (12),
    (13),
    (14),
    (15),
    (16),
    (17),
    (18),
    (19),
    (20);

-- 3. COLABORADORES (7)
-- IDs do Colaborador: 1=Marina, 2=João, 3=Luiza, 4=Rafael,
-- 5=Bruno, 6=Aline, 7=Beatriz.

INSERT INTO
    public.Colaborador (ID_VOLUNTARIO)
VALUES (1),
    (2),
    (3),
    (4),
    (6),
    (7),
    (8);

-- 4. ADMINISTRADORES (3): Camila, Felipe e Gabriela

INSERT INTO
    public.Administrador (ID_VOLUNTARIO)
VALUES (5),
    (9),
    (10);

-- 5. CATEGORIAS E ESTADOS

INSERT INTO
    public.Categoria (nome)
VALUES ('Meio ambiente'),
    ('Espaços públicos'),
    ('Mobilidade urbana'),
    ('Resíduos e reciclagem'),
    ('Agricultura urbana');

INSERT INTO
    public.Estado_Atividade (nome)
VALUES ('Planejada'),
    ('Em andamento'),
    ('Concluída');

INSERT INTO
    public.Estado_Manifestacao (nome)
VALUES ('Pendente'),
    ('Aceita'),
    ('Negada'),
    ('Cancelada');

INSERT INTO
    public.Estado_Participacao (nome)
VALUES ('Ativa'),
    ('Concluída'),
    ('Desistiu');

-- 6. PROJETOS (10): criados por todos os 7 colaboradores.
-- Projetos 8, 9 e 10 continuam SEM iniciativas, para testes de LEFT JOIN.

INSERT INTO
    public.Projeto (
        titulo,
        lead,
        descricao,
        ID_CATEGORIA,
        ID_ESTADO,
        ID_COLABORADOR_CRIADOR
    )
VALUES (
        'Corredores Verdes de Campo Mourão',
        'Mais verde, mais sombra e uma cidade melhor para caminhar.',
        'Quem anda por Campo Mourão sabe como faz falta uma sombra boa no caminho, principalmente nos dias mais quentes. Queremos aproximar as áreas verdes da cidade e trazer mais árvores para os trajetos do dia a dia. Se você curte colocar a mão na terra e ver uma mudança acontecendo de verdade, tem espaço para ajudar.',
        1,
        2,
        1
    ),
    (
        'Praças Vivas',
        'Vamos transformar nossas praças em lugares cheios de vida?',
        'A praça do bairro pode ser muito mais do que um lugar por onde a gente passa. Nossa ideia é reunir moradores para cuidar desses espaços, ouvir o que está faltando e fazer pequenas melhorias juntos. Não precisa ter experiência: vontade de participar e boas ideias já fazem diferença.',
        2,
        2,
        2
    ),
    (
        'Mobilidade de Bairro',
        'Uma cidade mais segura para quem caminha e pedala.',
        'Nem todo mundo se desloca de carro, e quem vai a pé ou de bicicleta conhece bem os desafios do caminho. Queremos escutar quem circula pelos bairros de Campo Mourão e pensar em trajetos mais seguros e agradáveis. Se você usa a cidade todos os dias, sua experiência já é uma contribuição importante.',
        3,
        1,
        3
    ),
    (
        'Ruas sem Resíduos',
        'Ruas mais limpas começam com gente disposta a fazer diferente.',
        'A gente acredita que cuidar da cidade começa também pelas pequenas atitudes. Esse projeto reúne ações de limpeza e conversas sobre o destino do lixo que produzimos. A proposta é fazer junto, sem apontar dedos, e mostrar que uma rua mais limpa depende de informação e participação de todo mundo.',
        4,
        3,
        4
    ),
    (
        'Hortas de Vizinhança',
        'Cultivando alimentos, amizades e novos espaços de encontro.',
        'Já pensou em transformar um espaço pouco aproveitado em um lugar cheio de temperos, verduras e encontros? Queremos construir hortas com a comunidade, trocar conhecimentos e aprender na prática sobre cultivo. Pode chegar mesmo sem saber plantar: aqui a ideia é aprender e cuidar junto.',
        5,
        2,
        5
    ),
    (
        'Água para o Futuro',
        'Pequenas atitudes para cuidar da água e do nosso futuro.',
        'Água parece um assunto distante até a gente perceber quanto usa sem notar. Queremos compartilhar soluções simples para economizar e aproveitar melhor esse recurso em casa e nos espaços coletivos. O projeto é um convite para testar ideias, fazer perguntas e descobrir o que dá para mudar na rotina.',
        1,
        2,
        6
    ),
    (
        'Cidade Acessível',
        'Uma cidade para todos começa com caminhos acessíveis.',
        'Uma cidade boa de viver precisa funcionar para todo mundo. Queremos olhar com atenção para calçadas, travessias e acessos de Campo Mourão, especialmente os obstáculos que muitas vezes passam despercebidos. A proposta é ouvir diferentes experiências e reunir informações que ajudem a cobrar melhorias reais.',
        3,
        1,
        7
    ),
    (
        'Sombra nas Escolas',
        'Mais árvores nas escolas, mais conforto para aprender.',
        'Pátios e caminhos com mais sombra tornam o dia a dia na escola mais agradável. Estamos começando a pensar em formas de ampliar a arborização desses espaços, respeitando as necessidades de cada lugar. Quem gosta de natureza, educação ou tem ideias para contribuir pode acompanhar a construção do projeto.',
        1,
        1,
        1
    ),
    (
        'Arte na Praça',
        'Cor, criatividade e novas histórias para nossas praças.',
        'Tem praça que só precisa de gente ocupando o espaço com criatividade para ganhar outra cara. Queremos aproximar artistas, estudantes e moradores para imaginar intervenções feitas em conjunto, com cuidado e respeito ao lugar. Vale chegar com uma ideia, uma habilidade ou só vontade de construir algo coletivo.',
        2,
        1,
        3
    ),
    (
        'Compostagem Comunitária',
        'Transformando resíduos orgânicos em vida para o solo.',
        'Restos de frutas e verduras não precisam terminar sempre no lixo comum. Nossa ideia é aproximar a compostagem da rotina dos bairros e mostrar como os resíduos orgânicos podem voltar para a terra. Ainda estamos organizando os primeiros passos, e quem tiver curiosidade ou experiência com o tema é bem-vindo.',
        4,
        1,
        6
    );

-- 7. INICIATIVAS (8): textos e datas mantidos do script original.
-- Observação: alguns estados originais ainda não correspondem às datas de hoje;
-- mantidos para preservar os seus dados de teste.
-- Iniciativa 6 continua sem manifestações de interesse.

INSERT INTO
    public.Iniciativa (
        titulo,
        descricao,
        localizacao,
        data_inicio,
        data_fim,
        vagas,
        ID_PROJETO,
        ID_ESTADO
    )
VALUES (
        'Plantio de mudas no Parque do Lago',
        'Vamos nos encontrar no Parque do Lago para plantar mudas nativas e conversar sobre os cuidados que elas vão precisar depois. É uma daquelas ações em que dá para participar, aprender e enxergar o resultado no próprio espaço. Se você nunca plantou uma árvore, tudo bem: a proposta é fazer junto.',
        'Parque do Lago, Campo Mourão - PR',
        '2026-09-19 08:00:00',
        '2026-09-19 12:00:00',
        20,
        1,
        3
    ),
    (
        'Arborização do Jardim Tropical',
        'O Jardim Tropical vai receber um mutirão para ajudar a deixar as ruas mais verdes e agradáveis. A gente quer reunir moradores e jovens da cidade para plantar mudas e trocar ideias sobre como cuidar delas. Não precisa entender de jardinagem para participar: disposição e vontade de colaborar já contam muito.',
        'Jardim Tropical, Campo Mourão - PR',
        '2026-12-12 08:30:00',
        '2026-12-12 11:30:00',
        15,
        1,
        1
    ),
    (
        'Pintura de bancos da Praça Central',
        'Sabe aqueles cantinhos da praça que poderiam ser mais convidativos? A proposta deste encontro é dar uma renovada nos bancos e em pequenas estruturas de convivência do centro. Queremos juntar gente que goste de atividades práticas e de ver a cidade sendo cuidada por quem vive nela.',
        'Centro, Campo Mourão - PR',
        '2026-10-05 09:00:00',
        '2026-10-05 15:00:00',
        12,
        2,
        3
    ),
    (
        'Mapeamento de rotas cicláveis',
        'Você pedala por Campo Mourão e já pensou que alguns caminhos poderiam ser mais tranquilos? Vamos percorrer trajetos pelo centro e bairros próximos, anotar dificuldades e compartilhar percepções de quem usa a bicicleta no dia a dia. Não é competição nem passeio de velocidade: queremos observar a cidade juntos.',
        'Centro e bairros próximos, Campo Mourão - PR',
        '2026-11-14 08:00:00',
        '2026-11-14 11:00:00',
        18,
        3,
        1
    ),
    (
        'Coleta seletiva no Jardim Alvorada',
        'A ideia deste mutirão no Jardim Alvorada é conversar sobre separação de resíduos e colocar o cuidado com o bairro em prática. Vamos reunir voluntários para uma ação coletiva, trocar informações e incentivar atitudes que continuam depois do encontro. Se você quer começar a agir pelo meio ambiente, esse é um bom ponto de partida.',
        'Jardim Alvorada, Campo Mourão - PR',
        '2026-10-23 09:00:00',
        '2026-10-23 12:00:00',
        20,
        4,
        3
    ),
    (
        'Implantação de horta comunitária',
        'Nossa horta vai começar pelo básico: preparar a terra, organizar os canteiros e plantar as primeiras hortaliças. Queremos que esse seja um espaço construído com as mãos e as ideias da comunidade. Pode vir sem experiência nenhuma; a graça é aprender com quem já sabe e descobrir coisas novas no processo.',
        'Área comunitária do bairro, Campo Mourão - PR',
        '2026-11-20 08:00:00',
        '2026-11-20 12:00:00',
        15,
        5,
        1
    ),
    (
        'Oficina de captação de água da chuva',
        'Que tal entender, na prática, como a água da chuva pode ser melhor aproveitada? Nesta oficina, vamos conhecer soluções simples e acompanhar demonstrações de montagem. É um convite para quem gosta de testar ideias sustentáveis e quer levar novas possibilidades para casa, para a escola ou para a comunidade.',
        'Espaço comunitário, Campo Mourão - PR',
        '2026-11-02 14:00:00',
        '2026-11-09 17:00:00',
        10,
        6,
        2
    ),
    (
        'Caminhada de diagnóstico de acessibilidade',
        'Vamos caminhar pelo centro de Campo Mourão prestando atenção em detalhes que muitas vezes passam batido: rampas, obstáculos, travessias e condições das calçadas. Queremos reunir diferentes olhares e registrar o que dificulta a circulação das pessoas. A experiência de cada participante importa, principalmente de quem enfrenta essas barreiras no dia a dia.',
        'Centro, Campo Mourão - PR',
        '2026-12-05 09:00:00',
        '2026-12-05 11:30:00',
        12,
        7,
        1
    );

-- 8. RESPONSÁVEIS (18): 7 colaboradores distribuídos entre 8 iniciativas.

INSERT INTO
    public.Responsavel_Iniciativa (ID_INICIATIVA, ID_COLABORADOR)
VALUES (1, 1),
    (1, 5),
    (2, 1),
    (2, 4),
    (2, 7),
    (3, 2),
    (3, 6),
    (4, 3),
    (4, 7),
    (5, 4),
    (5, 5),
    (6, 5),
    (6, 2),
    (7, 6),
    (7, 1),
    (8, 7),
    (8, 3),
    (8, 4);

-- 9. MANIFESTAÇÕES (27): todos os 20 voluntários aparecem ao menos uma vez.
-- Ordem preservada nos primeiros 12 registros, com 15 novos casos.
-- Estados: 1=Pendente, 2=Aceita, 3=Negada, 4=Cancelada.

INSERT INTO
    public.Manifestacao_Interesse (
        data,
        ID_VOLUNTARIO,
        ID_INICIATIVA,
        ID_ESTADO
    )
VALUES (
        '2026-09-10 10:00:00',
        1,
        1,
        2
    ),
    (
        '2026-09-11 09:30:00',
        2,
        1,
        2
    ),
    (
        '2026-10-29 14:00:00',
        6,
        2,
        1
    ),
    (
        '2026-10-01 11:00:00',
        4,
        3,
        2
    ),
    (
        '2026-11-01 15:00:00',
        5,
        4,
        2
    ),
    (
        '2026-10-10 08:45:00',
        1,
        5,
        2
    ),
    (
        '2026-10-31 13:20:00',
        2,
        2,
        1
    ),
    (
        '2026-10-27 16:00:00',
        8,
        7,
        2
    ),
    (
        '2026-11-02 10:00:00',
        4,
        8,
        2
    ),
    (
        '2026-10-25 09:15:00',
        5,
        2,
        3
    ),
    (
        '2026-10-30 17:00:00',
        1,
        4,
        3
    ),
    (
        '2026-11-01 18:30:00',
        2,
        8,
        4
    ),
    (
        '2026-09-12 10:20:00',
        6,
        1,
        2
    ),
    (
        '2026-10-02 16:10:00',
        7,
        3,
        2
    ),
    (
        '2026-10-15 12:40:00',
        8,
        5,
        2
    ),
    (
        '2026-11-03 13:00:00',
        9,
        4,
        2
    ),
    (
        '2026-11-15 09:00:00',
        10,
        8,
        1
    ),
    (
        '2026-11-05 10:15:00',
        11,
        2,
        1
    ),
    (
        '2026-11-06 11:20:00',
        12,
        2,
        2
    ),
    (
        '2026-11-16 15:40:00',
        13,
        8,
        1
    ),
    (
        '2026-09-14 08:35:00',
        14,
        1,
        2
    ),
    (
        '2026-10-16 12:10:00',
        15,
        5,
        2
    ),
    (
        '2026-10-29 14:30:00',
        16,
        7,
        2
    ),
    (
        '2026-11-04 16:00:00',
        17,
        4,
        2
    ),
    (
        '2026-11-08 10:00:00',
        18,
        8,
        3
    ),
    (
        '2026-11-12 11:30:00',
        19,
        2,
        4
    ),
    (
        '2026-10-03 09:00:00',
        20,
        3,
        2
    );

-- 10. PARTICIPAÇÕES (17): SOMENTE manifestações aceitas.
-- Estados: 1=Ativa, 2=Concluída, 3=Desistiu.

INSERT INTO
    public.Participacao (
        data_confirmacao,
        ID_MANIFESTACAO,
        ID_ESTADO
    )
VALUES ('2026-09-11 12:00:00', 1, 2),
    ('2026-09-12 09:00:00', 2, 2),
    ('2026-10-02 08:00:00', 4, 2),
    ('2026-11-02 09:00:00', 5, 1),
    ('2026-10-11 10:00:00', 6, 2),
    ('2026-10-28 15:00:00', 8, 1),
    ('2026-11-03 08:00:00', 9, 3),
    ('2026-09-13 09:00:00', 13, 2),
    ('2026-10-03 10:00:00', 14, 2),
    ('2026-10-16 09:00:00', 15, 2),
    ('2026-11-04 10:00:00', 16, 1),
    ('2026-11-07 09:00:00', 19, 1),
    ('2026-09-15 09:00:00', 21, 2),
    ('2026-10-17 14:00:00', 22, 2),
    ('2026-10-30 10:00:00', 23, 1),
    ('2026-11-05 10:00:00', 24, 1),
    ('2026-10-04 10:00:00', 27, 2);

-- 11. PETIÇÕES (4): agora criadas por 4 colaboradores diferentes.

INSERT INTO
    public.Peticao (
        titulo,
        descricao,
        meta_assinatura,
        data_criacao,
        ID_COLABORADOR_CRIADOR
    )
VALUES (
        'Mais árvores nas ruas',
        'Quem anda a pé por Campo Mourão sente a diferença que uma rua arborizada faz. Queremos reunir assinaturas para pedir mais atenção ao plantio e ao cuidado com as árvores nos caminhos que usamos todos os dias. Se você também acha que a cidade merece mais sombra e conforto, fortaleça esse pedido com sua assinatura.',
        4,
        '2026-08-01 10:00:00',
        1
    ),
    (
        'Ciclovias conectando bairros',
        'Muita gente usa a bicicleta para estudar, trabalhar ou simplesmente circular pela cidade. Nosso pedido é por conexões cicláveis mais seguras entre os bairros de Campo Mourão, para que pedalar seja uma opção melhor para mais pessoas. Assine se você acredita que a mobilidade da cidade precisa considerar quem está sobre duas rodas.',
        20,
        '2026-09-05 14:00:00',
        3
    ),
    (
        'Lixeiras seletivas nas praças',
        'Separar o lixo é mais fácil quando a cidade oferece condições para isso. Queremos pedir lixeiras identificadas para diferentes resíduos nas praças de Campo Mourão, acompanhadas de informação clara para quem usa esses espaços. Se você também quer ver as praças mais bem cuidadas, ajude a mostrar que essa mudança importa.',
        10,
        '2026-09-20 09:00:00',
        4
    ),
    (
        'Calçadas acessíveis no centro',
        'Circular pelo centro deveria ser tranquilo para todo mundo, inclusive pessoas com deficiência, idosos e quem empurra carrinho de bebê. Esta petição pede atenção às rampas, desníveis e obstáculos das calçadas de Campo Mourão. Sua assinatura ajuda a dar visibilidade a um problema que merece ser levado a sério.',
        12,
        '2026-10-28 16:00:00',
        7
    );

-- 12. ASSINATURAS (26): todos os 20 voluntários assinam ao menos uma.
-- Petição 1 supera a meta; petição 2 não atinge; petição 4 tem zero assinaturas.

INSERT INTO
    public.Assinatura (
        ID_VOLUNTARIO,
        ID_PETICAO,
        data
    )
VALUES (1, 1, '2026-08-02 10:00:00'),
    (2, 1, '2026-08-03 11:00:00'),
    (3, 1, '2026-08-05 14:00:00'),
    (4, 1, '2026-08-07 16:00:00'),
    (1, 2, '2026-09-06 09:00:00'),
    (3, 2, '2026-09-08 14:30:00'),
    (5, 2, '2026-09-09 15:45:00'),
    (2, 3, '2026-09-21 10:20:00'),
    (4, 3, '2026-09-22 11:10:00'),
    (5, 3, '2026-09-25 17:00:00'),
    (6, 1, '2026-08-09 09:40:00'),
    (8, 1, '2026-08-10 15:20:00'),
    (11, 1, '2026-08-12 11:10:00'),
    (7, 2, '2026-09-11 16:00:00'),
    (9, 2, '2026-09-13 10:30:00'),
    (12, 2, '2026-09-16 14:00:00'),
    (13, 2, '2026-09-18 15:00:00'),
    (14, 2, '2026-09-19 17:15:00'),
    (15, 2, '2026-09-22 08:50:00'),
    (17, 2, '2026-09-25 13:20:00'),
    (19, 2, '2026-09-28 09:30:00'),
    (6, 3, '2026-09-26 08:30:00'),
    (10, 3, '2026-09-27 14:30:00'),
    (16, 3, '2026-09-28 11:45:00'),
    (18, 3, '2026-09-29 18:00:00'),
    (20, 3, '2026-10-01 14:50:00');

COMMIT;
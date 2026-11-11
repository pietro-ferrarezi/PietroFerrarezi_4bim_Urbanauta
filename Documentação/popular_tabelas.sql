TRUNCATE TABLE Usuario,
Voluntario,
Colaborador,
Categoria,
Estado_Atividade,
Estado_Manifestacao,
Estado_Participacao,
Projeto,
Iniciativa,
Responsavel_Iniciativa,
Manifestacao_Interesse,
Participacao,
Peticao,
Assinatura RESTART IDENTITY CASCADE;

-- 1. USUARIOS (7)
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
    );

-- 2. PERFIS: usuarios 4 e 5 tem os dois papeis.
-- Usuarios 1, 2 e 3: apenas voluntarios; 6 e 7: apenas colaboradores.
INSERT INTO
    public.Voluntario (ID_USUARIO)
VALUES (1),
    (2),
    (3),
    (4),
    (5);

INSERT INTO
    public.Colaborador (ID_USUARIO)
VALUES (4),
    (5),
    (6),
    (7);

-- 3. CATEGORIAS E ESTADOS
INSERT INTO
    public.Categoria (nome)
VALUES ('Meio ambiente'),
    ('Espaços públicos'),
    ('Mobilidade urbana'),
    ('Resíduos e reciclagem'),
    ('Agricultura urbana');

-- Estado_Atividade: 1=Planejada; 2=Em andamento; 3=Concluida.
INSERT INTO
    public.Estado_Atividade (nome)
VALUES ('Planejada'),
    ('Em andamento'),
    ('Concluída');

-- Estado_Manifestacao: 1=Pendente; 2=Aceita; 3=Negada; 4=Cancelada.
INSERT INTO
    public.Estado_Manifestacao (nome)
VALUES ('Pendente'),
    ('Aceita'),
    ('Negada'),
    ('Cancelada');

-- Estado_Participacao: 1=Ativa; 2=Concluida; 3=Desistiu.
INSERT INTO
    public.Estado_Participacao (nome)
VALUES ('Ativa'),
    ('Concluída'),
    ('Desistiu');

-- 4. PROJETOS (10)
-- Os projetos 8, 9 e 10 ficam SEM iniciativas para os testes.
INSERT INTO
    public.Projeto (
        titulo,
        descricao,
        ID_CATEGORIA,
        ID_ESTADO,
        ID_COLABORADOR_CRIADOR
    )
VALUES (
        'Corredores Verdes de Campo Mourão',
        'Quem anda por Campo Mourão sabe como faz falta uma sombra boa no caminho, principalmente nos dias mais quentes. Queremos aproximar as áreas verdes da cidade e trazer mais árvores para os trajetos do dia a dia. Se você curte colocar a mão na terra e ver uma mudança acontecendo de verdade, tem espaço para ajudar.',
        1,
        2,
        1
    ),
    (
        'Praças Vivas',
        'A praça do bairro pode ser muito mais do que um lugar por onde a gente passa. Nossa ideia é reunir moradores para cuidar desses espaços, ouvir o que está faltando e fazer pequenas melhorias juntos. Não precisa ter experiência: vontade de participar e boas ideias já fazem diferença.',
        2,
        2,
        2
    ),
    (
        'Mobilidade de Bairro',
        'Nem todo mundo se desloca de carro, e quem vai a pé ou de bicicleta conhece bem os desafios do caminho. Queremos escutar quem circula pelos bairros de Campo Mourão e pensar em trajetos mais seguros e agradáveis. Se você usa a cidade todos os dias, sua experiência já é uma contribuição importante.',
        3,
        1,
        3
    ),
    (
        'Ruas sem Resíduos',
        'A gente acredita que cuidar da cidade começa também pelas pequenas atitudes. Esse projeto reúne ações de limpeza e conversas sobre o destino do lixo que produzimos. A proposta é fazer junto, sem apontar dedos, e mostrar que uma rua mais limpa depende de informação e participação de todo mundo.',
        4,
        3,
        4
    ),
    (
        'Hortas de Vizinhança',
        'Já pensou em transformar um espaço pouco aproveitado em um lugar cheio de temperos, verduras e encontros? Queremos construir hortas com a comunidade, trocar conhecimentos e aprender na prática sobre cultivo. Pode chegar mesmo sem saber plantar: aqui a ideia é aprender e cuidar junto.',
        5,
        2,
        2
    ),
    (
        'Água para o Futuro',
        'Água parece um assunto distante até a gente perceber quanto usa sem notar. Queremos compartilhar soluções simples para economizar e aproveitar melhor esse recurso em casa e nos espaços coletivos. O projeto é um convite para testar ideias, fazer perguntas e descobrir o que dá para mudar na rotina.',
        1,
        2,
        1
    ),
    (
        'Cidade Acessível',
        'Uma cidade boa de viver precisa funcionar para todo mundo. Queremos olhar com atenção para calçadas, travessias e acessos de Campo Mourão, especialmente os obstáculos que muitas vezes passam despercebidos. A proposta é ouvir diferentes experiências e reunir informações que ajudem a cobrar melhorias reais.',
        3,
        1,
        3
    ),
    (
        'Sombra nas Escolas',
        'Pátios e caminhos com mais sombra tornam o dia a dia na escola mais agradável. Estamos começando a pensar em formas de ampliar a arborização desses espaços, respeitando as necessidades de cada lugar. Quem gosta de natureza, educação ou tem ideias para contribuir pode acompanhar a construção do projeto.',
        1,
        1,
        4
    ),
    (
        'Arte na Praça',
        'Tem praça que só precisa de gente ocupando o espaço com criatividade para ganhar outra cara. Queremos aproximar artistas, estudantes e moradores para imaginar intervenções feitas em conjunto, com cuidado e respeito ao lugar. Vale chegar com uma ideia, uma habilidade ou só vontade de construir algo coletivo.',
        2,
        1,
        1
    ),
    (
        'Compostagem Comunitária',
        'Restos de frutas e verduras não precisam terminar sempre no lixo comum. Nossa ideia é aproximar a compostagem da rotina dos bairros e mostrar como os resíduos orgânicos podem voltar para a terra. Ainda estamos organizando os primeiros passos, e quem tiver curiosidade ou experiência com o tema é bem-vindo.',
        4,
        1,
        2
    );

-- 5. INICIATIVAS (8)
-- A iniciativa 6 nao tera nenhuma manifestacao de interesse.
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

-- 6. RESPONSAVEIS (10 relacionamentos)
-- Iniciativas 1 e 4 possuem dois colaboradores responsaveis.
INSERT INTO
    public.Responsavel_Iniciativa (ID_INICIATIVA, ID_COLABORADOR)
VALUES (1, 1),
    (1, 2),
    (2, 1),
    (3, 2),
    (4, 3),
    (4, 4),
    (5, 4),
    (6, 2),
    (7, 1),
    (8, 3);

-- 7. MANIFESTACOES (12)
-- 7 aceitas (ids 1,2,4,5,6,8,9); 2 pendentes; 2 negadas; 1 cancelada.
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
    ), -- 1: aceita
    (
        '2026-09-11 09:30:00',
        2,
        1,
        2
    ), -- 2: aceita
    (
        '2026-10-29 14:00:00',
        3,
        2,
        1
    ), -- 3: pendente
    (
        '2026-10-01 11:00:00',
        4,
        3,
        2
    ), -- 4: aceita
    (
        '2026-11-01 15:00:00',
        5,
        4,
        2
    ), -- 5: aceita
    (
        '2026-10-10 08:45:00',
        1,
        5,
        2
    ), -- 6: aceita
    (
        '2026-10-31 13:20:00',
        2,
        2,
        1
    ), -- 7: pendente
    (
        '2026-10-27 16:00:00',
        3,
        7,
        2
    ), -- 8: aceita
    (
        '2026-11-02 10:00:00',
        4,
        8,
        2
    ), -- 9: aceita
    (
        '2026-10-25 09:15:00',
        5,
        2,
        3
    ), -- 10: negada
    (
        '2026-10-30 17:00:00',
        1,
        4,
        3
    ), -- 11: negada
    (
        '2026-11-01 18:30:00',
        2,
        8,
        4
    );
-- 12: cancelada

-- 8. PARTICIPACOES (7)
-- Apenas manifestacoes aceitas geram participacoes.
INSERT INTO
    public.Participacao (
        data_confirmacao,
        ID_MANIFESTACAO,
        ID_ESTADO
    )
VALUES ('2026-09-11 12:00:00', 1, 2), -- concluida
    ('2026-09-12 09:00:00', 2, 2), -- concluida
    ('2026-10-02 08:00:00', 4, 2), -- concluida
    ('2026-11-02 09:00:00', 5, 1), -- ativa
    ('2026-10-11 10:00:00', 6, 2), -- concluida
    ('2026-10-28 15:00:00', 8, 1), -- ativa
    ('2026-11-03 08:00:00', 9, 3);
-- desistiu apos confirmacao

-- 9. PETICOES (4)
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
        2
    );

-- 10. ASSINATURAS (10)
-- Peticao 1 atinge a meta; peticao 4 fica sem assinaturas.
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
    (5, 3, '2026-09-25 17:00:00');
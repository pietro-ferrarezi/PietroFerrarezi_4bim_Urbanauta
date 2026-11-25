// Detalhe do projeto. Ajuste os ENDPOINTS conforme suas rotas reais do Express.
(() => {
    const CONFIG = {
        projeto: (id) => `/projetos/${id}`,
        participar: (id) => `/iniciativas/${id}/participar` // Sugestão: confirme a rota POST real.
    };

    const tituloEl = document.querySelector('#projeto-titulo');
    const leadEl = document.querySelector('#projeto-lead');
    const descricaoEl = document.querySelector('#projeto-descricao');
    const categoriaEl = document.querySelector('#projeto-categoria');
    const estadoEl = document.querySelector('#projeto-estado');
    const imagemEl = document.querySelector('#projeto-imagem');
    const placeholderEl = document.querySelector('#imagem-placeholder');
    const listaEl = document.querySelector('#atividades-lista');
    const contadorEl = document.querySelector('#atividades-contador');
    const avisoEl = document.querySelector('#atividades-aviso');

    // Compatível com /voluntario/projetos/12 e /voluntario/projetos/12/.
    const partes = location.pathname.split('/').filter(Boolean);
    const idProjeto = partes.at(-1);
    if (!/^\d+$/.test(idProjeto)) {
        tituloEl.textContent = 'PROJETO NÃO ENCONTRADO';
        leadEl.textContent = 'O endereço deste projeto não é válido.';
        descricaoEl.textContent = 'Volte ao catálogo e escolha um projeto.';
        contadorEl.textContent = '0 ATIVIDADES';
        listaEl.setAttribute('aria-busy', 'false');
        return;
    }

    function texto(tag, classe, valor) {
        const elemento = document.createElement(tag);
        if (classe) elemento.className = classe;
        if (valor !== undefined && valor !== null) elemento.textContent = String(valor);
        return elemento;
    }

    function obterId(item) {
        return item.id_iniciativa;
    }

    function mostrarMensagem(mensagem) {
        listaEl.replaceChildren(texto('p', 'atividades__mensagem', mensagem));
    }

    function urlImagemValida(url) {
        // Apenas imagens locais ou HTTPS. Evita injetar protocolos indesejados.
        return typeof url === 'string' &&
            ((url.startsWith('/') && !url.startsWith('//')) || /^https:\/\//i.test(url));
    }

    async function obterJSON(url) {
        const resposta = await fetch(url, { credentials: 'same-origin' });
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
        return resposta.json();
    }

    function preencherProjeto(projeto) {
        const titulo = projeto.titulo ?? 'Projeto sem título';
        tituloEl.textContent = titulo;
        document.title = `${titulo} | Urbanauta`;
        leadEl.textContent = projeto.lead ?? 'Conheça esta iniciativa comunitária.';
        descricaoEl.textContent = projeto.descricao ?? projeto.lead ?? 'Ainda não há descrição disponível.';

        if (projeto.categoria) {
            categoriaEl.textContent = projeto.categoria;
            categoriaEl.hidden = false;
        }
        if (projeto.estado) {
            estadoEl.textContent = `ESTADO: ${projeto.estado}`;
            estadoEl.hidden = false;
        }

        // Sua consulta ainda não retorna uma imagem; mantém a arte padrão.
        const imagem = projeto.imagem_url;
        if (urlImagemValida(imagem)) {
            imagemEl.src = imagem;
            imagemEl.alt = `Imagem do projeto ${titulo}`;
            imagemEl.onload = () => { imagemEl.hidden = false; placeholderEl.hidden = true; };
            imagemEl.onerror = () => { imagemEl.hidden = true; placeholderEl.hidden = false; };
        }
    }

    function preencherIniciativas(iniciativas) {
        contadorEl.textContent = `${iniciativas.length} ${iniciativas.length === 1 ? 'INICIATIVA' : 'INICIATIVAS'}`;
        if (!iniciativas.length) {
            mostrarMensagem('Este projeto ainda não possui iniciativas cadastradas.');
            return;
        }
        listaEl.replaceChildren(...iniciativas.map(criarAtividade));
    }

    async function carregarProjeto() {
        listaEl.setAttribute('aria-busy', 'true');
        try {
            const dados = await obterJSON(CONFIG.projeto(idProjeto));
            if (!dados.projeto || !Array.isArray(dados.iniciativas)) {
                throw new Error('Formato inesperado da resposta de projeto');
            }
            preencherProjeto(dados.projeto);
            preencherIniciativas(dados.iniciativas);
        } catch (erro) {
            console.error('Erro ao carregar projeto:', erro);
            tituloEl.textContent = 'NÃO FOI POSSÍVEL CARREGAR O PROJETO';
            leadEl.textContent = 'Confira o endereço ou tente novamente mais tarde.';
            descricaoEl.textContent = 'As informações deste projeto estão indisponíveis.';
            contadorEl.textContent = 'INICIATIVAS INDISPONÍVEIS';
            mostrarMensagem('Não foi possível carregar as iniciativas deste projeto.');
        } finally {
            listaEl.setAttribute('aria-busy', 'false');
        }
    }

    function dataFormatada(valor) {
        if (!valor) return null;
        const data = new Date(valor);
        return Number.isNaN(data.getTime()) ? null : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(data);
    }

    async function participar(id, botao) {
        botao.disabled = true;
        const rotuloAnterior = botao.textContent;
        botao.textContent = 'ENVIANDO...';
        avisoEl.textContent = '';
        try {
            const resposta = await fetch(CONFIG.participar(id), {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' }
            });
            if (resposta.status === 401) {
                location.href = '/login';
                return;
            }
            if (resposta.status === 409) {
                botao.textContent = 'SOLICITAÇÃO JÁ REGISTRADA';
                avisoEl.textContent = 'Você já tem uma solicitação para esta iniciativa.';
                return;
            }
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            botao.textContent = 'SOLICITAÇÃO ENVIADA ✓';
            avisoEl.textContent = 'Seu pedido de participação foi registrado!';
        } catch (erro) {
            console.error('Erro ao participar:', erro);
            botao.disabled = false;
            botao.textContent = rotuloAnterior;
            avisoEl.textContent = 'Não foi possível registrar sua participação. Tente novamente.';
        }
    }

    function criarAtividade(atividade, indice) {
        const id = obterId(atividade);
        const artigo = texto('article', 'atividade-card');
        const cabecalho = texto('div', 'atividade-card__topo');
        cabecalho.append(texto('span', '', `${String(indice + 1).padStart(2, '0')} / INICIATIVA`));
        cabecalho.append(texto('span', '', atividade.estado?.nome ?? atividade.estado ?? 'PARTICIPE'));
        artigo.append(cabecalho);

        const corpo = texto('div', 'atividade-card__corpo');
        corpo.append(texto('h3', '', atividade.titulo ?? 'Iniciativa sem título'));
        corpo.append(texto('p', '', atividade.descricao ?? 'Veja como você pode contribuir com esta iniciativa.'));
        const data = dataFormatada(atividade.data_inicio);
        if (data) corpo.append(texto('span', 'atividade-card__meta', `INÍCIO: ${data}`));
        const fim = dataFormatada(atividade.data_fim);
        if (fim) corpo.append(texto('span', 'atividade-card__meta', `FIM: ${fim}`));
        if (atividade.localizacao) corpo.append(texto('span', 'atividade-card__meta', `LOCAL: ${atividade.localizacao}`));
        if (atividade.vagas !== null && atividade.vagas !== undefined) corpo.append(texto('span', 'atividade-card__meta', `VAGAS: ${atividade.vagas}`));

        const botao = texto('button', '', 'QUERO PARTICIPAR →');
        botao.type = 'button';
        if (id === undefined || id === null) {
            botao.disabled = true;
            botao.title = 'Iniciativa sem identificador';
        } else {
            botao.addEventListener('click', () => participar(id, botao));
        }
        corpo.append(botao);
        artigo.append(corpo);
        return artigo;
    }

    void carregarProjeto();
})();
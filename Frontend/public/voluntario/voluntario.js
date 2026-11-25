// Página inicial do voluntário: somente os destaques.
// O header e o avatar são montados por /js/header.js.

const ENDPOINTS = {
    projetos: "/projetos/destaques",    // já usado na Home
    peticoes: "/peticoes/destaques"     // criar/conferir esta rota no backend
};

const ROTAS_DETALHES = {
    projetos: id => `/voluntario/projetos/${encodeURIComponent(id)}`,
    peticoes: id => `/voluntario/peticoes/${encodeURIComponent(id)}`
};

async function buscarLista(url, chave) {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status} em ${url}`);

    const dados = await resposta.json();
    const lista = Array.isArray(dados) ? dados : dados?.[chave];
    if (!Array.isArray(lista)) throw new Error(`Resposta inválida em ${url}`);
    return lista;
}

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined && texto !== null) elemento.textContent = String(texto);
    return elemento;
}

function criarCard(item, indice, tipo) {
    // Ajustar os nomes das propriedades aos campos reais retornados pela API.
    const id = tipo === "projetos"
        ? (item.id ?? item.id_projeto ?? item.ID_PROJETO)
        : (item.id ?? item.id_peticao ?? item.ID_PETICAO);
    const categoria = tipo === "projetos" ? (item.categoria ?? "PROJETO") : "PETIÇÃO";
    const descricao = tipo === "projetos"
        ? (item.lead ?? item.descricao ?? "Conheça esta iniciativa.")
        : (item.lead ?? item.descricao ?? "Conheça esta petição.");

    const artigo = criarElemento("article", "destaque-card");
    artigo.append(criarElemento("span", "destaque-card__etiqueta", categoria));
    const conteudo = criarElemento("div", "destaque-card__conteudo");
    conteudo.append(criarElemento("span", "destaque-card__numero", `${String(indice + 1).padStart(2, "0")} / ${tipo === "projetos" ? "PROJETO" : "PETIÇÃO"}`));
    conteudo.append(criarElemento("h3", "", item.titulo ?? "Sem título"));
    conteudo.append(criarElemento("p", "", descricao));

    if (id !== undefined && id !== null) {
        const link = criarElemento("a", "destaque-card__link");
        link.href = ROTAS_DETALHES[tipo](id);
        link.append(document.createTextNode(tipo === "projetos" ? "CONHECER PROJETO" : "VER PETIÇÃO"));
        link.append(criarElemento("span", "", "↗"));
        conteudo.append(link);
    }
    artigo.append(conteudo);
    return artigo;
}

async function carregarDestaques(tipo, containerId) {
    const container = document.getElementById(containerId);
    try {
        const lista = await buscarLista(ENDPOINTS[tipo], tipo);
        container.replaceChildren();
        if (!lista.length) {
            container.append(criarElemento("p", "vitrine__mensagem", "Nenhum destaque disponível no momento."));
            return;
        }
        lista.slice(0, 3).forEach((item, indice) => {
            container.append(criarCard(item, indice, tipo));
        });
    } catch (erro) {
        console.error(`Erro ao carregar ${tipo}:`, erro);
        container.replaceChildren(criarElemento("p", "vitrine__mensagem", `Não foi possível carregar ${tipo} agora.`));
    }
}

void Promise.all([
    carregarDestaques("projetos", "destaques-projetos"),
    carregarDestaques("peticoes", "destaques-peticoes")
]);
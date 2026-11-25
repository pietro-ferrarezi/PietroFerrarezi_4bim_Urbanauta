// Catálogo completo de projetos. O header é responsabilidade de /js/header.js.
(() => {
    const ENDPOINT_PROJETOS = "/projetos"; // Conferir a rota GET no Express.
    const listaElemento = document.querySelector("#lista-projetos");
    const buscaElemento = document.querySelector("#busca-projetos");
    const contadorElemento = document.querySelector("#contador-projetos");
    let projetos = [];

    function elemento(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined && texto !== null) el.textContent = String(texto);
        return el;
    }

    function criarCard(projeto, indice) {
        const id = projeto.id ?? projeto.id_projeto ?? projeto.ID_PROJETO;
        const titulo = projeto.titulo ?? "Projeto sem título";
        const categoria = projeto.categoria ?? "PROJETO";
        const lead = projeto.lead ?? projeto.descricao ?? "Conheça este projeto.";

        const artigo = elemento("article", "projeto-card");
        artigo.append(elemento("span", "projeto-card__tag", categoria));

        const conteudo = elemento("div", "projeto-card__conteudo");
        conteudo.append(elemento("span", "projeto-card__numero", `${String(indice + 1).padStart(2, "0")} / PROJETO`));
        conteudo.append(elemento("h3", "", titulo));
        conteudo.append(elemento("p", "", lead));

        if (id !== undefined && id !== null) {
            const link = elemento("a", "projeto-card__link");
            link.href = `/voluntario/projetos/${encodeURIComponent(id)}`;
            link.append(document.createTextNode("CONHECER PROJETO"));
            link.append(elemento("span", "", "↗"));
            conteudo.append(link);
        }

        artigo.append(conteudo);
        return artigo;
    }

    function mostrarMensagem(mensagem) {
        listaElemento.replaceChildren(elemento("p", "catalogo__mensagem", mensagem));
    }

    function atualizarLista() {
        const termo = buscaElemento.value.trim().toLocaleLowerCase("pt-BR");
        const encontrados = projetos.filter((projeto) => {
            const texto = `${projeto.titulo ?? ""} ${projeto.categoria ?? ""}`;
            return texto.toLocaleLowerCase("pt-BR").includes(termo);
        });

        contadorElemento.textContent = `${encontrados.length} ${encontrados.length === 1 ? "PROJETO ENCONTRADO" : "PROJETOS ENCONTRADOS"}`;
        listaElemento.replaceChildren();
        if (!encontrados.length) {
            mostrarMensagem(termo ? "Nenhum projeto corresponde à busca." : "Nenhum projeto cadastrado no momento.");
            return;
        }
        encontrados.forEach((projeto, indice) => listaElemento.append(criarCard(projeto, indice)));
    }

    async function carregarProjetos() {
        listaElemento.setAttribute("aria-busy", "true");
        contadorElemento.textContent = "Carregando projetos...";
        try {
            const resposta = await fetch(ENDPOINT_PROJETOS, { credentials: "same-origin" });
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            const dados = await resposta.json();
            const lista = Array.isArray(dados) ? dados : dados?.projetos;
            if (!Array.isArray(lista)) throw new Error("Resposta de projetos em formato inesperado");
            projetos = lista;
            atualizarLista();
        } catch (erro) {
            console.error("Erro ao carregar projetos:", erro);
            contadorElemento.textContent = "PROJETOS INDISPONÍVEIS";
            mostrarMensagem("Não foi possível carregar os projetos. Tente atualizar a página.");
        } finally {
            listaElemento.setAttribute("aria-busy", "false");
        }
    }

    buscaElemento.addEventListener("input", atualizarLista);
    void carregarProjetos();
})();
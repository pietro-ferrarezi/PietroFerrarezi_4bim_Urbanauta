// Apenas funcionalidades da Home. O header é montado por /js/header.js.

async function buscarDestaques() {
    const resposta = await fetch("/projetos/destaques");
    if (!resposta.ok) throw new Error("Erro ao carregar destaques");
    const dados = await resposta.json();
    return Array.isArray(dados.projetos) ? dados.projetos : [];
}

function carregarDestaques(destaques) {
    const container = document.querySelector(".projetos__display");
    if (!container) return;
    container.replaceChildren();

    destaques.forEach((destaque, indice) => {
        const card = document.createElement("article");
        card.className = "projeto-card";

        const tag = document.createElement("span");
        tag.className = "projeto-card__tag";
        tag.textContent = destaque.categoria || "Projeto";

        const conteudo = document.createElement("div");
        conteudo.className = "projeto-card__conteudo";

        const numero = document.createElement("span");
        numero.className = "projeto-card__numero";
        numero.textContent = `${String(indice + 1).padStart(2, "0")} / PROJETO`;

        const titulo = document.createElement("h3");
        titulo.textContent = destaque.titulo || "Projeto";

        const descricao = document.createElement("p");
        descricao.textContent = destaque.lead || "";

        const conhecer = document.createElement("a");
        conhecer.className = "primary-btt";
        // Ajuste o link quando a rota de detalhes estiver definida no Express.
        conhecer.href = destaque.id != null
            ? `/projetos/${encodeURIComponent(destaque.id)}`
            : "/voluntario";
        conhecer.textContent = "Conheça o projeto →";

        conteudo.append(numero, titulo, descricao, conhecer);
        card.append(tag, conteudo);
        container.append(card);
    });
}

async function iniciarDestaques() {
    try {
        carregarDestaques(await buscarDestaques());
    } catch (erro) {
        console.error(erro);
    }
}

document.addEventListener("DOMContentLoaded", iniciarDestaques);
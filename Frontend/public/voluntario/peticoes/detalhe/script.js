// Página individual: GET /peticoes/:id e POST /peticoes/:id/assinar
(() => {
  const id = location.pathname.split("/").filter(Boolean).at(-1);
  const tituloEl = document.querySelector("#peticao-titulo");
  const leadEl = document.querySelector("#peticao-lead");
  const descricaoEl = document.querySelector("#peticao-descricao");
  const criadorEl = document.querySelector("#peticao-criador");
  const dataEl = document.querySelector("#peticao-data");
  const atuaisEl = document.querySelector("#assinaturas-atuais");
  const metaEl = document.querySelector("#assinaturas-meta");
  const barraEl = document.querySelector("#assinaturas-progresso");
  const preenchimentoEl = document.querySelector("#assinaturas-preenchimento");
  const porcentagemEl = document.querySelector("#assinaturas-porcentagem");
  const botaoEl = document.querySelector("#assinar-peticao");
  const avisoEl = document.querySelector("#assinaturas-aviso");
  const formatoNumero = new Intl.NumberFormat("pt-BR");
  let peticaoAtual = null;

  function atualizarProgresso(peticao) {
    const assinaturas = Math.max(0, Number(peticao.qtd_assinaturas) || 0);
    const meta = Math.max(1, Number(peticao.meta_assinatura) || 1);
    const percentual = (assinaturas / meta) * 100;
    atuaisEl.textContent = formatoNumero.format(assinaturas);
    metaEl.textContent = formatoNumero.format(meta);
    preenchimentoEl.style.width = `${Math.min(100, percentual)}%`;
    barraEl.setAttribute(
      "aria-valuenow",
      String(Math.min(100, Math.round(percentual))),
    );
    porcentagemEl.textContent = `${Math.round(percentual)}% da meta alcançada`;
  }

  function definirBotaoJaAssinado() {
    botaoEl.disabled = true;
    botaoEl.textContent = "VOCÊ JÁ ASSINOU ✓";
    avisoEl.textContent = "Obrigado por apoiar esta causa!";
  }

  function preencher(peticao) {
    peticaoAtual = peticao;
    const titulo = peticao.titulo ?? "Petição sem título";
    document.title = `${titulo} | Urbanauta`;
    tituloEl.textContent = titulo;
    leadEl.textContent =
      peticao.lead ?? "Ajude a fortalecer essa proposta comunitária.";
    descricaoEl.textContent =
      peticao.descricao ?? peticao.lead ?? "Ainda não há descrição disponível.";
    criadorEl.textContent = peticao.criador ?? "Colaborador do Urbanauta";
    if (peticao.data_criacao) {
      const data = new Date(peticao.data_criacao);
      if (!Number.isNaN(data.getTime())) {
        dataEl.textContent = `PUBLICADA EM ${new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(data)}`;
      }
    }
    atualizarProgresso(peticao);
    if (peticao.ja_assinou === true) {
      definirBotaoJaAssinado();
    } else {
      botaoEl.disabled = false;
      botaoEl.textContent = "ASSINAR PETIÇÃO →";
      avisoEl.textContent = "Sua assinatura será registrada na sua conta.";
    }
  }

  async function carregarPeticao() {
    if (
      !/^\d+$/.test(id) ||
      !Number.isSafeInteger(Number(id)) ||
      Number(id) <= 0 ||
      Number(id) > 2147483647
    ) {
      tituloEl.textContent = "PETIÇÃO NÃO ENCONTRADA";
      leadEl.textContent = "O endereço informado não é válido.";
      descricaoEl.textContent = "Volte ao catálogo e escolha uma petição.";
      botaoEl.textContent = "INDISPONÍVEL";
      return;
    }
    try {
      const resposta = await fetch(`/peticoes/${id}`, {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      if (!dados.peticao) throw new Error("Resposta inesperada da API");
      preencher(dados.peticao);
    } catch (erro) {
      console.error("Erro ao carregar petição:", erro);
      tituloEl.textContent = "NÃO FOI POSSÍVEL CARREGAR A PETIÇÃO";
      leadEl.textContent = "Confira o endereço ou tente novamente.";
      descricaoEl.textContent =
        "As informações desta petição estão indisponíveis.";
      criadorEl.textContent = "INDISPONÍVEL";
      botaoEl.disabled = true;
      botaoEl.textContent = "INDISPONÍVEL";
    }
  }

  async function assinar() {
    if (!peticaoAtual || botaoEl.disabled) return;
    botaoEl.disabled = true;
    botaoEl.textContent = "REGISTRANDO...";
    avisoEl.textContent = "";
    try {
      const resposta = await fetch(`/peticoes/${id}/assinar`, {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (resposta.status === 401) {
        location.href = "/login";
        return;
      }
      if (resposta.status === 409) {
        // Confirma o estado no servidor, inclusive a contagem atual.
        await carregarPeticao();
        definirBotaoJaAssinado();
        return;
      }
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      // Evita contagem inventada: busca a quantidade atualizada no backend.
      await carregarPeticao();
      definirBotaoJaAssinado();
    } catch (erro) {
      console.error("Erro ao assinar petição:", erro);
      botaoEl.disabled = false;
      botaoEl.textContent = "ASSINAR PETIÇÃO →";
      avisoEl.textContent =
        "Não foi possível registrar sua assinatura. Tente novamente.";
    }
  }

  botaoEl.addEventListener("click", assinar);
  void carregarPeticao();
})();

// Catálogo de petições: GET /peticoes => { peticoes: [...] }
(() => {
  const listaEl = document.querySelector('#lista-peticoes');
  const buscaEl = document.querySelector('#busca-peticoes');
  const contadorEl = document.querySelector('#contador-peticoes');
  const controles = document.querySelector('#paginacao-peticoes');
  let peticoes = [];

  const numero = valor => new Intl.NumberFormat('pt-BR').format(Number(valor) || 0);
  function elemento(tag, classe, valor) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (valor !== undefined && valor !== null) el.textContent = String(valor);
    return el;
  }

  function criarCard(peticao, indice) {
    const card = elemento('article', 'peticao-card');
    card.append(elemento('span', 'peticao-card__etiqueta', 'PETIÇÃO COMUNITÁRIA'));
    const corpo = elemento('div', 'peticao-card__corpo');
    corpo.append(elemento('span', 'peticao-card__numero', `${String(indice + 1).padStart(2, '0')} / PETIÇÃO`));
    corpo.append(elemento('h3', '', peticao.titulo ?? 'Petição sem título'));
    corpo.append(elemento('p', 'peticao-card__descricao', peticao.lead ?? peticao.descricao ?? 'Conheça esta causa.'));
    const assinaturas = Math.max(0, Number(peticao.qtd_assinaturas) || 0);
    const meta = Math.max(1, Number(peticao.meta_assinatura) || 1);
    corpo.append(elemento('div', 'peticao-card__meta', `${numero(assinaturas)} assinaturas / meta ${numero(meta)}`));
    const progresso = elemento('div', 'peticao-card__progresso');
    const preenchimento = document.createElement('div');
    preenchimento.style.width = `${Math.min(100, (assinaturas / meta) * 100)}%`;
    progresso.append(preenchimento);
    corpo.append(progresso);
    if (Number.isSafeInteger(Number(peticao.id_peticao)) && Number(peticao.id_peticao) > 0) {
      const link = elemento('a', 'peticao-card__link', 'VER PETIÇÃO ↗');
      link.href = `/voluntario/peticoes/${peticao.id_peticao}`;
      corpo.append(link);
    }
    card.append(corpo);
    return card;
  }

  const paginacao = window.UrbanautaPaginacao.criarPaginador({
    lista: listaEl, controles, renderizarItem: criarCard, porPagina: 6
  });

  function atualizarLista() {
    const termo = buscaEl.value.trim().toLocaleLowerCase('pt-BR');
    const filtradas = peticoes.filter(p =>
      `${p.titulo ?? ''} ${p.lead ?? ''} ${p.descricao ?? ''}`.toLocaleLowerCase('pt-BR').includes(termo)
    );
    contadorEl.textContent = `${filtradas.length} ${filtradas.length === 1 ? 'PETIÇÃO ENCONTRADA' : 'PETIÇÕES ENCONTRADAS'}`;
    paginacao.definirItens(filtradas);
    if (!filtradas.length) {
      listaEl.append(elemento('p', 'peticoes-lista__mensagem', termo
        ? 'Nenhuma petição encontrada para esta busca.'
        : 'Ainda não existem petições cadastradas.'));
    }
  }

  async function carregar() {
    listaEl.setAttribute('aria-busy', 'true');
    try {
      const resposta = await fetch('/peticoes', { credentials: 'same-origin' });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      if (!Array.isArray(dados.peticoes)) throw new Error('Resposta inesperada da API');
      peticoes = dados.peticoes;
      atualizarLista();
    } catch (erro) {
      console.error('Erro ao carregar petições:', erro);
      contadorEl.textContent = 'PETIÇÕES INDISPONÍVEIS';
      paginacao.limpar();
      listaEl.replaceChildren(elemento('p', 'peticoes-lista__mensagem', 'Não foi possível carregar as petições. Tente novamente.'));
    } finally {
      listaEl.setAttribute('aria-busy', 'false');
    }
  }

  buscaEl.addEventListener('input', atualizarLista);
  void carregar();
})();
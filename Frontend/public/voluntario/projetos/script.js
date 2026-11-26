// Catálogo de projetos: GET /projetos => { projetos: [...] }
(() => {
  const listaElemento = document.querySelector('#lista-projetos');
  const buscaElemento = document.querySelector('#busca-projetos');
  const contadorElemento = document.querySelector('#contador-projetos');
  const controles = document.querySelector('#paginacao-projetos');
  let projetos = [];

  function elemento(tag, classe, valor) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (valor !== undefined && valor !== null) el.textContent = String(valor);
    return el;
  }

  function criarCard(projeto, indice) {
    const id = projeto.id ?? projeto.id_projeto ?? projeto.ID_PROJETO;
    const artigo = elemento('article', 'projeto-card');
    artigo.append(elemento('span', 'projeto-card__tag', projeto.categoria ?? 'PROJETO'));
    const conteudo = elemento('div', 'projeto-card__conteudo');
    conteudo.append(elemento('span', 'projeto-card__numero', `${String(indice + 1).padStart(2, '0')} / PROJETO`));
    conteudo.append(elemento('h3', '', projeto.titulo ?? 'Projeto sem título'));
    conteudo.append(elemento('p', '', projeto.lead ?? projeto.descricao ?? 'Conheça este projeto.'));
    if (id !== undefined && id !== null) {
      const link = elemento('a', 'projeto-card__link');
      link.href = `/voluntario/projetos/${encodeURIComponent(id)}`;
      link.append(document.createTextNode('CONHECER PROJETO'), elemento('span', '', '↗'));
      conteudo.append(link);
    }
    artigo.append(conteudo);
    return artigo;
  }

  const paginacao = window.UrbanautaPaginacao.criarPaginador({
    lista: listaElemento, controles, renderizarItem: criarCard, porPagina: 6
  });

  function mostrarMensagem(mensagem) {
    listaElemento.replaceChildren(elemento('p', 'catalogo__mensagem', mensagem));
  }

  function atualizarLista() {
    const termo = buscaElemento.value.trim().toLocaleLowerCase('pt-BR');
    const encontrados = projetos.filter(p =>
      `${p.titulo ?? ''} ${p.categoria ?? ''}`.toLocaleLowerCase('pt-BR').includes(termo)
    );
    contadorElemento.textContent = `${encontrados.length} ${encontrados.length === 1 ? 'PROJETO ENCONTRADO' : 'PROJETOS ENCONTRADOS'}`;
    paginacao.definirItens(encontrados);
    if (!encontrados.length) {
      mostrarMensagem(termo ? 'Nenhum projeto corresponde à busca.' : 'Nenhum projeto cadastrado no momento.');
    }
  }

  async function carregarProjetos() {
    listaElemento.setAttribute('aria-busy', 'true');
    contadorElemento.textContent = 'Carregando projetos...';
    try {
      const resposta = await fetch('/projetos', { credentials: 'same-origin' });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      const lista = Array.isArray(dados) ? dados : dados?.projetos;
      if (!Array.isArray(lista)) throw new Error('Resposta de projetos em formato inesperado');
      projetos = lista;
      atualizarLista();
    } catch (erro) {
      console.error('Erro ao carregar projetos:', erro);
      contadorElemento.textContent = 'PROJETOS INDISPONÍVEIS';
      paginacao.limpar();
      mostrarMensagem('Não foi possível carregar os projetos. Tente atualizar a página.');
    } finally {
      listaElemento.setAttribute('aria-busy', 'false');
    }
  }

  buscaElemento.addEventListener('input', atualizarLista);
  void carregarProjetos();
})();
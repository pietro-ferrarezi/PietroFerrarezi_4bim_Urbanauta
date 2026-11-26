// Paginação compartilhada dos catálogos Urbanauta.
// Carregar este arquivo ANTES do script específico da página.
(() => {
  function criarPaginador({ lista, controles, renderizarItem, porPagina = 6 }) {
    let itens = [];
    let paginaAtual = 1;

    function criarBotao(texto, pagina, desabilitado = false, ativo = false, rotulo = null) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'paginacao__botao';
      if (ativo) {
        botao.classList.add('paginacao__botao--atual');
        botao.setAttribute('aria-current', 'page');
      }
      botao.textContent = texto;
      botao.disabled = desabilitado;
      if (rotulo) botao.setAttribute('aria-label', rotulo);
      botao.addEventListener('click', () => mudarPagina(pagina));
      return botao;
    }

    function atualizar() {
      const totalPaginas = Math.ceil(itens.length / porPagina);
      paginaAtual = Math.min(Math.max(1, paginaAtual), Math.max(1, totalPaginas));
      const inicio = (paginaAtual - 1) * porPagina;
      const pagina = itens.slice(inicio, inicio + porPagina);
      lista.replaceChildren(...pagina.map((item, indice) => renderizarItem(item, inicio + indice)));
      controles.replaceChildren();
      controles.hidden = totalPaginas <= 1;
      if (totalPaginas <= 1) return;

      controles.append(criarBotao('←', paginaAtual - 1, paginaAtual === 1, false, 'Página anterior'));
      // Até 5 números visíveis, mesmo em catálogos grandes.
      const primeiro = Math.max(1, Math.min(paginaAtual - 2, totalPaginas - 4));
      const ultimo = Math.min(totalPaginas, primeiro + 4);
      for (let p = primeiro; p <= ultimo; p++) {
        controles.append(criarBotao(String(p), p, false, p === paginaAtual, `Página ${p}`));
      }
      controles.append(criarBotao('→', paginaAtual + 1, paginaAtual === totalPaginas, false, 'Próxima página'));
    }

    function mudarPagina(novaPagina) {
      const totalPaginas = Math.ceil(itens.length / porPagina);
      if (novaPagina < 1 || novaPagina > totalPaginas || novaPagina === paginaAtual) return;
      paginaAtual = novaPagina;
      atualizar();
      // Mantém o título do catálogo visível ao trocar de página.
      lista.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return {
      definirItens(novosItens) {
        itens = novosItens;
        paginaAtual = 1;
        atualizar();
      },
      limpar() {
        itens = [];
        paginaAtual = 1;
        controles.replaceChildren();
        controles.hidden = true;
      }
    };
  }

  window.UrbanautaPaginacao = { criarPaginador };
})();
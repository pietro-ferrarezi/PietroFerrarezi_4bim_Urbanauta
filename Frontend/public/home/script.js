async function buscarDestaques() {
    try {
        const response = await fetch("/projetos/destaques");

        if (!response.status === 200) {
            throw new Error("Erro ao carregar destaques");
        }

        const projetos = await response.json();

        return projetos.projetos

    } catch (err) {
        console.error(err);
    }
}

function carregarDestaques(destaques) {
    for (let i = 0; i < destaques.length; i++) {
        const destaque = destaques[i]
        document.querySelector(".projetos__display").innerHTML += `
        <article class="projeto-card">
            <span class="projeto-card__tag">${destaque.categoria}</span>

            <div class="projeto-card__conteudo">
              <span class="projeto-card__numero">0${i+1} / PROJETO</span>

              <h3>${destaque.titulo}</h3>

              <p>
                ${destaque.lead}
              </p>

              <button class="primary-btt">Conheça o projeto --></button>
              </a>
            </div>
          </article>
        `
    }
}

async function carregarUsuario() {
    const response = await fetch("/usuarios/me")

    if(response.status === 401) {
        document.querySelector(".btt-login").style.display = "block"
    } else {
        document.querySelector(".btt-login").style.display = "block"
    }
}

document.querySelector(".btt-login").addEventListener("click", () => {
    window.location.href = "/login"
})

window.onload = async () => {
    const destaques = await buscarDestaques()
    carregarDestaques(destaques)

    carregarUsuario()
}
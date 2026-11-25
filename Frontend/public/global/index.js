// Componente de cabeçalho compartilhado pelas áreas do Urbanauta.
// Requer <body data-area="home|voluntario|gerenciamento">,
// <nav class="menu"></nav> e <div class="user"></div> no HTML.

(() => {
    const ROTAS = {
        login: "/login",
        voluntario: "/voluntario",
        gerenciamento: "/gerenciamento"
    };

    // Ajuste as rotas abaixo caso o Express utilize endereços diferentes.
    const MENUS = {
        home: [
            { nome: "Iniciativas", rota: ROTAS.voluntario },
            { nome: "Gerenciamento", rota: ROTAS.gerenciamento, permissao: "gestor" }
        ],
        voluntario: [
            { nome: "Projetos", rota: "/voluntario/projetos" },
            { nome: "Petições", rota: "/voluntario/peticoes" },
            { nome: "Gerenciamento", rota: ROTAS.gerenciamento, permissao: "gestor" }
        ],
        gerenciamento: [
            { nome: "Projetos", rota: "/gerenciamento/projetos", permissao: "gestor" },
            { nome: "Iniciativas", rota: "/gerenciamento/iniciativas", permissao: "gestor" },
            { nome: "Petições", rota: "/gerenciamento/peticoes", permissao: "gestor" },
            { nome: "Colaboradores", rota: "/gerenciamento/colaboradores", permissao: "administrador" }
        ]
    };

    function temPermissao(usuario, permissao) {
        if (!permissao) return true;
        if (!usuario) return false;

        if (permissao === "gestor") {
            return usuario.colaborador === true || usuario.administrador === true;
        }

        return usuario[permissao] === true;
    }

    function criarItem(item, usuario, area) {
        const link = document.createElement("a");
        const visitanteNaHome = area === "home" && !usuario;

        link.href = visitanteNaHome ? ROTAS.login : item.rota;
        link.className = "menu__item";
        link.textContent = item.nome;

        const caminhoAtual = window.location.pathname.replace(/\/$/, "") || "/";
        if (!visitanteNaHome && caminhoAtual === item.rota) {
            link.classList.add("menu__item--selected");
            link.setAttribute("aria-current", "page");
        }

        return link;
    }

    function criarAvatar(usuario) {
        const link = document.createElement("a");
        link.href = ROTAS.voluntario;
        link.className = "user__avatar";
        link.setAttribute("aria-label", "Minha área de voluntário");
        link.title = "Minha área";

        const imagem = document.createElement("img");
        imagem.alt = "";

        // Primeiro a foto do usuário; depois a imagem padrão.
        imagem.src = `/uploads/perfis/${encodeURIComponent(usuario.id)}.webp`;
        imagem.addEventListener("error", () => {
            if (!imagem.src.endsWith("/default.jpg")) {
                imagem.src = "/uploads/perfis/default.jpg";
            } else {
                imagem.remove();
                link.textContent = (usuario.nome || "U").trim().charAt(0).toUpperCase();
            }
        });

        link.append(imagem);
        return link;
    }

    function atualizarHeader(usuario, area) {
        console.log(usuario, area)
        const menu = document.querySelector(".menu");
        const user = document.querySelector(".user");
        if (!menu || !user) return;

        menu.replaceChildren();
        user.replaceChildren();

        const itens = MENUS[area] || MENUS.home;
        for (const item of itens) {
            if (temPermissao(usuario, item.permissao)) {
                menu.append(criarItem(item, usuario, area));
            }
        }

        if (usuario) {
            user.append(criarAvatar(usuario));
        } else {
            const entrar = document.createElement("a");
            entrar.href = ROTAS.login;
            entrar.className = "btt-login";
            entrar.textContent = "Entrar";
            user.append(entrar);
        }
    }

    async function iniciarHeader() {
        const area = document.body.dataset.area || "home";

        try {
            const resposta = await fetch("/usuarios/me", { credentials: "same-origin" });

            console.log(resposta.status)
            if (resposta.status === 401) {
                atualizarHeader(null, area);
                return;
            }
            if (!resposta.ok) throw new Error(`Erro ao carregar usuário: ${resposta.status}`);

            // Contrato: { id, nome, email, colaborador: boolean, administrador: boolean }
            const usuario = await resposta.json();
            atualizarHeader(usuario, area);
        } catch (erro) {
            console.error("Falha ao carregar o cabeçalho:", erro);
            // Somente a Home tem versão pública. As demais exigem validação no servidor.
            if (area === "home") atualizarHeader(null, area);
        }
    }

    document.addEventListener("DOMContentLoaded", iniciarHeader);
})();
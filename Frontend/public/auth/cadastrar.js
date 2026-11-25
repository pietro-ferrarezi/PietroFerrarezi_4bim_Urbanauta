
const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const senhaconf = document.querySelector("#senhaconf").value;

    if (!nome || !email || !senha || !senhaconf) {
        alert("Preencha todos os campos.");
        return;
    }

    if (senha !== senhaconf) {
        alert("As senhas não coincidem.");
        return;
    }

    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const resposta = await cadastrar(nome, email, senha);
        const data = await resposta.json()

        if (!resposta.ok) {
            if (resposta.status === 409) {
                alert("Este e-mail já está cadastrado.");
            } else {
                alert(`Houve um erro: ${data.message}`);
            }
            return;
        }

        // O backend precisa criar a sessão neste processo.
        window.location.href = "/voluntario";

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        alert("Não foi possível conectar ao servidor.");
    } finally {
        botao.disabled = false;
    }
});

async function cadastrar(nome, email, senha) {
    return await fetch("/usuarios/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
            nome: nome,
            email: email,
            pass: senha
        })
    });
}


const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;

    if (!email || !senha) {
        alert("Preencha seu e-mail e sua senha.");
        return;
    }

    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const sucesso = await login(email, senha);

        if (!sucesso) {
            alert("E-mail ou senha inválidos.");
            return;
        }

        window.location.href = "/voluntario";

    } catch (erro) {
        console.error("Erro no login:", erro);
        alert("Não foi possível conectar ao servidor.");
    } finally {
        botao.disabled = false;
    }
});

async function login(email, senha) {
    const resposta = await fetch("/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({
            email: email,
            pass: senha
        })
    });

    return resposta.ok;
}

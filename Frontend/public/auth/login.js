document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.querySelector("#email").value
    const senha = document.querySelector("#senha").value

    if(!email.trim() || !senha) {
        return console.log("Credenciais Inválidas")
    }

    const sucessLogin = await login(email, senha)

    if(!sucessLogin) {
        return console.log("Login não realizado!")
    }

    console.log("Login!")
    window.location.href = "/"
})

async function login(email, senha) {
    const result = await fetch("/usuarios/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, pass: senha})
    })

    if(result.status !== 200) {
        return false
    }

    return true
}
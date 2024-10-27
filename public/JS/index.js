var btn = document.getElementById("btn");
var joke = document.getElementById("joke");

function gerarPiada() {
    fetch("/apiadas/api/jokes")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            var randomIndex = Math.floor(Math.random() * data.length);
            var selectedJoke = data[randomIndex];
            joke.innerHTML = `<strong>Piada:</strong> ${selectedJoke.joke} <br><strong>Resposta:</strong> ${selectedJoke.response}`; // Mostra a piada e a resposta
        })
        .catch(function (error) {
            console.error("Erro ao buscar piada:", error);
        });
}

// Adiciona o evento de clique ao botão, se existir
if (btn) {
    btn.addEventListener("click", gerarPiada);
}

const btnRegister = document.getElementById("btnRegister");
const jokeForm = document.getElementById("jokeForm");

jokeForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    registrarPiada();
});

document.addEventListener("DOMContentLoaded", () => {
    const jokeForm = document.getElementById("jokeForm");

    jokeForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        registrarPiada();
    });

    function registrarPiada() {
        const joke = document.getElementById("piadaRegister").value.trim();
        const response = document.getElementById("respostaRegister").value.trim();

        console.log("Valor de joke:", joke);
        console.log("Valor de response:", response);

        if (!joke) {
            alert("O campo 'joke' é obrigatório!");
            return;
        }
        if (!response) {
            alert("O campo 'response' é obrigatório!");
            return;
        }

        fetch("/apiadas/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ joke, response })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao registrar a piada.");
            }
        })
        .then(data => {
            console.log("Piada registrada com sucesso:", data);
            // Limpar os campos após o sucesso (opcional)
            jokeForm.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
        });
    }
});

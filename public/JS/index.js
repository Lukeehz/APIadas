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

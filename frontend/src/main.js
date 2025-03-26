// Adiciona um evento de clique ao botão de busca
document.getElementById("scrapeButton").addEventListener("click", async () => {
  // Obtém o valor digitado no campo
  const keyword = document.getElementById("keyword").value;

  // Verifica se o campo está vazio e exibe um alerta se estiver
  if (keyword.trim() === "") {
    alert("Por favor, insira uma palavra-chave.");
    return;
  }

  try {
    // Faz uma requisição para o backend passando a palavra-chave
    const response = await fetch(
      `http://localhost:3000/api/scrape/?keyword=${encodeURIComponent(keyword)}`
    );

    // Converte a resposta para JSON
    const data = await response.json();

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      throw new Error(data.error || "Erro desconhecido no servidor");
    }

    // Seleciona o div que os resultados serão exibidos e limpa os valores anteriores
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    // Percorre a lista de produtos retornados pelo backend e 
    // cria um div para representar um card de cada produto da lista
    data.products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("result-card");

      // Define o conteúdo HTML do card do produto
      productCard.innerHTML = `
        <div class='result-card-img'>
          <img src="${product.imageUrl}" alt="${product.title}">
        </div>
        <div class='result-card-text'>
          <h3>${product.title}</h3>
          <p>Avaliação: ${product.rating} estrelas</p>
          <p>Comentários: ${product.reviews}</p>
        </div>
      `;

      // Adiciona o card do produto na lista de resultados
      resultsDiv.appendChild(productCard);
    });
  } catch (error) {
    // Em caso de erro, mostra uma mensagem de erro
    console.error("Erro:", error);
    alert(`Erro ao buscar os produtos: ${error.message?.trim() || "Por favor, tente novamente."}`);
  }
});

document.getElementById("scrapeButton").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value;
  if (keyword.trim() === "") {
    alert("Please enter a keyword");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/scrape/?keyword=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("result-card");

      productCard.innerHTML = `
        <div class='result-card-img'>
          <img src="${product.imageUrl}" alt="${product.title}">
        </div>
        <div class='result-card-text'>
          <h3>${product.title}</h3>
          <p>Rating: ${product.rating} stars</p>
          <p>Reviews: ${product.reviews}</p>
        </div>
      `;
      resultsDiv.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Error scraping the products. Please try again later.");
  }
});

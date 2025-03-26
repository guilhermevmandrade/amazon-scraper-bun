import axios from "axios";
import express, { type Request, type Response } from "express";
import { JSDOM } from "jsdom";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Definindo o tipo para os produtos
interface Product {
  title: string;
  rating: string;
  reviews: string;
  imageUrl: string;
}

// Cabeçalhos customizados para imitar uma requisição de navegador
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

// Função de scraping da Amazon com tipo de retorno
async function scrapeAmazon(keyword: string): Promise<Product[]> {
  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, { headers });
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const products: Product[] = [];

    // Seleciona todos os containers de produtos
    const productElements = document.querySelectorAll(".s-result-item");

    productElements.forEach((element) => {
      try {
        // Extrai o título
        const titleElement = element.querySelector("div[data-cy='title-recipe'] a h2 span");
        const title = titleElement?.textContent?.trim() ?? "N/A";

        // Extrai a avaliação
        const ratingElement = element.querySelector("i[data-cy='reviews-ratings-slot'] span");
        const rating = ratingElement?.textContent?.split(" ")[0] ?? "N/A";

        // Extrai o número de avaliações
        const reviewsElement = element.querySelector("div[data-cy='reviews-block'] .rush-component span");
        const reviews = reviewsElement?.textContent?.trim().replace(",", "") ?? "0";

        // Extrai a URL da imagem
        const imageElement = element.querySelector("div[data-cy='image-container'] .s-image") as HTMLImageElement;
        const imageUrl = imageElement?.src ?? "N/A";

        // Apenas adiciona os produtos com o título existente
        if (title !== "N/A") {
          products.push({
            title,
            rating,
            reviews,
            imageUrl,
          });
        }
      } catch (error) {
        console.error("Erro ao extrair dados de um produto:", error);
      }
    });

    return products;
  } catch (error) {
    console.error("Erro ao fazer scraping da Amazon:", error);
    throw error;
  }
}

// API endpoint para scraping
app.get("/api/scrape", async (req: Request, res: Response): Promise<any> => {
  try {
    const keyword = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ error: "Parametro 'keyword' é necessário" });
    }

    const products: Product[] = await scrapeAmazon(keyword);
    return res.json({ products });
  } catch (error) {
    console.error("Erro no endpoint /api/scrape:", error);
    return res.status(500).json({ error: "Falha ao fazer scraping da Amazon" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Serividor rodando em http://localhost:${PORT}`);
});

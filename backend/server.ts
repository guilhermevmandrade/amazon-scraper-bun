import express, { type NextFunction, type Request, type Response } from "express";
import { scrapeAmazon, type Product } from "./scraper";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use((req: Request, res: Response, next: NextFunction): any => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Permite que o navegador continue com a requisição
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

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
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

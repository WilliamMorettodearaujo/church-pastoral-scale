import "dotenv/config";
import { app } from "./app";

const PORT = 3335 || process.env.PORT;

app.listen(PORT, () => console.log(`Api running port ${PORT}`));

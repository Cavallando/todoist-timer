import { app } from "app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () =>
  console.log(`⏰ Todoist Timer Integration server running on port: ${PORT}`)
);

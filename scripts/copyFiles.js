import fs from "fs-extra";

// Копируем нужные папки в dist/
fs.copySync("adminlte", "dist/adminlte");
fs.copySync("plugins", "dist/plugins");

console.log("📂 Файлы успешно скопированы!");

import { PoopEntry } from "@/app"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "poop-data.json")

export function readEntries(): PoopEntry[] {
  console.log("📖 Lecture du fichier:", DATA_FILE)

  if (!fs.existsSync(DATA_FILE)) {
    console.log("📄 Fichier n'existe pas, création d'un tableau vide")
    return []
  }

  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8")
    const entries = JSON.parse(data)
    console.log("✅ Fichier lu avec succès, entries:", entries.length)
    return entries
  } catch (error) {
    console.error("💥 Erreur lecture fichier:", error)
    return []
  }
}

export function writeEntries(entries: PoopEntry[]) {
  console.log("💾 Écriture dans le fichier:", DATA_FILE)
  console.log("📊 Nombre d'entries à sauvegarder:", entries.length)

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2))
    console.log("✅ Fichier sauvegardé avec succès")
  } catch (error) {
    console.error("💥 Erreur écriture fichier:", error)
    throw error
  }
}

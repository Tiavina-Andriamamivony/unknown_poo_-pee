import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { readEntries, writeEntries } from "@/lib/data"
import { PoopEntry } from "@/app"


export async function GET() {
  console.log("🔍 API GET /api/entries - Début")

  try {
    const { userId } = await auth()
    console.log("👤 User ID:", userId)

    if (!userId) {
      console.log("❌ Utilisateur non authentifié")
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const allEntries = readEntries()
    console.log("📊 Total entries dans le fichier:", allEntries.length)

    const userEntries = allEntries.filter((entry) => entry.userId === userId)
    console.log("📊 Entries pour cet utilisateur:", userEntries.length)

    console.log("✅ API GET /api/entries - Succès")
    return NextResponse.json(userEntries)
  } catch (error) {
    console.error("💥 Erreur dans GET /api/entries:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("🔍 API POST /api/entries - Début")

  try {
    const { userId } = await auth()
    console.log("👤 User ID:", userId)

    if (!userId) {
      console.log("❌ Utilisateur non authentifié")
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    console.log("📝 Body reçu:", body)

    const { type } = body

    if (!type) {
      console.log("❌ Type manquant")
      return NextResponse.json({ error: "Type requis" }, { status: 400 })
    }

    const newEntry: PoopEntry = {
      id: Date.now().toString(),
      userId,
      type,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }

    console.log("🆕 Nouvelle entrée créée:", newEntry)

    const entries = readEntries()
    console.log("📊 Entries existantes:", entries.length)

    entries.push(newEntry)
    writeEntries(entries)

    console.log("💾 Entrée sauvegardée")
    console.log("✅ API POST /api/entries - Succès")

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error("💥 Erreur dans POST /api/entries:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// Ajouter support pour OPTIONS (CORS)
export async function OPTIONS() {
  console.log("🔍 API OPTIONS /api/entries")
  return new NextResponse(null, { status: 200 })
}

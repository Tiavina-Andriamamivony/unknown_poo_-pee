import { type NextRequest, NextResponse } from "next/server"

// Version ultra-simple sans Clerk pour tester
export async function GET() {
  console.log("🔥 ENTRIES GET - Début")

  try {
    // Test sans authentification d'abord
    const testData = [
      {
        id: "test1",
        userId: "test-user",
        type: "dur",
        date: "2024-01-01",
        createdAt: new Date().toISOString(),
      },
    ]

    console.log("🔥 ENTRIES GET - Retour données test")
    return NextResponse.json(testData)
  } catch (error) {
    console.error("💥 Erreur dans GET:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("🔥 ENTRIES POST - Début")

  try {
    const body = await request.json()
    console.log("🔥 Body reçu:", body)

    const newEntry = {
      id: Date.now().toString(),
      userId: "test-user",
      type: body.type || "dur",
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }

    console.log("🔥 ENTRIES POST - Nouvelle entrée:", newEntry)
    return NextResponse.json(newEntry)
  } catch (error) {
    console.error("💥 Erreur dans POST:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

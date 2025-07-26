import { NextResponse } from "next/server"

// Test simple sans Clerk d'abord
export async function GET() {
  console.log("🔥 TEST GET appelé")
  return NextResponse.json({ message: "GET fonctionne !" })
}

export async function POST() {
  console.log("🔥 TEST POST appelé")
  return NextResponse.json({ message: "POST fonctionne !" })
}

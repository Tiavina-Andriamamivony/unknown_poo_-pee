"use client"

import type React from "react"

import { useState } from "react"

export default function Home() {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const type = formData.get("type") as string

    console.log("🔥 Form submit - type:", type)

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })

      console.log("🔥 Response status:", response.status)

      const data = await response.json()
      setResult(`✅ ${response.status}: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      console.error("💥 Error:", error)
      setResult(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testGet = async () => {
    setLoading(true)
    console.log("🔥 Test GET")

    try {
      const response = await fetch("/api/entries")
      const data = await response.json()
      setResult(`✅ GET ${response.status}: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setResult(`❌ GET Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", fontFamily: "Arial, sans-serif" }}>
      <h1>🔥 Test Form API</h1>

      {/* Form de test */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc" }}>
        <h3>Ajouter une entrée</h3>

        <div style={{ marginBottom: "10px" }}>
          <label>Type de caca:</label>
          <select name="type" required style={{ marginLeft: "10px", padding: "5px" }}>
            <option value="">-- Choisir --</option>
            <option value="dur">🪨 Dur</option>
            <option value="smooth">🍫 Lisse</option>
            <option value="diarrhee">💧 Diarrhée</option>
            <option value="accouchement">👶 Accouchement</option>
            <option value="dysenterie">🌋 Dysenterie</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "⏳ Envoi..." : "📤 Envoyer"}
        </button>
      </form>

      {/* Bouton GET */}
      <button
        onClick={testGet}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          marginBottom: "20px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "⏳ Chargement..." : "📥 Charger les entrées"}
      </button>

      {/* Résultat */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "5px",
        }}
      >
        <strong>Résultat:</strong>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "12px",
            marginTop: "10px",
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          {result || "Aucun test effectué"}
        </pre>
      </div>

      {/* Info debug */}
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <p>
          💡 <strong>Instructions:</strong>
        </p>
        <ul>
          <li>1. Choisissez un type dans le formulaire et cliquez "Envoyer"</li>
          <li>2. Cliquez "Charger les entrées" pour voir toutes les entrées</li>
          <li>3. Ouvrez F12 pour voir les logs console</li>
          <li>4. Regardez le terminal de votre serveur Next.js</li>
        </ul>
      </div>
    </div>
  )
}

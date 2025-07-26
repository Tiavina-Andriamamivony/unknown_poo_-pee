# Documentation API - Poop Tracker

## Vue d'ensemble

Cette API permet de suivre et gérer les entrées de selles des utilisateurs avec authentification, système de streaks et badges.

**Base URL:** `http://localhost:3000/api`

---

## Authentification

L'API utilise **Clerk** pour l'authentification. Toutes les routes sont protégées et nécessitent un utilisateur connecté.

```javascript
// Headers requis
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <clerk-session-token>"
}
```

---

## Types de données

### PoopEntry

```typescript
interface PoopEntry {
  id: string              // ID unique de l'entrée
  userId: string          // ID utilisateur Clerk
  type: "dur" | "smooth" | "diarrhee" | "accouchement" | "dysenterie"
  date: string           // Format: "YYYY-MM-DD"
  createdAt: string      // ISO timestamp
}
```

### UserStats

```typescript
interface UserStats {
  userId: string
  currentStreak: number    // Streak actuel en jours
  longestStreak: number   // Plus long streak
  totalEntries: number    // Nombre total d'entrées
  badges: Badge[]         // Badges débloqués
  lastEntryDate?: string  // Date de la dernière entrée
}
```

### Badge

```typescript
interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string     // ISO timestamp
}
```

---

## ️ Endpoints

### 1. Récupérer les entrées

```plaintext
GET /api/entries
```

**Description:** Récupère toutes les entrées de l'utilisateur connecté

**Réponse:**

```json
[
  {
    "id": "1704123456789",
    "userId": "user_abc123",
    "type": "dur",
    "date": "2024-01-01",
    "createdAt": "2024-01-01T10:30:00.000Z"
  }
]
```

**Codes de statut:**

- `200` - Succès
- `401` - Non autorisé
- `500` - Erreur serveur


---

### 2. Créer une entrée

```plaintext
POST /api/entries
```

**Body:**

```json
{
  "type": "dur"
}
```

**Types disponibles:**

- `"dur"` - 🪨 Dur
- `"smooth"` - 🍫 Lisse
- `"diarrhee"` - 💧 Diarrhée
- `"accouchement"` - 👶 Accouchement
- `"dysenterie"` - 🌋 Dysenterie


**Réponse:**

```json
{
  "id": "1704123456790",
  "userId": "user_abc123",
  "type": "dur",
  "date": "2024-01-01",
  "createdAt": "2024-01-01T10:30:00.000Z"
}
```

**Codes de statut:**

- `200` - Entrée créée
- `400` - Type manquant ou invalide
- `401` - Non autorisé
- `500` - Erreur serveur


---

### 3. Modifier une entrée

```plaintext
PUT /api/entries/[id]
```

**Body:**

```json
{
  "type": "smooth",
  "date": "2024-01-02"
}
```

**Réponse:**

```json
{
  "entry": {
    "id": "1704123456789",
    "userId": "user_abc123",
    "type": "smooth",
    "date": "2024-01-02",
    "createdAt": "2024-01-01T10:30:00.000Z"
  },
  "stats": {
    "userId": "user_abc123",
    "currentStreak": 5,
    "longestStreak": 10,
    "totalEntries": 25,
    "badges": []
  }
}
```

---

### 4. Supprimer une entrée

```plaintext
DELETE /api/entries/[id]
```

**Réponse:**

```json
{
  "message": "Entry deleted successfully",
  "stats": {
    "userId": "user_abc123",
    "currentStreak": 4,
    "longestStreak": 10,
    "totalEntries": 24,
    "badges": []
  }
}
```

---

### 5. Statistiques utilisateur

```plaintext
GET /api/stats
```

**Réponse:**

```json
{
  "userId": "user_abc123",
  "currentStreak": 5,
  "longestStreak": 15,
  "totalEntries": 42,
  "badges": [
    {
      "id": "regulier",
      "name": "Régulier",
      "description": "Streak de 7 jours",
      "icon": "📅",
      "unlockedAt": "2024-01-01T10:30:00.000Z"
    }
  ],
  "lastEntryDate": "2024-01-01"
}
```

---

### 6. Classement

```plaintext
GET /api/leaderboard
```

**Réponse:**

```json
[
  {
    "rank": 1,
    "userId": "user_abc123",
    "currentStreak": 15,
    "longestStreak": 30,
    "totalEntries": 100,
    "badgeCount": 3
  }
]
```

---

## Système de badges

### Badges disponibles

| Badge | ID | Condition | Icon
|-----|-----|-----|-----
| **Bilharziose** | `bilharziose` | 50+ entrées | 🦠
| **Constipation** | `constipation` | 10+ entrées "dur" | 🚫
| **Régulier** | `regulier` | Streak de 7 jours | 📅
| **Champion** | `champion` | Streak de 30 jours | 🏆
| **Diversité** | `diversite` | Tous les 5 types expérimentés | 🌈


---

## Calcul des streaks

- **Streak actuel:** Nombre de jours consécutifs avec au moins une entrée
- **Streak le plus long:** Record historique de jours consécutifs
- **Règles:**

- Une entrée par jour suffit pour maintenir le streak
- Le streak se remet à 0 si aucune entrée pendant 2 jours
- Les badges se débloquent automatiquement





---

## Stockage des données

Les données sont stockées dans un fichier JSON local :

```plaintext
/poop-data.json
```

**Structure:**

```json
{
  "entries": [
    {
      "id": "1704123456789",
      "userId": "user_abc123",
      "type": "dur",
      "date": "2024-01-01",
      "createdAt": "2024-01-01T10:30:00.000Z"
    }
  ],
  "userStats": [
    {
      "userId": "user_abc123",
      "currentStreak": 5,
      "longestStreak": 15,
      "totalEntries": 42,
      "badges": [],
      "lastEntryDate": "2024-01-01"
    }
  ]
}
```

---

## Gestion d'erreurs

### Codes d'erreur courants

| Code | Description | Solution
|-----|-----|-----|-----
| `401` | Non autorisé | Vérifier l'authentification Clerk
| `404` | Entrée non trouvée | Vérifier l'ID de l'entrée
| `405` | Méthode non autorisée | Vérifier la méthode HTTP
| `500` | Erreur serveur | Vérifier les logs serveur


### Format des erreurs

```json
{
  "error": "Description de l'erreur"
}
```

---

## Configuration

### Variables d'environnement

```plaintext
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Middleware

Le middleware protège toutes les routes API et vérifie l'authentification Clerk automatiquement.

---

## Exemples d'utilisation

### JavaScript/Fetch

```javascript
// Ajouter une entrée
const response = await fetch('/api/entries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ type: 'dur' })
})

const newEntry = await response.json()
```

### cURL

```shellscript
# GET entries
curl -X GET http://localhost:3000/api/entries \
  -H "Content-Type: application/json"

# POST new entry  
curl -X POST http://localhost:3000/api/entries \
  -H "Content-Type: application/json" \
  -d '{"type": "dur"}'
```

---

## Déploiement

1. **Vercel** (recommandé)
2. **Railway**
3. **Netlify**


⚠️ **Note:** Le fichier JSON sera recréé à chaque déploiement. Pour la production, utilisez une vraie base de données.

---

## Support

Pour toute question ou problème :

- Vérifiez les logs dans la console du navigateur
- Consultez les logs du serveur Next.js
- Vérifiez que Clerk est bien configuré


SuggestionsClose suggestions[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}Add IntegrationAjouter exemples PostmanGuide de déploiementTests automatisésSwagger/OpenAPIRate limitingScroll leftScroll right
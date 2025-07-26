# 💩 API de Suivi de Selles

Une API simple pour tracker et analyser vos habitudes intestinales avec Next.js App Router.

## 🚀 Installation

\`\`\`bash
# Cloner le projet
git clone votre-repo
cd poop-tracker

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
\`\`\`

## 🔧 Configuration

### Variables d'environnement

\`\`\`env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
\`\`\`

### Structure des fichiers

\`\`\`
app/
├── api/
│   ├── entries/
│   │   └── route.ts          # CRUD des entrées
│   ├── stats/
│   │   └── route.ts          # Statistiques utilisateur
│   └── leaderboard/
│       └── route.ts          # Classement
├── page.tsx                  # Interface utilisateur
└── layout.tsx               # Configuration Clerk
lib/
└── data.ts                  # Gestion du fichier JSON
types/
└── index.ts                 # Types TypeScript
poop-data.json              # Stockage des données (créé automatiquement)
\`\`\`

## 📊 Types de Données

### PoopEntry
\`\`\`typescript
interface PoopEntry {
  id: string                    // ID unique (timestamp)
  userId: string               // ID utilisateur Clerk
  type: "dur" | "smooth" | "diarrhee" | "accouchement" | "dysenterie"
  date: string                 // Format YYYY-MM-DD
  createdAt: string           // ISO timestamp
}
\`\`\`

### UserStats
\`\`\`typescript
interface UserStats {
  userId: string
  currentStreak: number        // Streak actuel en jours
  longestStreak: number       // Plus long streak
  totalEntries: number        // Nombre total d'entrées
  badges: Badge[]             // Badges débloqués
  lastEntryDate?: string      // Dernière entrée
}
\`\`\`

### Badge
\`\`\`typescript
interface Badge {
  id: string                  // ID unique du badge
  name: string               // Nom affiché
  description: string        // Description
  icon: string              // Emoji
  unlockedAt: string        // Date de déblocage
}
\`\`\`

## 🛠 Endpoints API

### 📝 Entrées - `/api/entries`

#### GET - Récupérer les entrées
```http
GET /api/entries
Authorization: Clerk session required

export interface PoopEntry {
    id: string
    userId: string
    type: "dur" | "smooth" | "diarrhee" | "accouchement" | "dysenterie"
    date: string
    createdAt: string
  }
  
  export interface UserStats {
    userId: string
    currentStreak: number
    longestStreak: number
    totalEntries: number
    badges: Badge[]
    lastEntryDate?: string
  }
  
  export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    unlockedAt: string
  }
  
  export interface AppData {
    entries: PoopEntry[]
    userStats: UserStats[]
  }
  
  export const POOP_TYPES = {
    dur: "🪨 Dur",
    smooth: "🍫 Lisse",
    diarrhee: "💧 Diarrhée",
    accouchement: "👶 Accouchement",
    dysenterie: "🌋 Dysenterie",
  }
  
  export const AVAILABLE_BADGES = [
    {
      id: "bilharziose",
      name: "Bilharziose",
      description: "Survivant de la bilharziose",
      icon: "🦠",
      condition: (stats: UserStats, entries: PoopEntry[]) => stats.totalEntries >= 50,
    },
    {
      id: "constipation",
      name: "Constipation",
      description: "Maître de la constipation",
      icon: "🚫",
      condition: (stats: UserStats, entries: PoopEntry[]) => {
        const hardEntries = entries.filter((e) => e.userId === stats.userId && e.type === "dur")
        return hardEntries.length >= 10
      },
    },
    {
      id: "regulier",
      name: "Régulier",
      description: "Streak de 7 jours",
      icon: "📅",
      condition: (stats: UserStats) => stats.currentStreak >= 7,
    },
    {
      id: "champion",
      name: "Champion",
      description: "Streak de 30 jours",
      icon: "🏆",
      condition: (stats: UserStats) => stats.longestStreak >= 30,
    },
    {
      id: "diversite",
      name: "Diversité",
      description: "Tous les types expérimentés",
      icon: "🌈",
      condition: (stats: UserStats, entries: PoopEntry[]) => {
        const userEntries = entries.filter((e) => e.userId === stats.userId)
        const types = new Set(userEntries.map((e) => e.type))
        return types.size === 5
      },
    },
  ]
  
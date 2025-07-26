import fs from "fs"
import path from "path"
import { type AppData, type PoopEntry, type UserStats, type Badge, AVAILABLE_BADGES } from "@/app"

const DATA_FILE = path.join(process.cwd(), "data", "poop-data.json")

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Initialize empty data structure
const getEmptyData = (): AppData => ({
  entries: [],
  userStats: [],
})

// Read data from JSON file
export const readData = (): AppData => {
  ensureDataDir()

  if (!fs.existsSync(DATA_FILE)) {
    const emptyData = getEmptyData()
    writeData(emptyData)
    return emptyData
  }

  try {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading data file:", error)
    return getEmptyData()
  }
}

// Write data to JSON file
export const writeData = (data: AppData): void => {
  ensureDataDir()

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error writing data file:", error)
    throw new Error("Failed to save data")
  }
}

// Calculate streak for a user
export const calculateStreak = (entries: PoopEntry[], userId: string): { current: number; longest: number } => {
  const userEntries = entries
    .filter((e) => e.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (userEntries.length === 0) {
    return { current: 0, longest: 0 }
  }

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1

  const today = new Date()
  const lastEntryDate = new Date(userEntries[0].date)

  // Check if last entry was today or yesterday
  const daysDiff = Math.floor((today.getTime() - lastEntryDate.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff <= 1) {
    currentStreak = 1

    // Calculate current streak
    for (let i = 1; i < userEntries.length; i++) {
      const currentDate = new Date(userEntries[i - 1].date)
      const prevDate = new Date(userEntries[i].date)
      const diff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diff === 1) {
        currentStreak++
      } else {
        break
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < userEntries.length; i++) {
    const currentDate = new Date(userEntries[i - 1].date)
    const prevDate = new Date(userEntries[i].date)
    const diff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diff === 1) {
      tempStreak++
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

  return { current: currentStreak, longest: longestStreak }
}

// Update user stats and badges
export const updateUserStats = (data: AppData, userId: string): UserStats => {
  const userEntries = data.entries.filter((e) => e.userId === userId)
  const streaks = calculateStreak(data.entries, userId)

  let userStats = data.userStats.find((s) => s.userId === userId)

  if (!userStats) {
    userStats = {
      userId,
      currentStreak: 0,
      longestStreak: 0,
      totalEntries: 0,
      badges: [],
      lastEntryDate: undefined,
    }
    data.userStats.push(userStats)
  }

  userStats.currentStreak = streaks.current
  userStats.longestStreak = streaks.longest
  userStats.totalEntries = userEntries.length
  userStats.lastEntryDate = userEntries.length > 0 ? userEntries[userEntries.length - 1].date : undefined

  // Check for new badges
  const currentBadgeIds = userStats.badges.map((b) => b.id)

  AVAILABLE_BADGES.forEach((badgeTemplate) => {
    if (!currentBadgeIds.includes(badgeTemplate.id) && badgeTemplate.condition(userStats!, data.entries)) {
      const newBadge: Badge = {
        id: badgeTemplate.id,
        name: badgeTemplate.name,
        description: badgeTemplate.description,
        icon: badgeTemplate.icon,
        unlockedAt: new Date().toISOString(),
      }
      userStats!.badges.push(newBadge)
    }
  })

  return userStats
}

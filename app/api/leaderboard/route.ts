import { readData } from "@/lib/data-manager"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = readData()

    // Sort users by current streak (descending)
    const leaderboard = data.userStats
      .sort((a, b) => b.currentStreak - a.currentStreak)
      .slice(0, 10) // Top 10
      .map((stats, index) => ({
        rank: index + 1,
        userId: stats.userId,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        totalEntries: stats.totalEntries,
        badgeCount: stats.badges.length,
      }))

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

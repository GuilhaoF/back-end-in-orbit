import { db } from '../db'
import { goals } from '../db/schema'
import type { GoalRequestType } from '../types/goal-request-type'

export async function createGoal(request: GoalRequestType) {
  const result = await db
    .insert(goals)
    .values({
      title: request.title,
      desiredWeeklyFrequency: request.desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}

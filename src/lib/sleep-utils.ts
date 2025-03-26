export function calculateWakeUpTimes() {
  const now = new Date()
  // Add 14 minutes to account for average time to fall asleep
  now.setMinutes(now.getMinutes() + 14)

  // Calculate wake up times for power nap, 1, 2, 3, 4, and 5 sleep cycles
  // Power nap: 20 min, Regular cycles: 90 min each
  return [
    { minutes: 20, type: "nap", priority: "high" }, // Power nap
    { cycles: 1, type: "siesta", priority: "high" }, // 1 cycle (90 min)
    { cycles: 5, type: "good", priority: "high" }, // 5 cycles
    { cycles: 6, type: "optimal", priority: "high" }, // 6 cycles
    { cycles: 3, type: "short", priority: "low" }, // 3 cycles
    { cycles: 4, type: "medium", priority: "low" }, // 4 cycles
  ].map((option) => {
    const wakeTime = new Date(now.getTime())
    if (option.minutes) {
      wakeTime.setMinutes(wakeTime.getMinutes() + option.minutes)
    } else if (option.cycles) {
      wakeTime.setMinutes(wakeTime.getMinutes() + option.cycles * 90)
    }
    return {
      time: wakeTime,
      type: option.type,
      priority: option.priority as "high" | "low",
    }
  })
}

export function calculateSleepTimes(wakeUpTime: Date) {
  // Calculate bedtimes for power nap, 1, 2, 3, 4, and 5 sleep cycles before wake up time
  return [
    { minutes: 20, type: "nap", priority: "high" }, // Power nap
    { cycles: 1, type: "siesta", priority: "high" }, // 1 cycle (90 min)
    { cycles: 5, type: "good", priority: "high" }, // 5 cycles
    { cycles: 6, type: "optimal", priority: "high" }, // 6 cycles
    { cycles: 3, type: "short", priority: "low" }, // 3 cycles
    { cycles: 4, type: "medium", priority: "low" }, // 4 cycles
  ].map((option) => {
    const bedTime = new Date(wakeUpTime.getTime())
    if (option.minutes) {
      bedTime.setMinutes(bedTime.getMinutes() - option.minutes - 14) // 14 min to fall asleep
    } else if (option.cycles) {
      bedTime.setMinutes(bedTime.getMinutes() - option.cycles * 90 - 14) // 14 min to fall asleep
    }
    return {
      time: bedTime,
      type: option.type,
      priority: option.priority as "high" | "low",
    }
  })
}


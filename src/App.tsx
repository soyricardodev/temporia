import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SleepCalculator } from "@/components/sleep-calculator"
import { SleepResults } from "@/components/sleep-results"
import { MoonIcon } from "lucide-react"
import { calculateSleepTimes, calculateWakeUpTimes } from "@/lib/sleep-utils"

export default function App() {
  const [selectedTab, setSelectedTab] = useState("sleep-now")
  const [wakeUpTime, setWakeUpTime] = useState<Date | null>(null)
  const [calculatedTimes, setCalculatedTimes] = useState<Array<{ time: Date; type: string; priority: "high" | "low" }>>(
    [],
  )

  const handleCalculateSleepNow = () => {
    setCalculatedTimes(calculateWakeUpTimes())
  }

  const handleCalculateWakeUp = () => {
    if (!wakeUpTime) return
    setCalculatedTimes(calculateSleepTimes(wakeUpTime))
  }

  return (
    <main
      className="min-h-screen p-4 md:p-6 font-sans">
      <div className="max-w-md mx-auto">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
            <MoonIcon className="h-6 w-6 text-indigo-400" />
            Calculadora de Ciclos de Sueño
          </h1>
          <p className="text-zinc-400 text-sm">Optimiza tu horario de sueño basado en ciclos de sueño</p>
        </motion.div>

        <SleepCalculator
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          wakeUpTime={wakeUpTime}
          onWakeUpTimeChange={setWakeUpTime}
          onCalculateSleepNow={handleCalculateSleepNow}
          onCalculateWakeUp={handleCalculateWakeUp}
        />

        <AnimatePresence mode="wait">
          {calculatedTimes.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <SleepResults times={calculatedTimes} type={selectedTab === "sleep-now" ? "wakeup" : "sleep"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}


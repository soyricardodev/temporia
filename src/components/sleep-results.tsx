import { motion } from "framer-motion"
import { SleepCard } from "./sleep-card"
import { SunIcon, MoonIcon } from "lucide-react"

interface SleepResultsProps {
  times: Array<{ time: Date; type: string; priority: "high" | "low" }>
  type: "wakeup" | "sleep"
}

export function SleepResults({ times, type }: SleepResultsProps) {
  // Filter times by priority
  const highPriorityTimes = times.filter((time) => time.priority === "high")
  const lowPriorityTimes = times.filter((time) => time.priority === "low")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <div className="bg-zinc-900/80 rounded-lg p-4 backdrop-blur-sm">
      <motion.h3
        className="text-lg font-medium text-white flex items-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {type === "wakeup" ? (
          <>
            <SunIcon className="h-5 w-5 text-yellow-400" />
            Horarios Recomendados para Despertar
          </>
        ) : (
          <>
            <MoonIcon className="h-5 w-5 text-indigo-400" />
            Horarios Recomendados para Dormir
          </>
        )}
      </motion.h3>

      {/* High priority recommendations */}
      <motion.div className="grid gap-2" variants={containerVariants} initial="hidden" animate="visible">
        {highPriorityTimes.map((item, index) => (
          <SleepCard key={index} time={item.time} type={item.type} index={index} />
        ))}
      </motion.div>

      {/* Low priority section */}
      {lowPriorityTimes.length > 0 && (
        <>
          <motion.h4
            className="text-sm font-medium text-zinc-500 mt-5 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Otras opciones
          </motion.h4>

          <motion.div className="grid gap-2" variants={containerVariants} initial="hidden" animate="visible">
            {lowPriorityTimes.map((item, index) => (
              <SleepCard
                key={index}
                time={item.time}
                type={item.type}
                index={index + highPriorityTimes.length}
                isLowPriority
              />
            ))}
          </motion.div>
        </>
      )}

      <motion.p
        className="text-xs text-zinc-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        Los ciclos de sueño típicamente duran 90 minutos. Despertar entre ciclos ayuda a sentirse más descansado.
      </motion.p>
    </div>
  )
}


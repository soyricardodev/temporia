import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, BatteryMedium, BatteryLow, BatteryFull, Coffee, Zap } from "lucide-react"

interface SleepCardProps {
  time: Date
  type: string
  index: number
  isLowPriority?: boolean
}

export function SleepCard({ time, type, index, isLowPriority = false }: SleepCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getSleepInfo = (sleepType: string) => {
    switch (sleepType) {
      case "nap":
        return {
          icon: <Coffee className="h-4 w-4 text-orange-400" />,
          label: "Siesta Corta",
          color: "bg-orange-900 text-orange-300",
          duration: "20 min",
          description: "Descanso rápido",
        }
      case "siesta":
        return {
          icon: <Zap className="h-4 w-4 text-yellow-400" />,
          label: "Siesta",
          color: "bg-yellow-900 text-yellow-300",
          duration: "90 min",
          description: "Un ciclo completo",
        }
      case "short":
        return {
          icon: <BatteryLow className="h-4 w-4 text-blue-400" />,
          label: "Corto",
          color: "bg-blue-900 text-blue-300",
          duration: "4.5 horas",
          description: "Mínimo recomendado",
        }
      case "medium":
        return {
          icon: <BatteryMedium className="h-4 w-4 text-green-400" />,
          label: "Medio",
          color: "bg-green-900 text-green-300",
          duration: "6 horas",
          description: "Mejor descanso",
        }
      case "good":
        return {
          icon: <Battery className="h-4 w-4 text-purple-400" />,
          label: "Bueno",
          color: "bg-purple-900 text-purple-300",
          duration: "7.5 horas",
          description: "Recomendado para adultos",
        }
      case "optimal":
        return {
          icon: <BatteryFull className="h-4 w-4 text-indigo-400" />,
          label: "Óptimo",
          color: "bg-indigo-900 text-indigo-300",
          duration: "9 horas",
          description: "Descanso completo",
        }
      default:
        return {
          icon: <Battery className="h-4 w-4" />,
          label: "Desconocido",
          color: "bg-zinc-800 text-zinc-300",
          duration: "Desconocido",
          description: "",
        }
    }
  }

  const info = getSleepInfo(type)

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.08,
      },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card
        className={`p-3 ${isLowPriority ? "bg-zinc-800/60" : "bg-zinc-800"} border-zinc-700 hover:bg-zinc-750 transition-colors`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">{formatTime(time)}</span>
            <span className="text-xs text-zinc-400">
              {info.duration} - {info.description}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`flex items-center gap-1 ${info.color}`}>
              {info.icon}
              {info.label}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}


import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TimePicker } from "@/components/time-picker"
import { MoonIcon, SunIcon } from "lucide-react"

interface SleepCalculatorProps {
  selectedTab: string
  onTabChange: (tab: string) => void
  wakeUpTime: Date | null
  onWakeUpTimeChange: (date: Date | null) => void
  onCalculateSleepNow: () => void
  onCalculateWakeUp: () => void
}

export function SleepCalculator({
  selectedTab,
  onTabChange,
  wakeUpTime,
  onWakeUpTimeChange,
  onCalculateSleepNow,
  onCalculateWakeUp,
}: SleepCalculatorProps) {
  return (
    <div className="bg-zinc-900/80 rounded-lg p-4 backdrop-blur-sm">
      <Tabs defaultValue="sleep-now" className="w-full" value={selectedTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800/90">
          <TabsTrigger value="sleep-now" className="data-[state=active]:bg-indigo-600">
            <MoonIcon className="h-4 w-4 mr-2" />
            Dormir Ahora
          </TabsTrigger>
          <TabsTrigger value="wake-up" className="data-[state=active]:bg-indigo-600">
            <SunIcon className="h-4 w-4 mr-2" />
            Hora de Despertar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sleep-now" className="mt-4">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-300 text-center text-sm">
              Si te duermes ahora, estos son los mejores momentos para despertar
            </p>
            <Button
              onClick={onCalculateSleepNow}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Calcular Horas de Despertar
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="wake-up" className="mt-4">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-300 text-center text-sm mb-2">
              Si quieres despertar a una hora específica, selecciónala abajo
            </p>
            <TimePicker onChange={onWakeUpTimeChange} value={wakeUpTime} />
            <Button
              onClick={onCalculateWakeUp}
              disabled={!wakeUpTime}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors mt-4"
            >
              Calcular Horas de Dormir
            </Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


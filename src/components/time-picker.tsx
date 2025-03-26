import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  onChange: (date: Date | null) => void
  value: Date | null
}

export function TimePicker({ onChange, value }: TimePickerProps) {
  const [hours, setHours] = useState<string>("12")
  const [minutes, setMinutes] = useState<string>("00")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")

  // Generate hours options (1-12)
  const hoursOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1
    return hour.toString()
  })

  // Generate minutes options (00-55, step 5)
  const minutesOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5
    return minute.toString().padStart(2, "0")
  })

  useEffect(() => {
    if (value) {
      const h = value.getHours() % 12 || 12
      const m = value.getMinutes()
      // Round minutes to nearest 5
      const roundedMinutes = Math.round(m / 5) * 5
      const p = value.getHours() >= 12 ? "PM" : "AM"

      setHours(h.toString())
      setMinutes(roundedMinutes.toString().padStart(2, "0"))
      setPeriod(p)
    } else {
      // Set default to current time
      const now = new Date()
      const h = now.getHours() % 12 || 12
      const m = now.getMinutes()
      // Round minutes to nearest 5
      const roundedMinutes = Math.round(m / 5) * 5
      const p = now.getHours() >= 12 ? "PM" : "AM"

      setHours(h.toString())
      setMinutes(roundedMinutes.toString().padStart(2, "0"))
      setPeriod(p)

      // Update parent with current time
      updateTime(h.toString(), roundedMinutes.toString().padStart(2, "0"), p)
    }
  }, [value])

  const updateTime = (h: string, m: string, p: "AM" | "PM") => {
    const date = new Date()
    let hour = Number.parseInt(h)

    if (p === "PM" && hour !== 12) {
      hour += 12
    } else if (p === "AM" && hour === 12) {
      hour = 0
    }

    date.setHours(hour)
    date.setMinutes(Number.parseInt(m))
    date.setSeconds(0)
    date.setMilliseconds(0)

    onChange(date)
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center justify-between">
        <Label className="text-zinc-400 text-sm">Hora</Label>
        <Clock className="h-4 w-4 text-indigo-400" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Hours selector */}
        <Select
          value={hours}
          onValueChange={(value) => {
            setHours(value)
            updateTime(value, minutes, period)
          }}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="Hora" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            {hoursOptions.map((hour) => (
              <SelectItem key={hour} value={hour} className="text-white hover:bg-zinc-700">
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minutes selector */}
        <Select
          value={minutes}
          onValueChange={(value) => {
            setMinutes(value)
            updateTime(hours, value, period)
          }}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="Min" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            {minutesOptions.map((minute) => (
              <SelectItem key={minute} value={minute} className="text-white hover:bg-zinc-700">
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* AM/PM selector */}
        <Select
          value={period}
          onValueChange={(value: "AM" | "PM") => {
            setPeriod(value)
            updateTime(hours, minutes, value)
          }}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="AM/PM" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="AM" className="text-white hover:bg-zinc-700">
              AM
            </SelectItem>
            <SelectItem value="PM" className="text-white hover:bg-zinc-700">
              PM
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center mt-2">
        <div className="text-lg font-medium text-indigo-400">
          {hours}:{minutes} {period}
        </div>
      </div>
    </div>
  )
}


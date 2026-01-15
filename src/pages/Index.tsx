import { useState, useEffect } from "react"
import { Mail, Send, Github, Twitter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const COUNTDOWN_LABELS: Record<keyof CountdownState, string> = {
  days: "Дней",
  hours: "Часов",
  minutes: "Минут",
  seconds: "Секунд"
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Скоро <span className="text-primary">запуск</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Мы готовим что-то особенное. Оставьте свой email, чтобы узнать первыми о старте.
        </p>

        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          {(Object.entries(countdown) as [keyof CountdownState, number][]).map(([unit, value]) => (
            <Card key={unit} className="p-4 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-xs text-muted-foreground">{COUNTDOWN_LABELS[unit]}</span>
            </Card>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit" className="whitespace-nowrap">
              Уведомить меня <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          {isSubmitted && (
            <p className="mt-2 text-sm text-green-600">
              Спасибо! Мы сообщим вам о запуске.
            </p>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Send className="h-6 w-6" />
            <span className="sr-only">Telegram</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

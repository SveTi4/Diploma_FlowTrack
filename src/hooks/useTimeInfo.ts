import { format, differenceInDays, differenceInHours } from 'date-fns'
import { ru } from 'date-fns/locale'

interface TimeInfo {
  formattedDate: string
  timeLeft: string | null
  timeIcon: string
  isExpired: boolean
}

const getDaysWord = (days: number): string => {
  const lastDigit = days % 10
  const lastTwoDigits = days % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней'
  if (lastDigit === 1) return 'день'
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
  return 'дней'
}

const getHoursWord = (hours: number): string => {
  const lastDigit = hours % 10
  const lastTwoDigits = hours % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'часов'
  if (lastDigit === 1) return 'час'
  if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
  return 'часов'
}

export const useTimeInfo = (deadline: string | null): TimeInfo => {
  const isExpired = deadline ? new Date(deadline) < new Date() : false
  
  const formattedDate = deadline 
    ? format(new Date(deadline), 'd MMMM yyyy', { locale: ru })
    : 'Нет дедлайна'

  const getTimeLeft = (): string | null => {
    if (!deadline) return null
    
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = differenceInDays(deadlineDate, now)
    const hoursLeft = differenceInHours(deadlineDate, now)
    
    if (daysLeft < 0) return 'Просрочен'
    if (daysLeft === 0) {
      if (hoursLeft < 0) return 'Просрочен'
      if (hoursLeft === 0) return 'Сейчас'
      return `Осталось ${hoursLeft} ${getHoursWord(hoursLeft)}`
    }
    if (daysLeft === 1) return 'Завтра'
    return `Осталось ${daysLeft} ${getDaysWord(daysLeft)}`
  }

  const getTimeIcon = (): string => {
    if (!deadline) return '∞'
    
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const daysLeft = differenceInDays(deadlineDate, now)
    
    if (daysLeft < 0) return '!'
    if (daysLeft === 0) return '0'
    if (daysLeft === 1) return '1'
    return daysLeft > 99 ? '99+' : daysLeft.toString()
  }

  return {
    formattedDate,
    timeLeft: getTimeLeft(),
    timeIcon: getTimeIcon(),
    isExpired
  }
} 
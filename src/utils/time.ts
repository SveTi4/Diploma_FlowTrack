export const getTimeLeft = (deadline: string | null): string => {
  if (!deadline) return 'Дедлайн не установлен'
  
  const deadlineDate = new Date(deadline)
  const now = new Date()
  
  if (deadlineDate < now) return 'Срок истек'
  
  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Осталось менее дня'
  if (diffDays === 1) return 'Остался 1 день'
  if (diffDays < 7) return `Осталось ${diffDays} дня`
  if (diffDays < 30) return `Осталось ${Math.ceil(diffDays / 7)} недели`
  
  return `Осталось ${Math.ceil(diffDays / 30)} месяца`
} 
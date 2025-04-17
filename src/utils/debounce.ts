export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastCall = 0

  return ((...args: Parameters<T>) => {
    const now = Date.now()

    if (timeout) {
      clearTimeout(timeout)
    }

    if (now - lastCall >= wait) {
      lastCall = now
      return func(...args)
    }

    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        lastCall = Date.now()
        resolve(func(...args))
      }, wait - (now - lastCall))
    })
  }) as T
} 
import { format as fnsFormat } from 'date-fns'
import { ru } from 'date-fns/locale'

/**
 * Форматирует дату в формате ISO в локальный формат
 * @param date - дата в формате ISO или null
 * @param format - формат вывода даты
 * @param placeholder - текст, который будет показан, если дата невалидна
 * @returns отформатированная дата или placeholder
 */
export const formatDate = (
  date: string | null,
  format: 'full' | 'short1' | 'short2' = 'full',
  placeholder: string = 'Не указано'
): string => {
  if (!date) return placeholder;

  try {
    const dateObj = new Date(date);
    
    switch (format) {
      case 'full':
        return fnsFormat(dateObj, 'd MMMM yyyy, HH:mm', { locale: ru });
      case 'short1':
        return fnsFormat(dateObj, 'd MMMM yyyy', { locale: ru });
      case 'short2':
        return fnsFormat(dateObj, 'd.MM.yyyy в HH:mm', { locale: ru });
      default:
        return placeholder;
    }
  } catch (e) {
    return placeholder;
  }
}; 
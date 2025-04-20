import { EmptyState } from '../../components/atoms/EmptyState/EmptyState'
import { StatusText } from '../../components/atoms/StatusText/StatusText'
import { IconButton } from '../../components/atoms/IconButton/IconButton'

// Заменить LoadingText на:
<StatusText type="loading" text="Загрузка..." />

// Заменить ErrorText на:
<StatusText type="error" text={error} />

// Заменить EmptyState на:
<EmptyState
  icon={<PlusIcon />}
  title="Нет задач"
  description="Создайте первую задачу для этого проекта"
  buttonText="Добавить задачу"
  onButtonClick={handleAddTask}
  buttonIcon={<PlusIcon />}
/>

// Заменить кнопки с иконками на:
<IconButton
  icon={<PlusIcon />}
  onClick={handleAddTask}
  variant="primary"
  size="large"
/>

<IconButton
  icon={<XMarkIcon />}
  onClick={handleClose}
  variant="secondary"
  size="medium"
/> 
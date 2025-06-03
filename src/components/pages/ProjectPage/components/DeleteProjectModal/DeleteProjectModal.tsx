import React from 'react'
import { Modal } from '../../../../molecules'
import { Button } from '../../../../atoms'
import {
  Content,
  WarningText,
  WarningTitle,
  WarningDescription,
  WarningOptions,
  Option,
  OptionTitle,
  OptionDescription,
  Actions
} from './DeleteProjectModal.styles'

interface DeleteProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onArchive: () => void
  onDelete: () => void
  projectName: string
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  onArchive,
  onDelete,
  projectName
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удаление проекта"
    >
      <Content>
        <WarningText>
          <WarningTitle>Что вы хотите сделать с проектом "{projectName}"?</WarningTitle>
          <WarningDescription>
            У вас есть два варианта действий. Выберите наиболее подходящий для вас:
          </WarningDescription>
          
          <WarningOptions>
            <Option>
              <OptionTitle>Архивировать проект</OptionTitle>
              <OptionDescription>
                Проект будет скрыт из основного списка, но все данные сохранятся. 
                Вы сможете восстановить его в любой момент.
              </OptionDescription>
            </Option>
            
            <Option>
              <OptionTitle>Удалить проект навсегда</OptionTitle>
              <OptionDescription>
                Все данные проекта будут безвозвратно удалены. 
                Это действие нельзя будет отменить.
              </OptionDescription>
            </Option>
          </WarningOptions>
        </WarningText>

        <Actions>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="secondary" onClick={onArchive}>
            Архивировать
          </Button>
          <Button variant="secondary" onClick={onDelete}>
            Удалить
          </Button>
        </Actions>
      </Content>
    </Modal>
  )
} 
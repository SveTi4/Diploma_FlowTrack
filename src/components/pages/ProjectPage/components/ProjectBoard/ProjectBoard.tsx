import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ColumnsBoard } from '../../../../organisms/ColumnsBoard/ColumnsBoard'
import { AppDispatch } from '../../../../../store'
import { changeColumn, moveTask } from '../../../../../store/tasks/tasksSlice'
import { moveColumn } from '../../../../../store/columns/columnsSlice'

interface ProjectBoardProps {
  projectId: number
  dispatch: AppDispatch
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({ projectId, dispatch }) => {
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result

    if (type === 'column') {
      if (!destination || source.index === destination?.index) return
      
      await dispatch(moveColumn({
        id: Number(draggableId),
        position: Number(destination?.index) + 1
      }))
    } else {
      if (!destination) return

      if (source.droppableId === destination.droppableId) {
        if (source.index === destination.index) return
        
        await dispatch(moveTask({
          id: Number(draggableId),
          position: Number(destination.index),
          column_id: Number(source.droppableId)
        }))
        return
      }

      await dispatch(changeColumn({
        taskId: Number(draggableId),
        old_column_id: Number(source.droppableId),
        new_column_id: Number(destination.droppableId),
        position: Number(destination.index)
      }))
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ColumnsBoard project_id={projectId} />
    </DragDropContext>
  )
} 
# Работа с задачами

- Кликните по задаче для редактирования описания и дедлайна.
- Перетаскивайте задачи между колонками для смены статуса.
- Используйте чекбоксы для отслеживания выполнения подзадач.

```jsx

  return (
    <>
      <ProjectsHeader
        title={isArchive ? "Архив проектов" : "Мои проекты"}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
        isRefreshing={isRefreshing}
        showCreateButton={!isArchive}
      />

      <Content>
        <ProjectsListContent
          projects={projects}
          searchQuery={searchQuery}
          onCreateClick={() => setIsCreateModalOpen(true)}
          showCreateButton={!isArchive}
          isArchive={isArchive}
          onRestore={isArchive ? handleRestore : handleArchive}
          onDelete={handleDelete}
        />
      </Content>

      {!isArchive && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </>
  )
```
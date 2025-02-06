import React, { useEffect, useState } from 'react'
import ScrollToTop from '../components/ScrollToTop.tsx'
import Title from '../components/Title.tsx'
import Table from '../components/tables/Table.tsx'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/index.tsx'
import { addTask, editTask, getAllTasks, removeTask } from '../scripts/fetch.ts'
import { showFailedMessage, showSuccessMessage, } from '../scripts/utils.js'
import TaskFormModal from '../components/tables/TaskFormModal.tsx'
import ConfirmDeleteModal from '../components/tables/ConfirmDeleteModal.tsx'


const Tasks = () => {
  const location = useLocation();
  const { token, tasks, setTasks, } = useAppContext();

  const load = async () => {
    const res = await getAllTasks(token);
    setTasks(res);
    // console.log(res)
  }
  useEffect(() => {
    load();
  }, [location]);




  const [isEditing, setIsEditing] = useState(false);
  const [taskEditing, setTaskEditing] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddTask = () => {
    setIsEditing(false);
    setShowModal(true);
  }
  const handleEditTask = (task) => {
    setIsEditing(true);
    setTaskEditing(task);
    setShowModal(true);
  }
  const handleDeleteTask = (task) => {
    setTaskEditing(task);
    setShowDeleteModal(true);
  }
  const onAddTask = async (task) => {
    console.log(task);

    if (task) {
      const result = await addTask(task.task_name, task.description, task.task_reward, task.task_url, token);
      showSuccessMessage(result);
      load();
    } else {
      showFailedMessage('Task is invalid');
    }

  }
  const onEditTask = async (task) => {
    if (task) {
      const result = await editTask(task.task_id, task.task_name, task.description, task.task_reward, task.task_url, token);
      showSuccessMessage(result);
      load();
    } else {
      showFailedMessage('Task is invalid');
    }

  }
  const onDeleteTask = async (task) => {
    if (task) {
      const result = await removeTask(task.task_id, token);
      showSuccessMessage(result);
      load();
    } else {
      showFailedMessage('Task is invalid');
    }
  }




  const columns = [
    { name: 'task_id', label: 'ID', type: 'text' },
    { name: 'task_name', label: 'Task Name', type: 'text' },
    { name: 'task_reward', label: 'Reward', type: 'price' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'task_url', label: 'Task url', type: 'url' },
    { name: 'completion_count', label: 'Completed No', type: 'status', }

  ]
  const data = tasks;
  const actions = [
    { name: 'edit', icon: 'ri-edit-line', class: 'info-light', callback: handleEditTask },
    { name: 'delete', icon: 'ri-delete-bin-5-line', class: 'danger-light', callback: handleDeleteTask }
  ];

  return (
    <div className='h-full'>
      <TaskFormModal props={{ isEditing, taskEditing, showModal, setShowModal, onAddTask, onEditTask }} />
      <ConfirmDeleteModal props={{ item:taskEditing, showDeleteModal, setShowDeleteModal, callback:onDeleteTask }} />
      <div className='w-100 p-2 d-flex justify-content-between'>
        <Title title="TASKS" />
        <button onClick={() => handleAddTask()} className='btn btn-primary fw-bold w-auto h-100'>+ New Task</button>
      </div>
      <Table props={{ title: 'All tasks', columns: columns, data, actions: actions }} />
      <ScrollToTop />
    </div>
  )
}

export default Tasks
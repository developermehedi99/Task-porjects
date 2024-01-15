import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFaund from "./NoTaskFaund";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const ListBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn react",
    description:
      "I want to be a best react and next js in the world. my target is so high if i success i work very hardwork",
    tags: ["web", "react", "next"],
    priority: "high",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);

  const hanldeAddTask = (task, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, task]);
    } else {
      setTasks(
        tasks.map((tas) => {
          if (tas.id === task.id) {
            return task;
          }
          return tas;
        })
      );
    }

    setShowTaskModal(false);
  };

  const handleEdit = (task) => {
    setTaskUpdate(task);
    setShowTaskModal(true);
  };
  const closeTask = () => {
    setShowTaskModal(false);
    setTaskUpdate(null);
  };
  const handleDelete = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  };
  const onDeleteAll = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const onFav = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  };

  const handleSearch = (search) => {
    console.log(search);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setTasks([...filtered]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showTaskModal && (
        <AddTaskModal
          taskUpdate={taskUpdate}
          onSave={hanldeAddTask}
          closeTask={closeTask}
        ></AddTaskModal>
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch}></SearchTask>
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            hanldeAddTask={() => setShowTaskModal(true)}
            onDeleteAll={onDeleteAll}
          ></TaskAction>

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFav={onFav}
            ></TaskList>
          ) : (
            <NoTaskFaund></NoTaskFaund>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListBoard;

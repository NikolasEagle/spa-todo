import { useContext } from "react";
import styles from "./DeleteTaskForm.module.scss";
import { TasksPageContext } from "../../routes/TasksPage";

export default function DeleteTaskForm({ id }) {
  const context = useContext(TasksPageContext);

  const { setOpenedPopup, getTasks, projectId, taskId } = context;

  async function deleteTask(event) {
    event.preventDefault();

    const projectsStorage = JSON.parse(localStorage.getItem("projects"));

    localStorage.setItem(
      "projects",
      JSON.stringify(
        projectsStorage.map((project) => {
          if (projectId === project.id) {
            project.tasks.queue = project.tasks.queue.filter((queue) => {
              console.log(queue.id, id);
              return queue.id !== taskId;
            });
            project.tasks.development = project.tasks.development.filter(
              (development) => development.id !== taskId
            );
            project.tasks.done = project.tasks.done.filter(
              (done) => done.id !== taskId
            );
          }
          return project;
        })
      )
    );

    setOpenedPopup(false);

    getTasks();
  }

  return (
    <form
      className={styles.DeleteTaskForm}
      onSubmit={(event) => {
        deleteTask(event);
      }}
    >
      <button type="submit">Да</button>
    </form>
  );
}

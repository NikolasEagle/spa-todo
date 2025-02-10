import { useContext, useEffect, useRef } from "react";
import styles from "./Main.module.scss";
import { TasksPageContext } from "../../routes/TasksPage";

export default function Main({ content, type, projectId }) {
  const firstRender = useRef(true);
  const context = useContext(TasksPageContext);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (type === "tasks") {
        document.addEventListener("dragover", (event) => {
          event.preventDefault();
        });
        document.addEventListener("drop", (event) => {
          event.preventDefault();
          const id = localStorage.getItem("drag_id");
          const status = localStorage.getItem("drag_status");

          console.log(id, status);

          const projectsStorage = JSON.parse(localStorage.getItem("projects"));

          localStorage.setItem(
            "projects",
            JSON.stringify(
              projectsStorage.map((project) => {
                let dragElement;
                if (project.id === projectId) {
                  if (status === "В очереди") {
                    dragElement = project.tasks.queue.find(
                      (queue) => queue.id === id
                    );

                    project.tasks.queue = project.tasks.queue.filter(
                      (queue) => queue.id !== id
                    );
                  } else if (status === "В работе") {
                    dragElement = project.tasks.development.find(
                      (development) => development.id === id
                    );

                    project.tasks.development =
                      project.tasks.development.filter(
                        (development) => development.id !== id
                      );
                  } else if (status === "Выполнено") {
                    dragElement = project.tasks.done.find(
                      (done) => done.id === id
                    );

                    project.tasks.done = project.tasks.done.filter(
                      (done) => done.id !== id
                    );
                  }
                  if (event.target.id === "queueZone") {
                    dragElement.status = "В очереди";
                    project.tasks.queue = [dragElement, ...project.tasks.queue]
                      .sort()
                      .reverse();
                  } else if (event.target.id === "developmentZone") {
                    dragElement.status = "В работе";
                    project.tasks.development = [
                      dragElement,
                      ...project.tasks.development,
                    ]
                      .sort()
                      .reverse();
                  } else if (event.target.id === "doneZone") {
                    dragElement.status = "Выполнено";
                    dragElement.endDate = new Date();
                    project.tasks.done = [dragElement, ...project.tasks.done]
                      .sort()
                      .reverse();
                  } else {
                    if (status === "В очереди") {
                      project.tasks.queue = [
                        dragElement,
                        ...project.tasks.queue,
                      ];
                    } else if (status === "В работе") {
                      project.tasks.development = [
                        dragElement,
                        ...project.tasks.development,
                      ];
                    } else if (status === "Выполнено") {
                      project.tasks.done = [dragElement, ...project.tasks.done];
                    }
                  }
                }
                return project;
              })
            )
          );
          context.getTasks();
        });
      }
    }
  }, []);

  return type === "projects" ? (
    <div className={styles.Main}>{content}</div>
  ) : (
    <div className={styles.Main}>
      <div className={styles.tasks}>
        <div className={styles.queue} id="queueZone">
          <h4 className={styles.header_column}>В очереди</h4>
          {content.queue}
        </div>
        <div className={styles.development} id="developmentZone">
          <h4 className={styles.header_column}>В работе</h4>
          {content.development}
        </div>
        <div className={styles.done} id="doneZone">
          <h4 className={styles.header_column}>Выполнено</h4>
          {content.done}
        </div>
      </div>
    </div>
  );
}

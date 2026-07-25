import  TaskContent  from "./TaskContent";
import styles from './taskPage.module.css';
import TaskEdit from "./TaskEdit";
import {useState, useEffect,useMemo,useContext} from 'react'
import {TaskContext} from './context/taskContext'

const STORAGE_KEY = 'myTasks';

export default function TaskPage(){
    const {taskState, taskDispatch} = useContext(TaskContext);
    console.log(taskState)

    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [activeButton, setActiveButton] = useState("grey");

    let [editTaskId, setEditTaskId] = useState(null);
    let [taskToDelete, setTaskToDelete] = useState(null);

    let [action,setAction]=useState("")

    let shownTasks = useMemo(() => {
        return taskState
        .slice()
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .filter((task) => {
            if (activeButton === "grey") {
                return true;
            }
            if (activeButton === "green") {
                return task.completed;
            }
            if (activeButton === "red") {
                return !task.completed;
            }
            return false;
        });
    }, [taskState, activeButton]);

    let handleTaskComplete = (id, done) => {
        taskDispatch({type:"Complete",payload:{id:id,completed:done}});
    };
    
     let confirmDelete = () => {
        taskDispatch({type:"Delete",payload:{id:taskToDelete}});
        setTaskToDelete(null);
    };
    let handleTaskEdit = (id, newTitle, newContent) => {
        taskDispatch({type:"Edit",payload:{id:id,title:newTitle,content:newContent}});
        setEditTaskId(null); // Close the edit form after saving
    };

    let handleTaskDelete = (id) => {
        setTaskToDelete(id);
    };

    let cancelDelete = () => {
        setTaskToDelete(null);
    };

    let handleEditShow=(id)=>{
        setEditTaskId(id);
    }

    let handleActionChange=({change})=>{
        setAction(change)
        setTimeout(()=>{
            setAction("")
        }, 2000)
    }

    let tasks=shownTasks.map((e)=>{
        return(
            <TaskContent key={e.id} id={e.id} title={e.title} content={e.content} completed={e.completed} onDone={handleTaskComplete} onDlete={handleTaskDelete} handleEditShow={handleEditShow} handleActionChange={handleActionChange}/>
        )
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(taskState));
    }, [taskState]);

    return(
        <>
            <div className={styles.taskPage} > 
                <h2 className={styles.title}>My Tasks</h2>
                <ul className={styles.nav}>
                    <li ><button className={activeButton === "grey" ? styles.active : ""} id="grey" onClick={() => setActiveButton("grey")}>All</button></li>
                    <li ><button className={activeButton === "green" ? styles.active : ""} id="green" onClick={() => setActiveButton("green")}>Completed</button></li>
                    <li ><button className={activeButton === "red" ? styles.active : ""} id="red" onClick={() => setActiveButton("red")}>Pending</button></li>
                </ul>

                <div className={styles.tasksList}>{tasks}</div>

                {editTaskId !== null && (
                    <TaskEdit taskList={taskState} editTaskId={editTaskId} handleTaskEdit={handleTaskEdit} handleActionChange={handleActionChange} />
                )}

                {taskToDelete !== null && (
                    <div className={styles.confirmOverlay} onClick={cancelDelete}>
                        <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
                            <p>Are you sure you want to delete this task?</p>
                            <div className={styles.confirmButtons}>
                                <button className={styles.confirmCancel} onClick={cancelDelete}>No</button>
                                <button className={styles.confirmDelete} onClick={() => {
                                    confirmDelete();
                                    handleActionChange({change:"Task is deleted"});
                                }}>Yes</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.add}>
                    <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Task Title"/>
                    <input value={content} onChange={e=>setContent(e.target.value)} type="text" placeholder="Task Content"/>
                    <button className={title.trim()?styles.active:styles.disabled}
                        disabled={!title.trim()}
                        onClick={(e)=>{
                            e.preventDefault();
                            taskDispatch({type:"Add",payload:{title:title,content:content}});
                            setTitle("");
                            setContent("");
                            handleActionChange({change:"Task is added"})
                        }}
                    >
                        Add
                    </button>
                </div>

                <div className={styles.clear}>
                    <button className={styles.clearComplete} onClick={()=>{
                        taskState.forEach((task) => {
                            if (task.completed) {
                                taskDispatch({type:"Delete",payload:{id:task.id}});
                            }
                            handleActionChange({change:"Completed Tasks is Cleared"})
                        });
                    }}>Clear Completed</button>
                    <button className={styles.clearAll} onClick={()=>{
                        taskState.forEach((task) => {
                            taskDispatch({type:"Delete",payload:{id:task.id}});
                        });
                        handleActionChange({change:"All Tasks is Cleared"})
                    }}>Clear All</button>
                </div>
            </div>
            {action !== "" && (
                <div style={{borderRadius:"6px",position:"fixed",bottom:"20px",left:"20px", padding:"10px",color:"white",backgroundColor:"#2E7D32"}}>{action} succesfully</div>
            )}
        </>
    )
}


import {createContext, useReducer} from "react";
import taskReducer from '../reducer/taskReducer'

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext({});
const STORAGE_KEY = 'myTasks';

export default function TaskProvider ({children}) {

    let initialTask= ()=>{
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Failed to parse tasks from localStorage', error);
            }
        }
        return [
            {title:"One",id:1,content:"hjkjhkj",completed:false},
            {title:"Two",id:2,content:"hjkjhkj",completed:true}
        ];
    }
    let [taskState, taskDispatch] = useReducer(taskReducer, initialTask());
    
    return(
        <TaskContext.Provider value={{taskState, taskDispatch}}>
            {children}
        </TaskContext.Provider>
    )
}    
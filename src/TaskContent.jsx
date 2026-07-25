import './taskContent.css'
import { Check, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

function TaskContent({ title, content, id, completed, onDone,onDlete,handleEditShow ,handleActionChange}) {
    return(
        <div className='task'>
            <div className="task-content">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
            <div className="control">
                <button id={id} onClick={() => {
                    onDone(id, !completed);
                    handleActionChange(completed?{change:"Task is marked as pending"}:{change:"Task is marked as done"})
                }} className={`done ${completed ? 'active' : ''}`} aria-label={completed ? 'Mark as pending' : 'Mark as done'}>
                    <Check size={18} />
                </button>
                <button id={id} onClick={() => handleEditShow(id)} className="edit" aria-label="Edit task">
                    <Pencil size={18} />
                </button>
                <button id={id} onClick={() => onDlete(id)} className="delete" aria-label="Delete task">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}

export default React.memo(TaskContent);
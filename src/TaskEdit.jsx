import { useState } from "react";

export default function TaskEdit({ editTaskId, taskList, handleTaskEdit,handleActionChange }) {
    const task = taskList.find((task) => task.id === editTaskId);
    let [newTitle, setNewTitle] = useState(task.title);
    let [newContent, setNewContent] = useState(task.content);

    return(
    <div className="overlay" onClick={()=> handleTaskEdit(editTaskId, task.title, task.content)} style={{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
        
        <div className="editForm" onClick={(e) => e.stopPropagation()} style={{color:"black",width:"400px",backgroundColor:"white",padding:"20px",borderRadius:"8px",boxShadow:"0 1px 6px black",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"15px",cursor:"default"}}>
            <h3 style={{margin:"0",padding:"0",textAlign:"center",fontSize:"20px"}}>Edit Task</h3>

            <div className="inputs" style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <label style={{fontSize:"15px"}} htmlFor="titleInput">Title</label>
                <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} style={{fontSize:"15px",borderRadius:"6px",marginBottom:"10px",color:"white",padding:"10px",outline:"none",border:"none",backgroundColor:"#00897B"}} id="titleInput" type="text"/>
                <label style={{fontSize:"15px"}} htmlFor="contentInput">Content</label>
                <input value={newContent} onChange={(e)=>setNewContent(e.target.value)} style={{fontSize:"15px",marginBottom:"15px",borderRadius:"6px",color:"white",padding:"10px",outline:"none",border:"none",backgroundColor:"#00897B"}} id="contentInput" type="text" />
            </div>

            <div className="buttons" style={{display:"flex",justifyContent:"flex-end",gap:"10px"}}>
                <button style={{cursor:"pointer",backgroundColor:"#BF360C",border:"none",outline:"none",color:"white",padding:"5px 10px",borderRadius:"6px",fontSize:"17px"}} onClick={()=> handleTaskEdit(editTaskId, task.title, task.content)}>Cancel</button>
                <button style={{cursor:"pointer",backgroundColor:"#2E7D32",border:"none",outline:"none",color:"white",padding:"5px 10px",borderRadius:"6px",fontSize:"17px"}} onClick={() => {
                    handleTaskEdit(editTaskId, newTitle, newContent);
                    handleActionChange({change:"Task is updated"});
                }} >Save</button>
            </div>
        </div>
    </div>
    )
}

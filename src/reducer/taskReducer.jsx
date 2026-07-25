export default function taskReducer(currState, action) {
    if(action.type==="Add"){
        let {title, content} = action.payload || {};
        return [{title,content,id:Date.now(),completed:false},...currState]
    }

    if(action.type==="Complete"){
        const {id, completed} = action.payload || {};
        return currState.map((task) => {
            if (task.id === id) {
                return { ...task, completed: completed };
            }
            return task;
        });
    }

    if(action.type==="Delete"){
        return currState.filter((task) => task.id !== action.payload.id);
    }

    if(action.type==="Edit"){
        const {id, title, content} = action.payload || {};
        return currState.map((task) => {
            if (task.id === id) {
                return { ...task, title: title, content: content };
            }
            return task;
        });

    }
    
    else{
        return currState;
    }
}
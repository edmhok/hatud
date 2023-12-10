import { writable } from "svelte/store";

const DEFAUL_DATA = [
    {id: "l-1", text: "List 1", items: [{id: "t-1", text: "Task 1"},{id: "t-2", text: "Task 2"},{id: "t-3", text: "Task 3"}]},
    {id: "l-2", text: "List 2", items: [{id: "t-4", text: "Task 4"},{id: "t-5", text: "Task 5"},{id: "t-6", text: "Task 6"}]},
    {id: "l-3", text: "List 3", items: [{id: "t-7", text: "Task 7"},{id: "t-8", text: "Task 8"},{id: "t-9", text: "Task 9"}]},
  ];

  function createStore() {
    const taskList = writable(DEFAUL_DATA);     
    const {subscribe} = taskList;

    return {
      subscribe,
      updateTask: (task, listIdx) => {
        // const taskIdx = get(taskList)[listIdx].items.findIndex(item => item.id === task.id);
  
        // if (taskIdx > -1) {
        //   taskList.update(list => {
        //     list[listIdx].items[taskIdx] = {...task};
        //     return list;
        //   })
        // }
  
        // -------
  
        taskList.update(list => {
          const taskIdx = list[listIdx].items.findIndex(item => item.id === task.id);
  
          if (taskIdx > -1) {
            list[listIdx].items[taskIdx] = {...task};  
          }
  
          return list;
        })
      }
    };
}

export const taskListStore = createStore();
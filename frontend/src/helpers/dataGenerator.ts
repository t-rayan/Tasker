export const getAllDueDatesAndTasksCompleted = (tasks: any) => {
  const getDueDates = tasks.map((task: any) => task.dueDate);

  // get all tasks which are completed and
  const allCompletedTasks = tasks.filter((task: any) => {
    let data: any = [];

    getDueDates.map((date: any) => {
      if (task.isCompleted && task.dueDate === date) {
        data.push(task);
      }
    });
    return data;
  });

  return allCompletedTasks;
};

export const getProjectCompletionProgress = (folders: any) => {
  const totalProjectsNo = folders.length;
  const completedProjects = folders.filter((folder: any) => {
    const y = getTotalCompletedtask(folder);
    console.log(y);
  });
};

const getTotalCompletedtask = (folder: any) => {
  const x = folder.tasks.filter((task: any) => task.isCompleted === true);
  return x;
};

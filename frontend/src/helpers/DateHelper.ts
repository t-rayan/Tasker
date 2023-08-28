export const getDateWithHyphens = (date: any) => {
  const rawDate = new Date(date);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in the 'YYYY-MM-DD' format
  const givenDate = new Date(date).toISOString().split("T")[0]; // Get today's date in the 'YYYY-MM-DD' format

  const isToday = givenDate === today;

  const year = rawDate.getFullYear();
  const month = rawDate.getMonth() + 1;
  const day = rawDate.getDate();

  // const withSlashes = [year, month, day].join('/');
  // console.log(withSlashes); // 👉️ "2023/1/4"

  const withHyphens = [year, month, day].join("-");

  if (isToday) {
    return "Today";
  }

  return withHyphens;
};

import cron from "node-cron";

const activeCronJobs = new Map();

export const scheduleScan = (type, schedule, enabled, callback) => {
  // Cancel existing cron job if any
  if (activeCronJobs.has(type)) {
    activeCronJobs.get(type).stop();
    activeCronJobs.delete(type);
  }

  if (!enabled) return;

  let cronExpression;
  if (type === "dailyQuick") {
    // Convert HH:mm to cron expression for daily
    const [hours, minutes] = schedule.time.split(":");
    cronExpression = `${minutes} ${hours} * * *`;
  } else if (type === "weeklyFull") {
    // Convert day and time to cron expression for weekly
    const [hours, minutes] = schedule.time.split(":");
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    cronExpression = `${minutes} ${hours} * * ${dayMap[schedule.day]}`;
  }

  if (cronExpression) {
    const job = cron.schedule(cronExpression, () => {
      callback(type);
    });
    activeCronJobs.set(type, job);
  }
};

export const stopAllCronJobs = () => {
  activeCronJobs.forEach((job) => job.stop());
  activeCronJobs.clear();
};

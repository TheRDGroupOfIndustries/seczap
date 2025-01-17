const activeSchedules = new Map();

const calculateNextRun = (schedule) => {
  const now = new Date();
  const [hours, minutes] = schedule.time.split(":");
  const next = new Date();
  next.setHours(parseInt(hours, 10));
  next.setMinutes(parseInt(minutes, 10));
  next.setSeconds(0);
  next.setMilliseconds(0);

  if (schedule.day) {
    // Weekly schedule
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const targetDay = dayMap[schedule.day];
    const currentDay = now.getDay();
    const daysUntilTarget = (targetDay + 7 - currentDay) % 7;
    next.setDate(next.getDate() + daysUntilTarget);
  }

  if (next <= now) {
    next.setDate(next.getDate() + (schedule.day ? 7 : 1));
  }

  return next;
};

export const scheduleTask = (id, schedule, enabled, callback) => {
  // Clear existing schedule if any
  if (activeSchedules.has(id)) {
    clearTimeout(activeSchedules.get(id));
    activeSchedules.delete(id);
  }

  if (!enabled) return;

  const scheduleNext = () => {
    const nextRun = calculateNextRun(schedule);
    const delay = nextRun.getTime() - Date.now();

    const timeoutId = setTimeout(() => {
      callback(id);
      scheduleNext(); // Schedule next run
    }, delay);

    activeSchedules.set(id, timeoutId);
    return nextRun;
  };

  return scheduleNext();
};

export const cancelSchedule = (id) => {
  if (activeSchedules.has(id)) {
    clearTimeout(activeSchedules.get(id));
    activeSchedules.delete(id);
  }
};

export const cancelAllSchedules = () => {
  activeSchedules.forEach(clearTimeout);
  activeSchedules.clear();
};

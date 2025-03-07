export const calculateDurationWithDate = (
  startTime: string,
  endTime: string
) => {
  const today = new Date().toISOString().split("T")[0];
  const startDate = new Date(`${today}T${startTime}:00`);
  const endDate = new Date(`${today}T${endTime}:00`);

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: diffHours, minutes: diffMinutes };
};

export const isStartTimeBeforeEndTime = (
  startTime: string,
  endTime: string
): boolean => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);

  return startDate < endDate;
};

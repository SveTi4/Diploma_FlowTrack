export const mockProgress = {
  total_tasks: 30,
  done_tasks: 12,
  days_elapsed: 15,
  days_left: 15,
  v_real: 0.8,
  v_req: 1.2,
  percent_done: 70,
  status: "yellow" as const,
  projected_finish_date: "2024-04-15"
};

export const mockBurndownData = [
  { day: "2024-03-01", remains: 30 },
  { day: "2024-03-02", remains: 28 },
  { day: "2024-03-03", remains: 28 },
  { day: "2024-03-04", remains: 26 },
  { day: "2024-03-05", remains: 26 },
  { day: "2024-03-06", remains: 24 },
  { day: "2024-03-07", remains: 24 },
  { day: "2024-03-08", remains: 22 },
  { day: "2024-03-09", remains: 22 },
  { day: "2024-03-10", remains: 20 },
  { day: "2024-03-11", remains: 20 },
  { day: "2024-03-12", remains: 18 },
  { day: "2024-03-13", remains: 18 },
  { day: "2024-03-14", remains: 16 },
  { day: "2024-03-15", remains: 12 }
]; 
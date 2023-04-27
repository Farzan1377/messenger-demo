export const getTime = () => {
  const now = new Date();
  const amPMTime = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return amPMTime;
};

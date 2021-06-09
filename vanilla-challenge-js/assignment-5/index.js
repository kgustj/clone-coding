function getTime() {
  // Don't delete this.
  const clock = document.querySelector("h2");
  const date = new Date();
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  let elapsed = xmasDay.getTime() - date.getTime();
  let days = Math.floor(elapsed / (86400 * 1000));
  elapsed -= days * (86400 * 1000);
  let hours = Math.floor(elapsed / (60 * 60 * 1000));
  elapsed -= hours * (60 * 60 * 1000);
  let minutes = Math.floor(elapsed / (60 * 1000));
  elapsed -= minutes * (60 * 1000);
  let seconds = Math.floor(elapsed / 1000);
  clock.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function init() {
  getTime();
  setInterval(getTime, 500);
}

init();
function timeSince(date: string) {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "ปี", seconds: 31536000 },
    { label: "เดือน", seconds: 2592000 },
    { label: "สัปดาห์", seconds: 604800 },
    { label: "วัน", seconds: 86400 },
    { label: "ชั่วโมง", seconds: 3600 },
    { label: "นาที", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? "" : ""} `;
    }
  }
  return "";
}

export default timeSince;

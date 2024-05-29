export interface Subtitle {
  start: number;
  end: number;
  text: string;
}

export const parseSRT = (data: string): Subtitle[] => {
  const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n(.+?)(?=\n\n|\n$)/gs;
  const matches = data.matchAll(regex);
  const subtitles: Subtitle[] = [];

  for (const match of matches) {
    const start = parseTime(match[2]);
    const end = parseTime(match[3]);
    const text = match[4].replace('\n', ' ');
    subtitles.push({ start, end, text });
  }

  return subtitles;
};

const parseTime = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':');
  const [secs, millis] = seconds.split(',');
  return (
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(secs, 10) +
    parseInt(millis, 10) / 1000
  );
};

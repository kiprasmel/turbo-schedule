export const timeElapsedMs = (start: Date, end: Date = new Date()): number => end.getTime() - start.getTime();

export const timeElapsedMsUnix = (start: number, end: number = Date.now()): number => end - start;

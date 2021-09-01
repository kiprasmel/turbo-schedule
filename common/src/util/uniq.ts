export const uniq = <T = any>(left: T[], right: T[] = []): T[] => [...new Set([...left, ...right])];

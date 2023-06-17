export const iso2file = (iso: string): string => iso.replace(/\:/g, "_");
export const file2iso = (file: string): string => file.replace(/_/g, ":");

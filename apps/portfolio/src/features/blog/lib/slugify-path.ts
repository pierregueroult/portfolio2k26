export function slugifyPath(path: string): string {
  return path.replaceAll(' ', '-').toLowerCase();
}

export function slugifyPath(path: string): string {
  return path.replaceAll(' ', '-').toLowerCase();
}

export function countWordsOfMarkdown(markdown: string): number {
  const words = markdown.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

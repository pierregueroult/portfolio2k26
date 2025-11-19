import { dirname, relative, resolve } from 'node:path';
import { readdir } from 'node:fs/promises';

export function convertParamToPath(param: string): string {
  return param.replace(/,/g, '/').replaceAll('-', ' ');
}

export function resolveContentDirectory(): string {
  const packageJsonPath = require.resolve('@repo/content/package.json');
  return dirname(packageJsonPath);
}

export async function readDirectoryRecursively(
  dir: string,
  rootDir: string,
  extensions: string[],
  removeExtension = true,
  slugify = true,
): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];
  const subdirPromises: Promise<string[]>[] = [];

  for (const entry of entries) {
    const extension = entry.name.toLowerCase().split('.').pop();
    if (entry.isFile() && extensions.includes(`.${extension}`)) {
      const relativePath = relative(rootDir, resolve(dir, entry.name));
      let slug = removeExtension ? relativePath.replace(/\.[^./\\]+$/u, '') : relativePath;

      if (slugify) {
        slug = slug.toLowerCase().replaceAll(' ', '-');
      }

      results.push(slug);
    } else if (entry.isDirectory()) {
      subdirPromises.push(
        readDirectoryRecursively(
          resolve(dir, entry.name),
          rootDir,
          extensions,
          removeExtension,
          slugify,
        ),
      );
    }
  }

  if (subdirPromises.length > 0) {
    const subdirResults = await Promise.all(subdirPromises);
    results.push(...subdirResults.flat());
  }

  return results;
}

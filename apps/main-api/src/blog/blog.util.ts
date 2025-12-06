import { dirname, relative, resolve } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { TreeNode } from '@repo/database/dtos/blog/tree';

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

const EXCLUDED_FILES = ['.git', '.gitignore', '.obsidian', 'Personal', 'personal', 'assets', 'Assets', '.DS_Store'];

export async function getDirectoryTree(dir: string, parentId?: string): Promise<TreeNode[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nodes: TreeNode[] = [];

  for (const entry of entries) {
    if (EXCLUDED_FILES.includes(entry.name)) {
      continue;
    }

    const fullPath = resolve(dir, entry.name);
    const stats = await stat(fullPath);
    const id = parentId ? `${parentId}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      nodes.push({
        id,
        parentId,
        name: entry.name,
        type: 'directory',
        createdAt: stats.birthtime,
        children: await getDirectoryTree(fullPath, id),
      });
    } else if (entry.isFile()) {
      nodes.push({
        id,
        parentId,
        name: entry.name,
        type: 'file',
        size: stats.size,
        createdAt: stats.birthtime,
      });
    }
  }

  // Sort: Directories first (A-Z), then Files (A-Z)
  return nodes.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === 'directory' ? -1 : 1;
  });
}

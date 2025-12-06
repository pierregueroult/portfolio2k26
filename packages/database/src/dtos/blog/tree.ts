export type NodeType = 'file' | 'directory';

interface BaseNode {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
}

export interface FileNode extends BaseNode {
  type: 'file';
  size: number;
}

export interface DirectoryNode extends BaseNode {
  type: 'directory';
  children: TreeNode[];
  isOpen?: boolean;
}

export type TreeNode = FileNode | DirectoryNode;

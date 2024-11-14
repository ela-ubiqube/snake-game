export interface Inode {
  id: number;
  mode: number; // File permissions
  size: number;
  blocks: number[];
  links: number;
  created: Date;
  modified: Date;
  isDirectory: boolean;
}

export interface DirectoryEntry {
  name: string;
  inodeId: number;
}

export interface Block {
  data: Uint8Array;
}
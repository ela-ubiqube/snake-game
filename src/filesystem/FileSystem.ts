import { Inode, DirectoryEntry, Block } from './types';

export class FileSystem {
  private blockSize: number = 1024;
  private blocks: Block[] = [];
  private inodes: Map<number, Inode> = new Map();
  private freeBlocks: Set<number> = new Set();
  private freeInodes: Set<number> = new Set();
  private directoryContents: Map<number, DirectoryEntry[]> = new Map();

  constructor(totalBlocks: number = 1024) {
    // Initialize blocks
    for (let i = 0; i < totalBlocks; i++) {
      this.blocks.push({ data: new Uint8Array(this.blockSize) });
      this.freeBlocks.add(i);
    }

    // Initialize inodes
    for (let i = 0; i < totalBlocks / 8; i++) {
      this.freeInodes.add(i);
    }

    // Create root directory
    this.createRootDirectory();
  }

  private createRootDirectory(): void {
    const rootInodeId = this.allocateInode();
    const rootInode: Inode = {
      id: rootInodeId,
      mode: 0o755, // rwxr-xr-x
      size: 0,
      blocks: [],
      links: 1,
      created: new Date(),
      modified: new Date(),
      isDirectory: true
    };

    this.inodes.set(rootInodeId, rootInode);
    this.directoryContents.set(rootInodeId, []);
  }

  private allocateInode(): number {
    const inodeId = this.freeInodes.values().next().value;
    if (inodeId === undefined) {
      throw new Error('No free inodes available');
    }
    this.freeInodes.delete(inodeId);
    return inodeId;
  }

  private allocateBlock(): number {
    const blockId = this.freeBlocks.values().next().value;
    if (blockId === undefined) {
      throw new Error('No free blocks available');
    }
    this.freeBlocks.delete(blockId);
    return blockId;
  }

  createFile(parentDirInodeId: number, name: string): number {
    const inodeId = this.allocateInode();
    const inode: Inode = {
      id: inodeId,
      mode: 0o644, // rw-r--r--
      size: 0,
      blocks: [],
      links: 1,
      created: new Date(),
      modified: new Date(),
      isDirectory: false
    };

    this.inodes.set(inodeId, inode);
    const parentDirEntries = this.directoryContents.get(parentDirInodeId);
    if (!parentDirEntries) {
      throw new Error('Parent directory not found');
    }

    parentDirEntries.push({ name, inodeId });
    return inodeId;
  }

  createDirectory(parentDirInodeId: number, name: string): number {
    const inodeId = this.allocateInode();
    const inode: Inode = {
      id: inodeId,
      mode: 0o755, // rwxr-xr-x
      size: 0,
      blocks: [],
      links: 2, // . and ..
      created: new Date(),
      modified: new Date(),
      isDirectory: true
    };

    this.inodes.set(inodeId, inode);
    this.directoryContents.set(inodeId, [
      { name: '.', inodeId },
      { name: '..', inodeId: parentDirInodeId }
    ]);

    const parentDirEntries = this.directoryContents.get(parentDirInodeId);
    if (!parentDirEntries) {
      throw new Error('Parent directory not found');
    }

    parentDirEntries.push({ name, inodeId });
    return inodeId;
  }

  writeFile(inodeId: number, data: Uint8Array): void {
    const inode = this.inodes.get(inodeId);
    if (!inode || inode.isDirectory) {
      throw new Error('Invalid file inode');
    }

    // Free old blocks
    inode.blocks.forEach(blockId => this.freeBlocks.add(blockId));
    inode.blocks = [];

    // Allocate new blocks and write data
    const blocksNeeded = Math.ceil(data.length / this.blockSize);
    for (let i = 0; i < blocksNeeded; i++) {
      const blockId = this.allocateBlock();
      inode.blocks.push(blockId);
      
      const start = i * this.blockSize;
      const end = Math.min((i + 1) * this.blockSize, data.length);
      const blockData = data.slice(start, end);
      
      this.blocks[blockId].data.set(blockData);
    }

    inode.size = data.length;
    inode.modified = new Date();
  }

  readFile(inodeId: number): Uint8Array {
    const inode = this.inodes.get(inodeId);
    if (!inode || inode.isDirectory) {
      throw new Error('Invalid file inode');
    }

    const result = new Uint8Array(inode.size);
    let offset = 0;

    inode.blocks.forEach((blockId, index) => {
      const blockData = this.blocks[blockId].data;
      const remaining = inode.size - offset;
      const bytesToCopy = Math.min(remaining, this.blockSize);
      
      result.set(blockData.slice(0, bytesToCopy), offset);
      offset += bytesToCopy;
    });

    return result;
  }

  listDirectory(inodeId: number): DirectoryEntry[] {
    const inode = this.inodes.get(inodeId);
    if (!inode || !inode.isDirectory) {
      throw new Error('Invalid directory inode');
    }

    return this.directoryContents.get(inodeId) || [];
  }

  deleteFile(parentDirInodeId: number, name: string): void {
    const parentDirEntries = this.directoryContents.get(parentDirInodeId);
    if (!parentDirEntries) {
      throw new Error('Parent directory not found');
    }

    const entryIndex = parentDirEntries.findIndex(entry => entry.name === name);
    if (entryIndex === -1) {
      throw new Error('File not found');
    }

    const inodeId = parentDirEntries[entryIndex].inodeId;
    const inode = this.inodes.get(inodeId);
    if (!inode) {
      throw new Error('Inode not found');
    }

    // Free blocks
    inode.blocks.forEach(blockId => this.freeBlocks.add(blockId));
    
    // Free inode
    this.freeInodes.add(inodeId);
    this.inodes.delete(inodeId);
    
    // Remove directory entry
    parentDirEntries.splice(entryIndex, 1);
  }
}
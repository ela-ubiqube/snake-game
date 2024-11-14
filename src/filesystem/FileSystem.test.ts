import { describe, test, expect, beforeEach } from 'vitest';
import { FileSystem } from './FileSystem';

describe('FileSystem', () => {
  let fs: FileSystem;
  const rootInodeId = 0;

  beforeEach(() => {
    fs = new FileSystem(1024);
  });

  test('creates and reads a file', () => {
    const fileInodeId = fs.createFile(rootInodeId, 'test.txt');
    const testData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    
    fs.writeFile(fileInodeId, testData);
    const readData = fs.readFile(fileInodeId);
    
    expect(Array.from(readData)).toEqual(Array.from(testData));
  });

  test('creates and lists directory contents', () => {
    const dirInodeId = fs.createDirectory(rootInodeId, 'testdir');
    const entries = fs.listDirectory(dirInodeId);
    
    expect(entries).toHaveLength(2); // . and ..
    expect(entries[0].name).toBe('.');
    expect(entries[1].name).toBe('..');
  });

  test('deletes a file', () => {
    const fileInodeId = fs.createFile(rootInodeId, 'delete-me.txt');
    const testData = new Uint8Array([1, 2, 3, 4, 5]);
    
    fs.writeFile(fileInodeId, testData);
    fs.deleteFile(rootInodeId, 'delete-me.txt');
    
    const dirContents = fs.listDirectory(rootInodeId);
    expect(dirContents.find(entry => entry.name === 'delete-me.txt')).toBeUndefined();
  });

  test('handles large files', () => {
    const fileInodeId = fs.createFile(rootInodeId, 'large.dat');
    const largeData = new Uint8Array(2048); // 2KB
    for (let i = 0; i < largeData.length; i++) {
      largeData[i] = i % 256;
    }
    
    fs.writeFile(fileInodeId, largeData);
    const readData = fs.readFile(fileInodeId);
    
    expect(Array.from(readData)).toEqual(Array.from(largeData));
  });
});
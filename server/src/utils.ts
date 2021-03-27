import path from 'path';
import glob from 'fast-glob';
import { Request } from 'express';

export function shuffleArray(array: Array<any>): Array<any> {
  const shuffled: Array<any> = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export async function getImagePaths(type: string, label: number): Promise<string[]> {
  const pathname = path.join(__dirname, `../public/${type}/${label}/**`);
  const files = await glob(pathname, { onlyFiles: true, deep: 1 });
  return files;
}

export function transformToPublicPath(req: Request, pathname: string): string {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}${pathname.split('public/')[1]}`;
}

import { Request } from 'express';
import {
  randomInt,
  shuffleArray,
  getImagePaths,
  transformToPublicPath,
} from '../utils';

import { ImagePairs } from '../types';

export async function generateRandomPairs(req: Request): Promise<ImagePairs[]> {
  const { NUM_CLASSES = 1 } = process.env;
  const randomClassLabel = randomInt(0, +NUM_CLASSES);

  const realImages = await getImagePaths('real', randomClassLabel);
  const fakeImages = await getImagePaths('fake', randomClassLabel);

  const randomRealImage = realImages[randomInt(0, realImages.length)];
  const randomFakeImage = fakeImages[randomInt(0, fakeImages.length)];

  const result: ImagePairs[] = [
    { img: transformToPublicPath(req, randomRealImage), label: 'real' },
    { img: transformToPublicPath(req, randomFakeImage), label: 'fake' },
  ];

  return shuffleArray(result);
}

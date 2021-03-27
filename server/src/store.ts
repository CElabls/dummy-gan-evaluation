import fs from 'fs';
import { Storage, StorageItem } from './types';

export class DummyStorage {
    store: Storage = {};

    get(key: string): StorageItem {
      return this.store[key];
    }

    put(key: string, value: StorageItem) {
      this.store[key] = value;
    }

    reset(key: string) {
      this.put(key, { imagesCounter: 0, result: 0 });
    }

    increment(key: string, answer: number): StorageItem {
      const prev = this.get(key);
      const prevValue = prev?.imagesCounter;

      const newValue = prevValue + 1;
      const shouldStop = newValue >= +process.env.NUM_ATTEMPTS!;

      const newItem = {
        ...prev,
        ...(answer === 1 && { result: prev?.result + 1 }),
        shouldStop,
        imagesCounter: newValue,
      };

      if (shouldStop) {
        // Save session to disk
        fs.writeFileSync(`${__dirname}/../logs/${Date.now()}-${key}.json`, JSON.stringify(newItem));
      }

      this.put(key, newItem);

      return newItem;
    }
}

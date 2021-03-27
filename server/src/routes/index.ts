import { Request, Response, Router } from 'express';
import { generateRandomPairs } from './helpers';
import { VoteResult } from '../types';
import { DummyStorage } from '../store';

const router = Router();
const storage = new DummyStorage();

router.get('/', async (req: Request, res: Response) => {
  const pairs = await generateRandomPairs(req);
  res.json(pairs);
});

router.post('/', async (req: Request, res: Response) => {
  const { body }: {body: VoteResult} = req;

  // Initialize storage for user
  const { sessionID } = req;
  if (!storage.get(sessionID)) {
    storage.put(sessionID, {
      imagesCounter: 0,
      result: 0,
    });
  }

  // Save result
  const answer = +body.answer === 1 && body.label === 'real' && !body.pass;
  const result = storage.increment(sessionID, answer, body.pass);
  if (result.shouldStop) {
    storage.reset(sessionID);
  }

  res.json(result);
});

export default router;

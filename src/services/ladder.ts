import { Ladder } from '../models/ladder';
import { NotFoundError } from '../errors';

export class LadderService {

  getByKey(key: string): Ladder {

    if (key === 'ssb64-1v1') {
      const ladder: Ladder = {
        key: 'ssb64-1v1',
        title: 'Super Smash Bros 64 1v1',
        game: 'ssb64'
      };
      return ladder;
    }

    throw new NotFoundError('No such ladder');

  }

  getAll(): Ladder[] {

    return [this.getByKey('ssb64-1v1')];

  }

}

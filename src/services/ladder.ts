import { Ladder } from '../models/ladder';
import { NotFoundError } from '../errors';

export class LadderService {

  getByKey(key: string): Ladder {

    if (key === 'sms64-1v1') {
      const ladder: Ladder = {
        key: 'sms64-1v1',
        title: 'Super Smash Bros 64 1v1',
        game: 'sms64'
      };
      return ladder;
    }

    throw new NotFoundError('No such ladder');

  }

  getAll(): Ladder[] {

    return [this.getByKey('sms64-1v1')];

  }


}

import { Challenge } from '../models/challenge';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';
import { StageService } from './stage';
import { CharacterService } from './character';
import db from '../db';
import * as nodemailer from 'nodemailer';

export class ChallengeService {

  async getByLadderAndId(ladder: Ladder, id: number): Promise<Challenge> {

    const challenge = (await this.getByLadder(ladder)).find( challenge =>
      challenge.id === id
    );
    if (typeof challenge === 'undefined') {
      throw new NotFoundError('No such challenge');
    }
    return challenge;

  }

  async getByLadder(ladder: Ladder): Promise<Challenge[]> {

    const playerService = new PlayerService();
    const characterService = new CharacterService();
    const stageService = new StageService();

    const query = `
      SELECT * FROM smash_challenge WHERE ladder_id = ? ORDER BY created_at
    `;

    const result = await db.query(query, [ladder.key]);
    const challenges: Challenge[] = [];

    for (const row of result[0]) {

      challenges.push({
        id: row.id,
        createdAt: new Date(row.created_at * 1000),
        ladder: ladder,
        from: await playerService.getById(row.from_id),
        to: await playerService.getById(row.to_id)
      });

    }

    return challenges;

  }

  async save(challenge: Challenge) {

    const query = `
      INSERT INTO smash_challenge SET
        created_at = UNIX_TIMESTAMP(),
        ?
      `;

    const result = await db.query(query, [{
      ladder_id: challenge.ladder.key,
      from_id: challenge.from.id,
      to_id: challenge.to.id
    }]);

    challenge.id = result[0].insertId;

    const smtpUrl = 'smtp://' + process.env.SMTP_HOST + ':25';
    console.log('create transport');
    const transporter = nodemailer.createTransport(smtpUrl);
    console.log('send challenge to ' + challenge.to.email);

    const allowedStagesString =
      Array.isArray(challenge.ladder.allowedStages) ?
      challenge.ladder.allowedStages.map( stage => stage.name ).join(', ') :
      challenge.ladder.allowedStages;

    await transporter.sendMail({
      from: 'smashmailer@badgateway.net',
      to: challenge.to.email,
      subject: 'You have been challenged by ' + challenge.from.userName + ' on the ' + challenge.ladder.title + ' ladder',
      replyTo: challenge.from.email,
      cc: challenge.from.email,
      text: `Hi ${challenge.to.email},

You have just been challenged by ${challenge.from.userName} to defend your position on
the ${challenge.ladder.title} ladder.

Arrange with ${challenge.from.userName} for a time to smash.

Ladder: ${challenge.ladder.title}
Rules:

* Game: ${challenge.ladder.game.title}
* ${challenge.ladder.lives} lives.
* Allowed stages: ${allowedStagesString}
* Ranking algorithm: ${challenge.ladder.algorithm}
* Allowed items: ${challenge.ladder.allowedItems}
`
    });

  }

}

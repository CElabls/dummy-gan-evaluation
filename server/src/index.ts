import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from 'express-basic-auth';
import * as dotenv from 'dotenv';
import session from 'express-session';
import routes from './routes';

dotenv.config({ path: `${__dirname}/../.env` });
const { AUTH_USER, AUTH_PASSWORD, AUTH } = process.env;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'dummy',
  saveUninitialized: true,
  resave: false,
}));

AUTH === 'yes' && app.use(auth({
  users: {
    [String(AUTH_USER)]: String(AUTH_PASSWORD),
  },
  challenge: true,
  realm: 'dummy',
}));

app.use('/', routes);

app.use((err: Error) => {
  throw err.message;
});

app.listen(3000, () => 'Server is running on port 3000');

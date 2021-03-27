import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config({ path: `${__dirname}/../.env` });
const { PORT, ORIGIN } = process.env;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'dummy',
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }, // 1 hour
  resave: false,
}));

app.use(cors({ credentials: true, origin: ORIGIN }));
app.use('/', routes);

app.use((err: Error) => {
  throw err.message;
});

app.listen(PORT || 4000, () => 'Server is running on port 3000');

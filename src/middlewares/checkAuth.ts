import * as fs from "fs";
import * as path from "path";
import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

const PRIV_KEY = fs.readFileSync(
    path.join(__dirname, "..", "..", "id_rsa_priv.pem"),
    "utf-8"
);

export default function configAuth() {
    passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: PRIV_KEY,
            algorithms: ['RS256'],
            ignoreExpiration: false
        },
        (payload, done) => {
            done(null, payload.sub);
        }
    ));
}
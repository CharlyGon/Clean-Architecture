import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
    static generateToken(payload: string | object | Buffer, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null);
                resolve(token!);
            });
        });
    }

    static verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if (error) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}

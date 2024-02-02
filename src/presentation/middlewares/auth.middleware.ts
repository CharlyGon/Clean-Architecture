import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';

export class AuthMiddleware {
    static readonly validateToken = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.headers.authorization;
        if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = req.headers.authorization!.split(' ').at(1) ?? '';

        try {
            const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({ error: 'Invalid token - user not found' });

            req.body.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

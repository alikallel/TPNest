import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`IP Address: ${req.ip}`);
    next();
};

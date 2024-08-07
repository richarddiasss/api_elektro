import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class ValidatorMiddleware {
    public static validateResult(
        request: Request,
        response: Response,
        next: NextFunction
    ) {

        try {
          const erros = validationResult(request)
          
          if(!erros.isEmpty()){
            return response.status(400).json({error: erros.array()})
          }

          next();
        } catch (error) {
            return response.status(500).json({error: "Erro interno no servidor"})
        }
    }
}
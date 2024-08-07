import { body, ValidationChain } from "express-validator";

export class Validator{
    public static validatorUser(method: string): ValidationChain[] {
        switch(method){
            case "createUser":
                return [
                    body("email")
                        .exists()
                        .withMessage("O email é obrigatório")
                        .isEmail()
                        .withMessage("Email não é válido"),

                    body("nome")
                        .optional({values: "null"})
                        .isLength({min: 1})
                        .withMessage("Nome não pode ser vazio."),

                    body("cpf")
                        .isLength({min: 11, max: 11})
                        .withMessage("O CPF tem exatamente 11 números"),
                    
                    body("password")
                        .exists()
                        .withMessage("precisa existir uma senha")
                        .isLength({min: 1})
                        .withMessage("O campo senha não pode ser vazio"),
                ]
            
            case "update":
                return[
                    body("email")
                        .optional()
                        .isEmail()
                        .withMessage("Email não é válido"),

                    body("nome")
                        .optional({values: "null"})
                        .isLength({min: 1})
                        .withMessage("Nome não pode ser vazio."),

                    body("cpf")
                        .optional()
                        .isLength({min: 11, max: 11})
                        .withMessage("O CPF tem exatamente 11 números")
                ]

            case "updatePassword":
                return [
                    body("password")
                        .optional({values: "null"})
                        .isLength({min: 1})
                        .withMessage("O campo senha não pode ser vazio")
                ]
            
                default:
                    return []
        }
    }

    public static validatorProduct(method: string): ValidationChain[] {
        switch(method){
            case "create":
                return [
                    body("quantidade")
                        .exists()
                        .withMessage("A quantidade é obrigatório")
                        .isInt({min: 0})
                        .withMessage("Email não é válido"),

                    body("nome")
                        .optional({values: "null"})
                        .isLength({min: 1})
                        .withMessage("Nome não pode ser vazio."),

                    body("preco")
                        .exists()
                        .withMessage("O preço de ser definido")
                        .isFloat({min: 0 })
                        .withMessage("O preço não pode ser negativo.")

                ]
            
            case "update":
                return [
                    body("quantidade")
                        .optional()
                        .isInt({min: 0})
                        .withMessage("Email não é válido"),

                    body("nome")
                        .optional({values: "null"})
                        .isLength({min: 1})
                        .withMessage("Nome não pode ser vazio."),

                    body("preco")
                        .optional()
                        .isFloat({min: 0 })
                        .withMessage("O preço não pode ser negativo.")

                ]
            
            default:
                return []
        }
    }
}
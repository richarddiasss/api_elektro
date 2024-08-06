import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import auth from "../config/auth";

const prisma = new PrismaClient();

 class UserController {

    public async createUser(request: Request, response: Response) {

        try {
            const {cpf, nome, email, password } = request.body;
            const { hash, salt } = auth.generatePassword(password);

            let userInput: Prisma.UserCreateInput = {
                cpf,
                nome,
                email,
                hash,
                salt,
            };
            
            const newUser = await prisma.user.create({
                data:userInput,
            });

            return response.status(201).json({message:"Usuário criado com sucesso", usuario: newUser})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async findUser(request: Request, response: Response) {

        const { id } = request.params;

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
            })

        if(user != null){
            return response.status(201).json({ message:"Usuário encontrado!", usuario: user})
        }

        return response.status(401).json({ message:"Usuário não encontrado!"})

        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async findAllUsers(request: Request, response: Response) {

        try {

            const allUsers = await prisma.user.findMany()

            return response.status(201).json({users: allUsers})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async update(request: Request, response: Response) {

        const { id } = request.params;
        const {cpf, nome, email } = request.body;

        try {
            const user = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data:{
                    cpf,
                    nome,
                    email
                }
            })

        if(user != null){
            return response.status(201).json({ message:"Campo modificado!", usuario: user})
        }

        return response.status(401).json({ message:"Usuário não encontrado!"})

        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async updatePassword(request: Request, response: Response) {

        const { id } = request.params;
        const { password } = request.body;
        const { hash, salt } = auth.generatePassword(password);

        try {
            const user = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data:{
                    hash,
                    salt,
                }
            })

        if(user != null){
            return response.status(201).json({ message:"Senha modificada", usuario: user})
        }

        return response.status(401).json({ message:"Usuário não encontrado!"})

        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async deleteUser(request: Request, response: Response) {

        const { id } = request.params;

        try {

            const user = await prisma.user.delete({
                where: {
                    id: Number(id),
                },
            })
            

        if(user != null){
            return response.status(201).json({user, message:"Usuário deletado"})
        }

        return response.status(401).json({ message:"Usuário não existe"})

        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }
    
}


export const userController = new UserController();
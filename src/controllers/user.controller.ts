import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import auth from "../config/auth";
import { use } from "passport";

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

            const token = auth.generateJWT(newUser);

            return response.status(201).json({message:"Usuário criado com sucesso", usuario: newUser, token: token})
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

        const id = request.user;
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

        const id = request.user;
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

        const id = request.user;

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

    public async deleteProduct(request: Request, response: Response) {

        const id = request.user;
        const { idUser, idProduct } = request.params;

        try {
            
            const product = await prisma.product.delete({
                where:{id: Number(idProduct), userId: Number(idUser)}
            })

        if(product != null){
            return response.status(201).json({product, message:"produto deletado"})
        }

        return response.status(401).json({ message:"produto não encontrado"})

        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async login(request: Request, response: Response){
        const {email, password} = request.body;

        const user = await prisma.user.findUnique({where: {email: email}})

        if(user == null){
            return response.status(400).json({message:"usuário não encontrado"})
        }

        const {hash, salt} = user

        if(!auth.checkPassword(password, hash, salt)){
            return response.status(400).json({message:"Senha incorreta"})
        }

        const token = auth.generateJWT(user);
        
        return response.status(201).json({message:"Token enviado" ,token: token})
         
    }

}


export const userController = new UserController();
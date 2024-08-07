import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {

    public async create(request: Request, response: Response) {

        const userId = request.user;
        
        try {
            const { nome, quantidade, preco, descricao, categoria} = request.body;
            
            const newProduct = await prisma.product.create({
                data: {
                    nome,
                    quantidade,
                    preco,
                    descricao,
                    categoria,
                    userId,
                },
                include:{
                    vendedor: true,
                }
            });

            return response.status(201).json({message:"Produto criado com sucesso", produto: newProduct})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async findAll(request: Request, response: Response) {

        try {
            
            
            const products = await prisma.product.findMany({include:{vendedor: true}});

            return response.status(201).json({produtos: products})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async findOne(request: Request, response: Response) {

        const { id } = request.params;
        try {
            
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(id),
                },
                include: {vendedor: true}});

            if(product == null){
                return response.status(201).json({message: "produto não existe"})
            }

            return response.status(201).json({produto: product})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async update(request: Request, response: Response) {

        const { id } = request.params;
        const { nome, quantidade, preco, descricao, categoria } = request.body;

        if(quantidade < 0){
            return response.status(400).json({message:"Inválido passar número negativo em quantidade."})
        }
        
        try {
            
            const product = await prisma.product.update({
                where: {
                    id: Number(id) 
                  },
                data:{
                    nome,
                    quantidade,
                    preco,
                    descricao,
                    categoria,
                }});

            return response.status(201).json({produto: product})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }

    public async delete(request: Request, response: Response) {

        const { id } = request.params;

        try {
            
            const product = await prisma.product.delete({
                where:{id: Number(id)}})

            return response.status(201).json({produto: product})
        } catch (error) {
            return response.status(500).json({message:"Erro interno no servidor", error})
        }

    }
}

export const productController = new ProductController();
import { PrismaClient } from "@prisma/client";
//this prevents the opening of multiple prisma clients 
//use this whenever db stuff needs to be done 
const prisma = new PrismaClient()

export default prisma
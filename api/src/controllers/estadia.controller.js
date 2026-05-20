const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const item = await prisma.estadia.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.estadia.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.estadia.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async(req,res)=>{
const { id } = req.params
const dados = req.body

if(dados.saida){
    const estadia = await prisma.estadia.findUnique({
    where:{
    id:Number(id)
    }
    })

const entrada = new Date(estadia.entrada)
const saida = new Date(dados.saida)

const horas = (saida-entrada) / (1000*60*60)
    dados.valorTotal = Number((horas*estadia.valorHora).toFixed(2))
}
const item = await prisma.estadia.update({
    where:{
    id:Number(id)
},
    data:dados

})
res.json(item)
}

const excluir = async (req, res) => {
    const { id } = req.params;
    const item = await prisma.estadia.delete({
        where: { id : Number(id) }
    });
    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}

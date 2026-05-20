let automoveis = []
let estadias = []

document.addEventListener("DOMContentLoaded", () => {
    listarAutomoveis()
    listarEstadias()
})


function abrirModalAutomovel(){
    document.getElementById("modalAutomovel").style.display = "block"
}

function fecharModalAutomovel(){
    document.getElementById("modalAutomovel").style.display = "none"
    limparCamposAutomovel()
}

function abrirModalEstadia(){
    document.getElementById("modalEstadia").style.display = "block"
}

function fecharModalEstadia(){
    document.getElementById("modalEstadia").style.display = "none"
    limparCamposEstadia()
}

async function cadastrarAutomovel(){
    const placa = document.getElementById("placa").value.trim()
    const proprietario = document.getElementById("proprietario").value.trim()
    const tipo = document.getElementById("tipo").value.trim()
    const modelo = document.getElementById("modelo").value.trim()
    const marca = document.getElementById("marca").value.trim()
    const cor = document.getElementById("cor").value.trim()
    const ano = document.getElementById("ano").value
    const telefone = document.getElementById("telefone").value.trim()

    if(!placa || !proprietario || !tipo || !modelo){
        alert("Preencha os campos obrigatórios!")
        return
    }

    const novoAutomovel = {
        placa,
        proprietario,
        tipo,
        modelo,
        marca,
        cor,
        ano: Number(ano),
        telefone
    }

    await fetch("http://localhost:3000/automoveis",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(novoAutomovel)
    })

    listarAutomoveis()
    fecharModalAutomovel()
}

async function listarAutomoveis(){
    const resposta = await fetch("http://localhost:3000/automoveis")
    automoveis = await resposta.json()
    const tabela = document.getElementById("dadosAutomoveis")
    tabela.innerHTML = ""
    automoveis.forEach((automovel) => {
        tabela.innerHTML += `
        <tr>
            <td>${automovel.placa}</td>
            <td>${automovel.modelo}</td>
            <td>${automovel.marca || "-"}</td>
            <td>${automovel.cor || "-"}</td>
            <td>${automovel.ano || "-"}</td>
            <td>
                <button onclick="excluirAutomovel('${automovel.placa}')">
                    Excluir
                </button>
            </td>
        </tr>
        `
    })
}

async function excluirAutomovel(placa){
    if(!confirm("Deseja excluir este veículo?")) return
    await fetch(`http://localhost:3000/automoveis/${placa}`,{
        method:"DELETE"
    })
    listarAutomoveis()
}

async function cadastrarEstadia(){
    const placa = document.getElementById("placaEstadia").value.trim()
    const valorHora = document.getElementById("valorHora").value
    if(!placa || !valorHora){
        alert("Preencha os campos!")
        return
    }

    const novaEstadia = {
        placa,
        valorHora:Number(valorHora)
    }

    await fetch("http://localhost:3000/estadias",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(novaEstadia)
    })
    listarEstadias()
    fecharModalEstadia()
}

async function listarEstadias(){
    const resposta = await fetch("http://localhost:3000/estadias")
    estadias = await resposta.json()
    const tabela = document.getElementById("dadosEstadias")
    tabela.innerHTML = ""
    estadias.forEach((estadia) => {

        tabela.innerHTML += `
        <tr>
            <td>${estadia.id}</td>
            <td>${estadia.placa}</td>
            <td>
                ${new Date(estadia.entrada).toLocaleString()}
            </td>
            <td>
                ${
                    estadia.saida?
                    new Date(estadia.saida).toLocaleString()
                    :
                    "Em aberto"
                }
            </td>

            <td>
                ${
                    estadia.valorTotal?
                    "R$ " + estadia.valorTotal.toFixed(2)
                    :
                    "-"
                }
            </td>

            <td>
                ${
                    !estadia.saida
                    ?
                    `
                    <button onclick="finalizarEstadia(${estadia.id})">
                        Finalizar
                    </button>
                    `
                    :
                    ""
                }

                <button onclick="excluirEstadia(${estadia.id})">
                    Excluir
                </button>

            </td>

        </tr>
        `
    })
}

async function finalizarEstadia(id){
    await fetch(`http://localhost:3000/estadias/${id}`,{
        method:"PUT"
    })
    listarEstadias()
}

async function excluirEstadia(id){
    if(!confirm("Deseja excluir esta estadia?")) return
    await fetch(`http://localhost:3000/estadias/${id}`,{
        method:"DELETE"
    })
    listarEstadias()
}


function limparCamposAutomovel(){
    document.getElementById("placa").value = ""
    document.getElementById("proprietario").value = ""
    document.getElementById("tipo").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("cor").value = ""
    document.getElementById("ano").value = ""
    document.getElementById("telefone").value = ""
}

function limparCamposEstadia(){
    document.getElementById("placaEstadia").value = ""
    document.getElementById("valorHora").value = ""
}
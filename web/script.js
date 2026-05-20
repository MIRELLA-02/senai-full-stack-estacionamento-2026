let automoveis = []
let estadias = []

const URL_AUTOMOVEL =
"http://localhost:3000/automovel"

const URL_ESTADIA =
"http://localhost:3000/estadia"


document.addEventListener("DOMContentLoaded",()=>{

listarAutomoveis()

listarEstadias()

})


document
.getElementById("formAutomovel")
.addEventListener("submit",(e)=>{

e.preventDefault()

cadastrarAutomovel()

})


document
.getElementById("formEstadia")
.addEventListener("submit",(e)=>{

e.preventDefault()

cadastrarEstadia()

})



async function cadastrarAutomovel(){

const placa =
document.getElementById("placa").value

const proprietario =
document.getElementById("proprietario").value

const tipo =
document.getElementById("tipo").value

const modelo =
document.getElementById("modelo").value

const marca =
document.getElementById("marca").value

const cor =
document.getElementById("cor").value

const ano =
document.getElementById("ano").value

const telefone =
document.getElementById("telefone").value


if(!placa || !proprietario || !tipo || !modelo){

alert("Preencha os campos obrigatórios")

return

}


await fetch(

`${URL_AUTOMOVEL}/cadastrar`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

placa,
proprietario,
tipo,
modelo,
marca,
cor,
ano:Number(ano),
telefone

})

})

limparCamposAutomovel()

listarAutomoveis()

}



async function listarAutomoveis(){

const resposta =
await fetch(

`${URL_AUTOMOVEL}/listar`

)

automoveis =
await resposta.json()

const tabela =
document.getElementById(
"listaAutomoveis"
)

tabela.innerHTML=""

automoveis.forEach((item)=>{

tabela.innerHTML +=

`

<tr>

<td>${item.placa}</td>

<td>${item.modelo}</td>

<td>

${item.marca || "-"}

</td>

<td>

${item.cor || "-"}

</td>

<td>

${item.ano || "-"}

</td>

<td>

<button
onclick="excluirAutomovel('${item.placa}')">

Excluir

</button>

</td>

</tr>

`

})

}


async function excluirAutomovel(placa){

if(

!confirm(
"Excluir veículo?"
)

) return


await fetch(

`${URL_AUTOMOVEL}/excluir/${placa}`,

{

method:"DELETE"

}

)

listarAutomoveis()

}



async function cadastrarEstadia(){

const placa =
document
.getElementById(
"placaEstadia"
).value

const valorHora =
document
.getElementById(
"valorHora"
).value


await fetch(

`${URL_ESTADIA}/cadastrar`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

placa,

valorHora:
Number(valorHora)

})

})

limparCamposEstadia()

listarEstadias()

}



async function listarEstadias(){

const resposta =
await fetch(

`${URL_ESTADIA}/listar`

)

estadias =
await resposta.json()

const tabela =
document
.getElementById(
"listaEstadias"
)

tabela.innerHTML=""

estadias.forEach((item)=>{

tabela.innerHTML +=

`

<tr>

<td>

${item.id}

</td>

<td>

${item.placa}

</td>

<td>

${new Date(
item.entrada
).toLocaleString()}

</td>

<td>

${
item.saida
?
new Date(
item.saida
).toLocaleString()
:
"Em aberto"
}

</td>

<td>

${
item.valorTotal
?
"R$ "
+
item.valorTotal
:
"-"
}

</td>

<td>

${
!item.saida

?

`

<button

onclick=
"finalizarEstadia(${item.id})"

>

Finalizar

</button>

`

:

""

}

<button

onclick=
"excluirEstadia(${item.id})"

>

Excluir

</button>

</td>

</tr>

`

})

}



async function finalizarEstadia(id){

await fetch(

`${URL_ESTADIA}/atualizar/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

saida:new Date()

})

}

)

listarEstadias()

}



async function excluirEstadia(id){

if(

!confirm(
"Excluir estadia?"
)

) return


await fetch(

`${URL_ESTADIA}/excluir/${id}`,

{

method:"DELETE"

}

)

listarEstadias()

}



function limparCamposAutomovel(){

placa.value=""
proprietario.value=""
tipo.value=""
modelo.value=""
marca.value=""
cor.value=""
ano.value=""
telefone.value=""

}


function limparCamposEstadia(){

placaEstadia.value=""

valorHora.value=""

}
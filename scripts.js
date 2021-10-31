const KEY_BD = '@usuarios'

var listaRegistros ={
    ultimoIdGerado:0,
    usuario:[]
}

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}

function mascara_cpf(){
    if(cpf.value.length ==3 || cpf.value.length == 7){
        cpf.value += "."
    }
    else if(cpf.value.length == 11) {
        cpf.value += "-"
    }
}

function mascara_tel(){
    if(tel.value.length == 0){
        tel.value += "("
    }
    if(tel.value.length == 3) {
        tel.value += ")"
    }
    if(tel.value.length == 8) {
        tel.value += "-"
    }
}

function mascara_cel(){
    if(cel.value.length == 0){
        cel.value += "("
    }
    if(cel.value.length == 3) {
        cel.value += ")"
    }
    if(cel.value.length == 8) {
        cel.value += "-"
    }
}

function validarEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
  }
      
  console.log(validarEmail('texto@texto.com')); // true
  console.log(validarEmail('texto@texto')); // false
  console.log(validarEmail('texto.com')); // false
  console.log(validarEmail('texto')); // false

  function Onlynumbers(e)
{
	var tecla=new Number();
	if(window.event) {
		tecla = e.keyCode;
	}
	else if(e.which) {
		tecla = e.which;
	}
	else {
		return true;
	}
	if((tecla >= "97") && (tecla <= "122")){
		return false;
	}
}

function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody)
        tbody.innerHTML = listaRegistros.usuario.map(usuario =>{
            return `<tr>
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.tel}</td>
                <td>${usuario.cel}</td>
                <td>${usuario.mail}</td>
                <td>${usuario.nascimento}</td>
                <td>${usuario.habilidades}</td>
                <td>${usuario.Sexo}</td>
                <td>
                    <button onclick='vizualizar("cadastro",false,${usuario.id})'>Editar</button>
                    <button class='vermelho' onclick='perguntarSeDeleta(${usuario.id})'>Deletar</button>
                </td>
            </tr>`
        }).join('')
}

function insertUsuario(nome, cpf, tel, cel, mail, nascimento, habilidades, Sexo){
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id
    listaRegistros.usuario.push({
        id, nome, cpf, tel, cel, mail, nascimento, habilidades, Sexo
    })
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function editUsuario(id, nome, cpf, tel, cel, mail, nascimento, habilidades, Sexo){
    var usuario = listaRegistros.usuario.find( usuario => usuario.id == id )
    usuario.nome = nome;
    usuario.cpf = cpf;
    usuario.tel = tel;
    usuario.cel = cel;
    usuario.mail = mail;
    usuario.nascimento = nascimento;
    usuario.habilidades = habilidades;
    usuario.Sexo = Sexo;
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function deleteUsuario(id){
    listaRegistros.usuario = listaRegistros.usuario.filter( usuario => {
        return usuario.id != id
    })
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id){
    if(confirm('Deseja mesmo deletar o registro de id '+id)){
        deleteUsuario(id)
        desenhar()
    }
}

function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('cpf').value = ''
    document.getElementById('tel').value = ''
    document.getElementById('cel').value = ''
    document.getElementById('mail').value = ''
    document.getElementById('nascimento').value = ''
    document.getElementById('habilidades').value = ''
    document.getElementById('Sexo').value = ''
}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao()
        if(id){
            const usuario = listaRegistros.usuario.find(usuario => usuario.id == id)
            if(usuario){
                document.getElementById('id').value = usuario.id
                document.getElementById('nome').value = usuario.nome
                document.getElementById('cpf').value = usuario.cpf
                document.getElementById('tel').value = usuario.tel
                document.getElementById('cel').value = usuario.cel
                document.getElementById('mail').value = usuario.mail
                document.getElementById('nascimento').value = usuario.nascimento
                document.getElementById('habilidades').value = usuario.habilidades
                document.getElementById('Sexo').value = usuario.Sexo
            }
        }
    }
}

function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        tel: document.getElementById('tel').value,
        cel: document.getElementById('cel').value,
        mail: document.getElementById('mail').value,
        nascimento: document.getElementById('nascimento').value,
        habilidades: document.getElementById('habilidades').value,
        Sexo: document.getElementById('Sexo').value,
    }
    if(data.id){
        editUsuario(data.id,data.nome, data.cpf, data.tel, data.cel, data.mail, data.nascimento, data.habilidades, data.Sexo)
    }else{
        insertUsuario(data.nome, data.cpf, data.tel, data.cel, data.mail, data.nascimento, data.habilidades, data.Sexo)
    }
    console.log(data)
}

window.addEventListener('load',() =>{
    lerBD()

    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})

document.getElementById("btn1").addEventListener("click", pesquisar);

function pesquisar(){
    
var Coluna = "2"

var Filtrar, Tabela, tr, td, th, i;

Filtrar = document.getElementById("Busca");
Filtrar = Filtrar.value.toUpperCase();

Tabela = document.getElementById("Tab");
tr = Tabela.getElementsByTagName("tr");
th = Tabela.getElementsByTagName("th");

for (i = 0; i <tr.length; i++){

    td = tr[i].getElementsByTagName("td")[Coluna];

    if (td){
        if (td.innerHTML.toLocaleUpperCase().indexOf(Filtrar) > -1){

        tr[i].style.display = "";

        }else{
            tr[i].style.display = "none"
        
        }
      }
    }
}


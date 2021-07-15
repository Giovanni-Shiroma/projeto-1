var lista = []
// VALIDAR SE TEM ERROS NO FORMULARIO 
function validaçao() {
    var mercadoria = document.getElementById("mercadoria").value;
    var valor = document.getElementById("valor").value;
    val = document.getElementById('formulario').value;
    
    
    if (mercadoria == "") {
        document.getElementById("mercadoria").focus();
        document.getElementById("erro-nome").innerHTML = "Nome não informado";
        return false;
        
    } else if (valor == "") {
        document.getElementById("valor").focus();
        document.getElementById("erro-nome").innerHTML = "";
        document.getElementById("erro-valor").innerHTML = "Valor não informado";
        return false;
        
    } else {
        document.getElementById("erro-nome").innerHTML = "";
        document.getElementById("erro-valor").innerHTML = "";
        return true;
    }
}

// FUNÇÃO PARA BOTÃO ADICIONAR TRANSAÇAO 
function validar() {
    if (validaçao() == true) {
        var tipos = document.getElementById("tipos").value;
        var mercadoria = document.getElementById("mercadoria").value;
        var valor = document.getElementById("valor").value;
        
        if (tipos == "compras") {
            valor = parseFloat(valor) * -1;
        } else {
            valor = parseFloat(valor);
        }
        lista.push({
            mercadoria: mercadoria,
            valor: valor,
            tipos: tipos
        })
        console.log('lista', lista)
        localStorage.setItem('lista', JSON.stringify(lista))
        
        document.getElementById("mercadoria").value = "";
        document.getElementById("valor").value = "";
        document.getElementById("tipos").value = "";
    }
    return false;
}

function listaDados() {
    lista = JSON.parse(localStorage.getItem('lista'))
    console.log("LISTA POPULADA ", lista);
    
    document.getElementById('lista').innerHTML == '';
    
    var total = 0;
    for (let idx_aln in lista) {
        console.log("NOME PRODUTO", lista[idx_aln].mercadoria);
        document.getElementById('lista').innerHTML +=
        `
        <td colspan="3"><img src="./linha.png" class="linha-extrato"></td>'
        <br>
        <tr>
        <td class="col-1">` + lista[idx_aln].tipos + `</td>
        <td class="col-2">` + lista[idx_aln].mercadoria + `</td>
        <td class="col-3">` + lista[idx_aln].valor + `</td>'
        </tr>
        `     
    }
}
// MASK

function mascara() {
    var val = document.getElementById("valor");
    var res = val.value;
    res = res.replace(/\D/g, "");
    res = res.replace(/([0-9]{2})$/g, ",$1");
    if (res.length > 6) {
        res = res.replace(/([0-9 ]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    val.value = res;
}

// CLEAN

function limpar() {
    var escolha = confirm("CONFIRME AQUI!");
    if (escolha == true) {
        localStorage.clear();
        window.location.reload();
        return;
    } else(escolha == false)
    alert('LIMPEZA CANCELADA!')
    window.location.reload();
    return;
}
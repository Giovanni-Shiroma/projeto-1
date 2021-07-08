//  function validar() {
//     var mercadoria = formulario.mercadoria;
//     var valor = formulario.valor;

//     if (mercadoria.value == ""  || mercadoria == null)  {
//         // verificar se o nome está vazio
//         document.getElementById("erro-nome").innerHTML = "Nome não informado";

//         // Deixa o input com o focus
//         mercadoria.focus();
//         // retorna a função e não olha as outras linhas
//         return;
//     }
//     if (valor.value == "") {
//         alert("Valor não informado");

//         valor.focus();
//         return;
//     }
// }


function validaçao() {
    var mercadoria = document.getElementById("mercadoria").value;
    var valor = document.getElementById("valor").value;

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

function validar() {
    if (validaçao() == true) {
        var tipos = document.getElementById("tipos")
        var opcao = tipos.options[selecao.selectedIndex].value;
        var mercadoria = document.getElementById("mercadoria").value;
        var valor = document.getElementById("valor").value;

        if (opcao == "compra") {
            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            resultado = resultado - parseFloat(valor);
            document.getElementById("mercadoria").value = "";
            document.getElementById("valor").value = "";

        } else {

            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            document.getElementById("mercadoria").value = "";
            document.getElementById("valor").value = "";
        }
    }
}

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


function limpar() {
    var escolha = confirm("Confirme aqui!");
    if (escolha == true) {
        localStorage.clear();
        window.location.reload();
    }
}

localStorage.getItem 
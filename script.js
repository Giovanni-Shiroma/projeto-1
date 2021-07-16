var lista = []
var aluno = "4863"
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
            tipos: tipos,
            total: total
        })
        console.log('lista', lista)
        localStorage.setItem('lista', JSON.stringify(lista))

        document.getElementById("mercadoria").value = "";
        document.getElementById("valor").value = "";
        document.getElementById("tipos").value = "";
        listaDados()
        somaExtrato()
    }
    return false;

}


function listaDados() {
    lista = JSON.parse(localStorage.getItem('lista'))
    console.log("LISTA POPULADA ", lista);
    document.getElementById('lista').innerHTML == '';


    var total = 0;
    for (let idx_aln in lista) {
        total += parseFloat(lista[idx_aln].valor);
        var sinais = "+"
        if (lista[idx_aln].tipos == "compras") {
            sinais = "-"
        }
        console.log("NOME PRODUTO", lista[idx_aln]);
        document.getElementById('lista').innerHTML += `
        <div class="linhas" id="linhas">
        <span>` + sinais + `</span><p class="plinha">` + lista[idx_aln].mercadoria + `</p>
           <p class="valorex">` + lista[idx_aln].valor + `</p>
           </div>
        `;
    }

    document.querySelector('.resultado').innerHTML = total
    if (total < 0) {

        document.getElementById("resultFinal").innerHTML = "[PREJUIZO]";

    } else {

        document.getElementById("resultFinal").innerHTML = "[LUCRO]";

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
    event.preventDefault();
    return;
}

function salvar() {
    lista = JSON.stringify(localStorage.getItem("lista"));
    var datas = []

    if (lista != null) {
        fetch('https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico?fields=Aluno&fields=Json', {
            headers: {
                Authorization: 'Bearer key2CwkHb0CKumjuM'
            }

        }).then((resp) => {

            return resp.json()
        }).then((data) => {
            datas = data.records


            datas.forEach(element => {

                if (element.fields.Aluno == "4863") {
                    found = element.fields.Aluno.toString();
                    id = element.id.toString();
                }


            })


        })


        if (found != "4863") {
            fetch('https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico', {
                method: "POST",
                headers: {
                    Authorization: 'Bearer key2CwkHb0CKumjuM',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{
                            fields: {
                                Aluno: '4863',
                                Json: lista
                            }

                        }

                    ]

                })



            })

        } else {
            fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico/" + id, {
                method: "PUT",
                headers: {
                    Authorization: 'Bearer key2CwkHb0CKumjuM',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    records: [{
                            fields: {
                                Aluno: '4863',
                                Json: lista
                            }

                        }

                    ]
                })
            })
        }
    }
}
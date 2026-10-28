document.addEventListener('DOMContentLoaded', function () {

    
    // NOVO CHAMADO
    

    const btnOpenNew = document.getElementById('btnOpenNew');
    const btnCloseNew = document.getElementById('btnCloseNew');
    const btnCancelNew = document.getElementById('btnCancelNew');
    const drawerNew = document.getElementById('drawerNew');
    const overlay = document.getElementById('overlay');
    const btnSubmitNew = drawerNew.querySelector('.drawer-submit');

    function openDrawer() {
        drawerNew.classList.add('show');
        overlay.classList.add('show');
    }

    function closeDrawer() {
        drawerNew.classList.remove('show');
        overlay.classList.remove('show');
    }

    btnOpenNew.addEventListener('click', openDrawer);

    btnCloseNew.addEventListener('click', closeDrawer);

    btnCancelNew.addEventListener('click', closeDrawer);

    overlay.addEventListener('click', closeDrawer);


   
    // ABRIR NOVO CHAMADO
    
    btnSubmitNew.addEventListener('click', function () {

        const title =
            document.getElementById('fTitle').value.trim();

        const requester =
            document.getElementById('fRequester').value.trim();

        const sector =
            document.getElementById('fSector').value.trim();

        const category =
            document.getElementById('fCategory').value;

        const priority =
            document.getElementById('fPriority').value;

        const description =
            document.getElementById('fDesc').value.trim();


        // Validação

        if (!title || !requester || !sector || !description) {

            alert('Preencha todos os campos obrigatórios.');

            return;
        }


        // Número automático do chamado

        const chamadosExistentes =
        document.querySelectorAll('.ticket-row').length;

        const proximoNumero =
        chamadosExistentes + 1;

        const numeroChamado =
         'INC-2026-' +
        String(proximoNumero).padStart(4, '0');


        console.log('Novo chamado:', {
            numeroChamado,
            title,
            requester,
            sector,
            category,
            priority,
            description
        });

        tickets[numeroChamado] = {
         title: title,
         requester: requester,
         description: description,
         status: 'Aberto',
         priority: priority,
         assignee: ''
     };

        // Adiciona o chamado na tabela

        adicionarChamadoNaTabela({

            numero: numeroChamado,
            titulo: title,
            solicitante: requester,
            setor: sector,
            categoria: category,
            prioridade: priority,
            status: 'Aberto'

        });

        atualizarEstatisticas();

        alert('Chamado aberto com sucesso!');


        // Limpa o formulário

        document.getElementById('fTitle').value = '';

        document.getElementById('fRequester').value = '';

        document.getElementById('fSector').value = '';

        document.getElementById('fCategory').value = 'Hardware';

        document.getElementById('fPriority').value = 'Média';

        document.getElementById('fDesc').value = '';


        closeDrawer();

    });



    // ADICIONAR CHAMADO NA TABELA
  
    function adicionarChamadoNaTabela(chamado) {

    const tbody =
        document.querySelector('tbody');

    const agora = new Date();

    const dataAtual =
    String(agora.getDate()).padStart(2, '0') +
    '/' +
    String(agora.getMonth() + 1).padStart(2, '0') +
    '/' +
    agora.getFullYear() +
    ' ' +
    String(agora.getHours()).padStart(2, '0') +
    ':' +
    String(agora.getMinutes()).padStart(2, '0');

    const novaLinha =
        document.createElement('tr');

    novaLinha.classList.add('ticket-row');

    novaLinha.dataset.ticket =
        chamado.numero;

    let classePrioridade = '';

    if (chamado.prioridade === 'Baixa') {
        classePrioridade = 'prioridade-baixa';
    } else if (chamado.prioridade === 'Média') {
        classePrioridade = 'prioridade-media';
    } else if (chamado.prioridade === 'Alta') {
        classePrioridade = 'prioridade-alta';
    } else if (chamado.prioridade === 'Crítica') {
        classePrioridade = 'prioridade-critica';
    }

    let classeStatus = 'status-aberto';

    if (chamado.status === 'Em andamento') {
        classeStatus = 'status-andamento';
    } else if (chamado.status === 'Aguardando') {
        classeStatus = 'status-aguardando';
    } else if (chamado.status === 'Resolvido') {
        classeStatus = 'status-resolvido';
    } else if (chamado.status === 'Fechado') {
        classeStatus = 'status-fechado';
    }

    novaLinha.innerHTML = `
        <td>
            <div class="id-cell">
                <span class="status-dot aberto"></span>
                ${chamado.numero}
            </div>

            <div class="ticket-title">
                ${chamado.titulo}
            </div>

            <div class="ticket-meta">
                ${chamado.categoria}
            </div>
        </td>

        <td>
            ${chamado.solicitante}

            <div class="ticket-meta">
                ${chamado.setor}
            </div>
        </td>

        <td>
            ${chamado.categoria}
        </td>

        <td>
            <span class="badge ${classePrioridade}">
                ${chamado.prioridade}
            </span>
        </td>

        <td>
            <span class="badge ${classeStatus}">
                ${chamado.status}
            </span>
        </td>

        <td class="time-mono">
            ${dataAtual}
        </td>
    `;

    tbody.appendChild(novaLinha);


   
    // ABRIR DETALHES DO NOVO CHAMADO
  
    novaLinha.addEventListener('click', function () {

        const ticketNumber =
            novaLinha.dataset.ticket;

        const ticket =
            tickets[ticketNumber];

        if (!ticket) {
            console.log(
                'Chamado não encontrado:',
                ticketNumber
            );

            return;
        }

        document.getElementById('dTitle').textContent =
            ticket.title;

        document.getElementById('dId').textContent =
            ticketNumber;

        document.querySelector(
            '#drawerDetail .detail-value'
        ).textContent =
            ticket.requester;

        document.querySelector(
            '#drawerDetail .detail-desc'
        ).textContent =
            ticket.description;

        document.getElementById('dStatus').value =
            ticket.status;

        document.getElementById('dPriority').value =
            ticket.priority;

        document.getElementById('dAssignee').value =
            ticket.assignee;

        drawerDetail.classList.add('show');

        overlay.classList.add('show');

    });

}

   
    // DADOS DOS CHAMADOS
    
    const tickets = {

        "INC-2026-0001": {

            title:
                "Notebook não liga após queda de energia",

            requester:
                "Marina Alves",

            description:
                "O notebook não liga após uma queda de energia. " +
                "O equipamento estava funcionando normalmente antes do ocorrido.",

            status:
                "Em andamento",

            priority:
                "Alta",

            assignee:
                "Rafael Souza"

        },


        "INC-2026-0002": {

            title:
                "Problema de acesso ao sistema",

            requester:
                "João Pedro Lima",

            description:
                "O usuário não consegue acessar o sistema interno.",

            status:
                "Aberto",

            priority:
                "Média",

            assignee:
                ""

        }

    };


    
    // DETALHES DO CHAMADO

    const ticketRows =
        document.querySelectorAll('.ticket-row');

    const btnCloseDetail =
        document.getElementById('btnCloseDetail');

    const btnCancelDetail =
        document.getElementById('btnCancelDetail');

    const drawerDetail =
        document.getElementById('drawerDetail');


    ticketRows.forEach(function (row) {

        row.addEventListener('click', function () {

            const ticketNumber =
                row.dataset.ticket;


            const ticket =
                tickets[ticketNumber];


            if (!ticket) {

                console.log(
                    'Chamado não encontrado:',
                    ticketNumber
                );

                return;
            }


            document.getElementById('dTitle').textContent =
                ticket.title;


            document.getElementById('dId').textContent =
                ticketNumber;


            document.querySelector(
                '#drawerDetail .detail-value'
            ).textContent =
                ticket.requester;


            document.querySelector(
                '#drawerDetail .detail-desc'
            ).textContent =
                ticket.description;


            document.getElementById('dStatus').value =
                ticket.status;


            document.getElementById('dPriority').value =
                ticket.priority;


            document.getElementById('dAssignee').value =
                ticket.assignee;


            drawerDetail.classList.add('show');

            overlay.classList.add('show');

        });

    });


    
    // FECHAR DETALHES
 
    btnCloseDetail.addEventListener('click', function () {

        drawerDetail.classList.remove('show');

        overlay.classList.remove('show');

    });


    btnCancelDetail.addEventListener('click', function () {

        drawerDetail.classList.remove('show');

        overlay.classList.remove('show');

    });


    // BUSCA

    const searchInput =
        document.querySelector('.search');


    searchInput.addEventListener('input', function () {

        const texto =
            searchInput.value.toLowerCase().trim();


        const linhas =
            document.querySelectorAll('.ticket-row');


        linhas.forEach(function (linha) {

            const conteudo =
                linha.textContent.toLowerCase();


            if (conteudo.includes(texto)) {

                linha.style.display = '';

            } else {

                linha.style.display = 'none';

            }

        });

    });


   
    // FILTRO DE STATUS

    const filterStatus =
        document.querySelectorAll('.filter')[0];


    filterStatus.addEventListener('change', function () {

        const statusSelecionado =
            filterStatus.value;


        const linhas =
            document.querySelectorAll('.ticket-row');


        linhas.forEach(function (linha) {

            if (
                !statusSelecionado ||
                statusSelecionado === 'Todos' ||
                linha.textContent.includes(statusSelecionado)
            ) {

                linha.style.display = '';

            } else {

                linha.style.display = 'none';

            }

        });

    });


  
    // FILTRO DE PRIORIDADE
  
    const filterPriority =
        document.querySelectorAll('.filter')[1];


    filterPriority.addEventListener('change', function () {

        const prioridadeSelecionada =
            filterPriority.value;


        const linhas =
            document.querySelectorAll('.ticket-row');


        linhas.forEach(function (linha) {

            if (
                !prioridadeSelecionada ||
                prioridadeSelecionada === 'Todas' ||
                linha.textContent.includes(prioridadeSelecionada)
            ) {

                linha.style.display = '';

            } else {

                linha.style.display = 'none';

            }

        });

    });


   
    // FILTRO DE CATEGORIA

    const filterCategory =
        document.querySelectorAll('.filter')[2];


    filterCategory.addEventListener('change', function () {

        const categoriaSelecionada =
            filterCategory.value;


        const linhas =
            document.querySelectorAll('.ticket-row');


        linhas.forEach(function (linha) {

            if (
                !categoriaSelecionada ||
                categoriaSelecionada === 'Todas' ||
                linha.textContent.includes(categoriaSelecionada)
            ) {

                linha.style.display = '';

            } else {

                linha.style.display = 'none';

            }

        });

    });

       
    // EXPORTAR PARA EXCEL
   
    const btnExport =
        document.querySelector('.btn-export');

    btnExport.addEventListener('click', function () {

        const tabela =
            document.querySelector('table');

        const workbook =
            XLSX.utils.table_to_book(tabela, {
                sheet: 'Chamados'
            });

        XLSX.writeFile(
            workbook,
            'chamados-helpdesk.xlsx'
        );

    });

       
    // CADASTRAR USUÁRIO
   
    const btnOpenUser =
        document.getElementById('btnOpenUser');

    const btnCloseUser =
        document.getElementById('btnCloseUser');

    const btnCancelUser =
        document.getElementById('btnCancelUser');

    const drawerUser =
        document.getElementById('drawerUser');


    // Abrir drawer

    btnOpenUser.addEventListener('click', function () {

        drawerUser.classList.add('show');

        overlay.classList.add('show');

    });


    // Fechar pelo X

    btnCloseUser.addEventListener('click', function () {

        drawerUser.classList.remove('show');

        overlay.classList.remove('show');

    });


    // Fechar pelo botão Fechar

    btnCancelUser.addEventListener('click', function () {

        drawerUser.classList.remove('show');

        overlay.classList.remove('show');

    });


       
    // USUÁRIOS CADASTRADOS
   
    const btnOpenUsers =
        document.getElementById('btnOpenUsers');

    const btnCloseUsers =
        document.getElementById('btnCloseUsers');

    const btnCancelUsers =
        document.getElementById('btnCancelUsers');

    const drawerUsers =
        document.getElementById('drawerUsers');


    // Abrir painel

    btnOpenUsers.addEventListener('click', function () {

        drawerUsers.classList.add('show');

        overlay.classList.add('show');

    });


    // Fechar pelo X

    btnCloseUsers.addEventListener('click', function () {

        drawerUsers.classList.remove('show');

        overlay.classList.remove('show');

    });


    // Fechar pelo botão Fechar

    btnCancelUsers.addEventListener('click', function () {

        drawerUsers.classList.remove('show');

        overlay.classList.remove('show');

    });

   
// CADASTRAR USUÁRIO - SOMENTE FRONTEND

const btnSubmitUser =
    document.getElementById('btnSubmitUser');

const userRegisterError =
    document.getElementById('userRegisterError');


btnSubmitUser.addEventListener('click', function () {

    const nome =
        document.getElementById('uName').value.trim();

    const login =
        document.getElementById('uLogin').value.trim();

    const perfil =
        document.getElementById('uProfile').value;

    const setor =
        document.getElementById('uSector').value.trim();

    const funcao =
        document.getElementById('uFunction').value.trim();


    // Limpa mensagem anterior
    userRegisterError.textContent = '';


    
    // VALIDAÇÃO
    
    if (!nome || !login || !setor || !funcao) {

        userRegisterError.textContent =
            'Preencha todos os campos obrigatórios.';

        return;
    }


    
    // CRIAR INICIAIS
    
    const partesNome =
        nome.split(' ').filter(function (parte) {
            return parte.trim() !== '';
        });


    let iniciais = '';

    if (partesNome.length >= 2) {

        iniciais =
            partesNome[0].charAt(0) +
            partesNome[partesNome.length - 1].charAt(0);

    } else {

        iniciais =
            partesNome[0].substring(0, 2);

    }


    iniciais =
        iniciais.toUpperCase();


   
    // CRIAR USUÁRIO NA LISTA
 
    const usersList =
        document.querySelector('.users-list');


    const novoUsuario =
        document.createElement('div');

    novoUsuario.classList.add('user-item');


    const textoPerfil =
        perfil === 'tecnico'
            ? 'Técnico de TI'
            : 'Usuário';


    novoUsuario.innerHTML = `

        <div class="user-item-avatar">
            ${iniciais}
        </div>

        <div class="user-item-info">

            <div class="user-item-name">
                ${nome}
            </div>

            <div class="user-item-login">
                ${login}
            </div>

            <div class="user-item-details">
                ${setor} · ${funcao}
            </div>

        </div>

        <span class="user-role ${perfil}">
            ${textoPerfil}
        </span>

        <button
            type="button"
            class="btn-remove-user">
            Remover
        </button>

    `;


    usersList.appendChild(novoUsuario);


    
    // BOTÃO REMOVER DO NOVO USUÁRIO
    
    const novoBotaoRemover =
        novoUsuario.querySelector('.btn-remove-user');


    novoBotaoRemover.addEventListener('click', function () {

        const nomeUsuario =
            novoUsuario
                .querySelector('.user-item-name')
                .textContent
                .trim();


        const confirmar =
            confirm(
                'Deseja remover o usuário ' +
                nomeUsuario +
                '?'
            );


        if (!confirmar) {
            return;
        }


        novoUsuario.remove();
        atualizarContadorUsuarios();

    });


    
    // LIMPAR FORMULÁRIO
   
    document.getElementById('uName').value = '';
    document.getElementById('uLogin').value = '';
    document.getElementById('uProfile').value = 'usuario';
    document.getElementById('uSector').value = '';
    document.getElementById('uFunction').value = '';


    
    // FECHAR DRAWER
    
    drawerUser.classList.remove('show');
    overlay.classList.remove('show');


    alert('Usuário cadastrado com sucesso!');

    

});



// ATUALIZAR CONTADOR DE USUÁRIOS

function atualizarContadorUsuarios() {

    const usuarios =
        document.querySelectorAll('.user-item');

    const contador =
        document.querySelector('.users-count strong');

    if (contador) {

        contador.textContent =
            usuarios.length;

    }

}


       
    // REMOVER USUÁRIO - SOMENTE FRONTEND
   
    const botoesRemover =
        document.querySelectorAll('.btn-remove-user');

    botoesRemover.forEach(function (botao) {

        botao.addEventListener('click', function () {

            const usuario =
                botao.closest('.user-item');

            if (!usuario) {
                return;
            }

            const nome =
                usuario.querySelector('.user-item-name').textContent.trim();

            const confirmar =
                confirm('Deseja remover o usuário ' + nome + '?');

            if (!confirmar) {
                return;
            }

            usuario.remove();
            atualizarContadorUsuarios();

        });

    });

        
    // BUSCA DE USUÁRIOS
    
    const userSearch =
        document.getElementById('userSearch');

    userSearch.addEventListener('input', function () {

        const texto =
            userSearch.value.toLowerCase().trim();

        const usuarios =
            document.querySelectorAll('.user-item');

        usuarios.forEach(function (usuario) {

            const conteudo =
                usuario.textContent.toLowerCase();

            if (conteudo.includes(texto)) {

                usuario.style.display = '';

            } else {

                usuario.style.display = 'none';

            }

        });

    });

        
    // MINHA CONTA
    
    const btnOpenAccount =
        document.getElementById('btnOpenAccount');

    const btnCloseAccount =
        document.getElementById('btnCloseAccount');

    const btnCancelAccount =
        document.getElementById('btnCancelAccount');

    const drawerAccount =
        document.getElementById('drawerAccount');

    const btnChangePassword =
    document.getElementById('btnChangePassword');

    const passwordForm =
    document.getElementById('passwordForm');

    // Abrir Minha conta

    btnOpenAccount.addEventListener('click', function () {

        drawerAccount.classList.add('show');

        overlay.classList.add('show');

    });


    // Fechar pelo X

    btnCloseAccount.addEventListener('click', function () {

        drawerAccount.classList.remove('show');

        overlay.classList.remove('show');

    });


    // Fechar pelo botão Fechar

    btnCancelAccount.addEventListener('click', function () {

        drawerAccount.classList.remove('show');

        overlay.classList.remove('show');

    });

    btnChangePassword.addEventListener('click', function () {
    passwordForm.style.display = 'block';
    btnChangePassword.style.display = 'none';
   });

   
   
// SALVAR / CANCELAR ALTERAÇÃO DE SENHA

const btnSavePassword =
    document.getElementById('btnSavePassword');

const btnCancelPassword =
    document.getElementById('btnCancelPassword');

const currentPassword =
    document.getElementById('currentPassword');

const newPassword =
    document.getElementById('newPassword');

const confirmPassword =
    document.getElementById('confirmPassword');


// CANCELAR ALTERAÇÃO
btnCancelPassword.addEventListener('click', function () {

    passwordForm.style.display = 'none';

    btnChangePassword.style.display = 'inline-block';

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

});


// SALVAR NOVA SENHA
btnSavePassword.addEventListener('click', function () {

    const senhaAtual = currentPassword.value.trim();
    const novaSenha = newPassword.value.trim();
    const confirmarSenha = confirmPassword.value.trim();


    if (senhaAtual === '') {

        alert('Digite sua senha atual.');

        currentPassword.focus();

        return;
    }


    if (novaSenha === '') {

        alert('Digite a nova senha.');

        newPassword.focus();

        return;
    }


    if (novaSenha.length < 6) {

        alert('A nova senha deve possuir pelo menos 6 caracteres.');

        newPassword.focus();

        return;
    }


    if (confirmarSenha === '') {

        alert('Confirme a nova senha.');

        confirmPassword.focus();

        return;
    }


    if (novaSenha !== confirmarSenha) {

        alert('A nova senha e a confirmação não são iguais.');

        confirmPassword.focus();

        return;
    }


    // SOMENTE FRONTEND POR ENQUANTO
    alert('Senha alterada com sucesso!');


    passwordForm.style.display = 'none';

    btnChangePassword.style.display = 'inline-block';

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

});

const navTodos = document.getElementById('navTodos');
const navAbertos = document.getElementById('navAbertos');
const navAndamento = document.getElementById('navAndamento');
const navResolvidos = document.getElementById('navResolvidos');

function marcarMenuAtivo(menu) {

    document.querySelectorAll('.nav-item').forEach(function (item) {
        item.classList.remove('active');
    });

    menu.classList.add('active');
}

//TODOS OS CHAMADOS
navTodos.addEventListener('click', function () {

    marcarMenuAtivo(navTodos);

    document.querySelectorAll('.ticket-row').forEach(function (linha) {
        linha.style.display = '';
    });
});


//EM ABERTO
navAbertos.addEventListener('click', function () {

    marcarMenuAtivo(navAbertos);

    document.querySelectorAll('.ticket-row').forEach(function (linha) {

        const texto = linha.textContent;

        if(texto.includes('Aberto')) {
            linha.style.display = '';
        }else {
            linha.style.display = 'none';
        }
    });
});

// EM ANDAMENTO
navAndamento.addEventListener('click', function () {

    marcarMenuAtivo(navAndamento);

    document.querySelectorAll('.ticket-row').forEach(function (linha) {
        
        const texto = linha.textContent;

        if(texto.includes('Em andamento')) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });

});

//RESOLVIDOS
navResolvidos.addEventListener('click', function () {

    marcarMenuAtivo(navResolvidos);

    document.querySelectorAll('.ticket-row').forEach(function (linha) {

        const texto = linha.textContent;

        if(texto.includes('Resolvido')) {
            linha.style.display = '';
        }else {
            linha.style.display = 'none';
        }
    });
});


// ATUALIZAR ESTATÍSTICAS

function atualizarEstatisticas() {

    let aberto = 0;
    let andamento = 0;
    let aguardando = 0;
    let resolvido = 0;


    const linhas =
        document.querySelectorAll('.ticket-row');


    linhas.forEach(function (linha) {

        const texto =
            linha.textContent.toLowerCase();


        if (texto.includes('em andamento')) {

            andamento++;

        }
        else if (texto.includes('aguardando')) {

            aguardando++;

        }
        else if (texto.includes('resolvido')) {

            resolvido++;

        }
        else if (texto.includes('aberto')) {

            aberto++;

        }

    });


    document.getElementById('statAberto').textContent =
        aberto;

    document.getElementById('statAndamento').textContent =
        andamento;

    document.getElementById('statAguardando').textContent =
        aguardando;

    document.getElementById('statResolvido').textContent =
        resolvido;

}


// Atualiza as estatísticas ao carregar a página
atualizarEstatisticas();

});
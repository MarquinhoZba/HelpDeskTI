document.addEventListener('DOMContentLoaded', function () {

    const btnOpenNew =
        document.getElementById('btnOpenNew');

    const btnCloseNew =
        document.getElementById('btnCloseNew');

    const btnCancelNew =
        document.getElementById('btnCancelNew');

    const drawerNew =
        document.getElementById('drawerNew');

    const overlay =
        document.getElementById('overlay');


    
    // NOVO CHAMADO - ABRIR GAVETA
   
    btnOpenNew.addEventListener('click', function () {

        drawerNew.classList.add('show');

        overlay.classList.add('show');

    });


  
    // FECHAR PELO X
    
    btnCloseNew.addEventListener('click', function () {

        drawerNew.classList.remove('show');

        overlay.classList.remove('show');

    });


    
    // CANCELAR NOVO CHAMADO
    
    btnCancelNew.addEventListener('click', function () {

        drawerNew.classList.remove('show');

        overlay.classList.remove('show');

    });


   
    // FECHAR CLICANDO NO FUNDO
   
    overlay.addEventListener('click', function () {

        drawerNew.classList.remove('show');

        overlay.classList.remove('show');

    });


    
    // ELEMENTOS DOS DETALHES
    
    const ticketRows =
        document.querySelectorAll('.ticket-row');

    const drawerDetail =
        document.getElementById('drawerDetail');

    const btnCloseDetail =
        document.getElementById('btnCloseDetail');

    const btnCancelDetail =
        document.getElementById('btnCancelDetail');


    
    // CHAMADOS
   
    const tickets = {

        "INC-2026-0001": {

            title:
                "Notebook não liga após queda de energia",

            requester:
                "Fulano",

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
                "Fulano",

            description:
                "O usuário não consegue acessar o sistema interno.",

            status:
                "Aberto",

            priority:
                "Média",

            assignee:
                "Não atribuído"

        }

    };


    
    // ABRIR DETALHES DO CHAMADO
   
    function abrirDetalhesChamado(row) {

        const ticketNumber =
            row.dataset.ticket;

        const ticket =
            tickets[ticketNumber];

        if (!ticket) {

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


        document.getElementById('dStatus').textContent =
            ticket.status;


        document.getElementById('dPriority').textContent =
            ticket.priority;


        document.getElementById('dAssignee').textContent =
            ticket.assignee;


        drawerDetail.classList.add('show');

        overlay.classList.add('show');

    }


    
    // CLIQUE NOS CHAMADOS EXISTENTES

    ticketRows.forEach(function (row) {

        row.addEventListener('click', function () {

            abrirDetalhesChamado(row);

        });

    });


    
    // FECHAR DETALHES PELO X
    
    btnCloseDetail.addEventListener('click', function () {

        drawerDetail.classList.remove('show');

        overlay.classList.remove('show');

    });


    
    // FECHAR DETALHES
    
    btnCancelDetail.addEventListener('click', function () {

        drawerDetail.classList.remove('show');

        overlay.classList.remove('show');

    });


    
    // BUSCA E FILTROS
    
    const searchInput =
        document.querySelector('.search');

    const filters =
        document.querySelectorAll('.filter');

    const filterStatus =
        filters[0];

    const filterPriority =
        filters[1];

    const filterCategory =
        filters[2];


    function filtrarChamados() {

        const texto =
            searchInput.value.toLowerCase().trim();

        const statusSelecionado =
            filterStatus.value;

        const prioridadeSelecionada =
            filterPriority.value;

        const categoriaSelecionada =
            filterCategory.value;


        const linhas =
            document.querySelectorAll('.ticket-row');


        linhas.forEach(function (linha) {

            const conteudo =
                linha.textContent.toLowerCase();


            const correspondeBusca =
                conteudo.includes(texto);


            const correspondeStatus =
                statusSelecionado === 'Status: todos' ||
                conteudo.includes(
                    statusSelecionado.toLowerCase()
                );


            const correspondePrioridade =
                prioridadeSelecionada === 'Prioridade: todas' ||
                conteudo.includes(
                    prioridadeSelecionada.toLowerCase()
                );


            const correspondeCategoria =
                categoriaSelecionada === 'Categoria: todas' ||
                conteudo.includes(
                    categoriaSelecionada.toLowerCase()
                );


            if (
                correspondeBusca &&
                correspondeStatus &&
                correspondePrioridade &&
                correspondeCategoria
            ) {

                linha.style.display = '';

            } else {

                linha.style.display = 'none';

            }

        });

    }


    
    // BUSCA
   
    searchInput.addEventListener(
        'input',
        filtrarChamados
    );


    
    // FILTRO STATUS

    filterStatus.addEventListener(
        'change',
        filtrarChamados
    );


    
    // FILTRO PRIORIDADE
    
    filterPriority.addEventListener(
        'change',
        filtrarChamados
    );


    
    // FILTRO CATEGORIA
    
    filterCategory.addEventListener(
        'change',
        filtrarChamados
    );


   
    // MINHA CONTA
    
    const btnOpenAccount =
        document.getElementById('btnOpenAccount');

    const btnCloseAccount =
        document.getElementById('btnCloseAccount');

    const btnCancelAccount =
        document.getElementById('btnCancelAccount');

    const drawerAccount =
        document.getElementById('drawerAccount');


    btnOpenAccount.addEventListener('click', function () {

        drawerAccount.classList.add('show');

        overlay.classList.add('show');

    });


    btnCloseAccount.addEventListener('click', function () {

        drawerAccount.classList.remove('show');

        overlay.classList.remove('show');

    });


    btnCancelAccount.addEventListener('click', function () {

        drawerAccount.classList.remove('show');

        overlay.classList.remove('show');

    });


    
    // ALTERAR SENHA
    
    const btnChangePassword =
        document.getElementById('btnChangePassword');

    const passwordForm =
        document.getElementById('passwordForm');

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


    btnChangePassword.addEventListener('click', function () {

        passwordForm.style.display =
            'block';

        btnChangePassword.style.display =
            'none';

    });


    btnCancelPassword.addEventListener('click', function () {

        passwordForm.style.display =
            'none';

        btnChangePassword.style.display =
            'inline-block';


        currentPassword.value = '';

        newPassword.value = '';

        confirmPassword.value = '';

    });


   
    // SALVAR NOVA SENHA
   
    btnSavePassword.addEventListener('click', function () {

        const senhaAtual =
            currentPassword.value.trim();

        const novaSenha =
            newPassword.value.trim();

        const confirmarSenha =
            confirmPassword.value.trim();


        if (senhaAtual === '') {

            alert(
                'Digite sua senha atual.'
            );

            currentPassword.focus();

            return;

        }


        if (novaSenha === '') {

            alert(
                'Digite a nova senha.'
            );

            newPassword.focus();

            return;

        }


        if (novaSenha.length < 6) {

            alert(
                'A nova senha deve possuir pelo menos 6 caracteres.'
            );

            newPassword.focus();

            return;

        }


        if (confirmarSenha === '') {

            alert(
                'Confirme a nova senha.'
            );

            confirmPassword.focus();

            return;

        }


        if (novaSenha !== confirmarSenha) {

            alert(
                'A nova senha e a confirmação não são iguais.'
            );

            confirmPassword.focus();

            return;

        }


        // SOMENTE FRONTEND POR ENQUANTO

        alert(
            'Senha alterada com sucesso!'
        );


        passwordForm.style.display =
            'none';

        btnChangePassword.style.display =
            'inline-block';


        currentPassword.value = '';

        newPassword.value = '';

        confirmPassword.value = '';

    });

   
// ATUALIZAR ESTATÍSTICAS

function atualizarEstatisticas() {

    const linhas =
        document.querySelectorAll('.ticket-row');

    let aberto = 0;
    let andamento = 0;
    let aguardando = 0;
    let resolvido = 0;

    linhas.forEach(function (linha) {

        const texto =
            linha.textContent.toLowerCase();

        if (texto.includes('aberto')) {
            aberto++;
        }

        if (texto.includes('em andamento')) {
            andamento++;
        }

        if (texto.includes('aguardando')) {
            aguardando++;
        }

        if (texto.includes('resolvido')) {
            resolvido++;
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


    
    // NOVO CHAMADO

    const btnSaveNew =
        document.getElementById('btnSaveNew');

    const fTitle =
        document.getElementById('fTitle');

    const fCategory =
        document.getElementById('fCategory');

    const fPriority =
        document.getElementById('fPriority');

    const fDesc =
        document.getElementById('fDesc');


    btnSaveNew.addEventListener('click', function () {

        const titulo =
            fTitle.value.trim();

        const categoria =
            fCategory.value;

        const prioridade =
            fPriority.value;

        const descricao =
            fDesc.value.trim();


        // VALIDAÇÃO DO TÍTULO

        if (titulo === '') {

            alert(
                'Digite o título do chamado.'
            );

            fTitle.focus();

            return;

        }


        // VALIDAÇÃO DA CATEGORIA

        if (categoria === '') {

            alert(
                'Selecione uma categoria.'
            );

            fCategory.focus();

            return;

        }


        // VALIDAÇÃO DA PRIORIDADE

        if (prioridade === '') {

            alert(
                'Selecione a prioridade.'
            );

            fPriority.focus();

            return;

        }


        // VALIDAÇÃO DA DESCRIÇÃO

        if (descricao === '') {

            alert(
                'Digite a descrição do problema.'
            );

            fDesc.focus();

            return;

        }


        
        // GERAR NÚMERO DO CHAMADO
       
        const linhasExistentes =
            document.querySelectorAll(
                '.ticket-row'
            ).length;


        const proximoNumero =
            linhasExistentes + 1;


        const numeroChamado =
            'INC-2026-' +
            String(proximoNumero)
                .padStart(4, '0');


        
        // DATA E HORA
        
        const agora =
            new Date();


        const dataAtual =
            String(
                agora.getDate()
            ).padStart(2, '0') +
            '/' +
            String(
                agora.getMonth() + 1
            ).padStart(2, '0') +
            '/' +
            agora.getFullYear() +
            ' ' +
            String(
                agora.getHours()
            ).padStart(2, '0') +
            ':' +
            String(
                agora.getMinutes()
            ).padStart(2, '0');


        
        // SALVAR OS DADOS DO NOVO CHAMADO
        
        tickets[numeroChamado] = {

            title:
                titulo,

            requester:
                'Fulano',

            description:
                descricao,

            status:
                'Aberto',

            priority:
                prioridade,

            assignee:
                'Não atribuído'

        };


        
        // CRIAR NOVA LINHA
        
        const tbody =
            document.querySelector('tbody');

        let classePrioridade = '';

        if (prioridade === 'Baixa') {
            classePrioridade = 'prioridade-baixa';
        } else if (prioridade === 'Média') {
            classePrioridade = 'prioridade-media';
        } else if (prioridade === 'Alta') {
            classePrioridade = 'prioridade-alta';
        } else if (prioridade === 'Crítica') {
            classePrioridade = 'prioridade-critica';
        }

        const novaLinha =
            document.createElement('tr');


        novaLinha.classList.add(
            'ticket-row'
        );


        novaLinha.dataset.ticket =
            numeroChamado;


        novaLinha.innerHTML = `

            <td>

                <div class="id-cell">

                    <span class="status-dot aberto"></span>

                    ${numeroChamado}

                </div>


                <div class="ticket-title">

                    ${titulo}

                </div>


                <div class="ticket-meta">

                    ${categoria}

                </div>

            </td>


            <td>

                Fulano

                <div class="ticket-meta">

                    Coordenação de Medicina

                </div>

            </td>


            <td>

                ${categoria}

            </td>


            <td>

                <span class="badge ${classePrioridade}">

                    ${prioridade}

                </span>

            </td>


            <td>

                <span class="badge status-aberto">

                    Aberto

                </span>

            </td>


            <td class="time-mono">

                ${dataAtual}

            </td>

        `;


        tbody.appendChild(
            novaLinha
        );


        
        // PERMITIR ABRIR OS DETALHES DO NOVO CHAMADO
        
        novaLinha.addEventListener(
            'click',
            function () {

                abrirDetalhesChamado(
                    novaLinha
                );

            }
        );


        
        // FECHAR DRAWER
        
        drawerNew.classList.remove(
            'show'
        );

        overlay.classList.remove(
            'show'
        );


    
        // LIMPAR FORMULÁRIO
        
        fTitle.value = '';

        fCategory.selectedIndex = 0;

        fPriority.selectedIndex = 1;

        fDesc.value = '';


        
        // MENSAGEM
        
        alert(
            'Chamado ' +
            numeroChamado +
            ' aberto com sucesso!'
        );

        atualizarEstatisticas();

    });


    atualizarEstatisticas();

   
    // SAIR
   
    const btnSair =
        document.querySelector('.sidebar-footer');


    btnSair.addEventListener(
        'click',
        function (event) {

            event.preventDefault();


            const confirmar =
                confirm(
                    'Deseja realmente sair do sistema?'
                );


            if (confirmar) {

                window.location.href =
                    '/Login/Index';

            }

        }
    );

});
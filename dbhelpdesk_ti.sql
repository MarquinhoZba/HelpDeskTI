CREATE DATABASE helpdesk_ti;

USE helpdesk_ti;

CREATE TABLE usuarios (
	idUsuarios   INT AUTO_INCREMENT PRIMARY KEY,
    nome   VARCHAR(100) NOT NULL,
    login  VARCHAR(100) NOT NULL UNIQUE,
    senha  VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    setor  VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    troca_senha_obrigatoria BOOLEAN NOT NULL DEFAULT TRUE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_cadastro  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE categorias (
	idCategorias   INT AUTO_INCREMENT PRIMARY KEY,
    nomeCategoria   VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categorias (nomeCategoria) VALUES 
('Hardware'), ('Software'), ('Rede'), ('Acesso e Senha'), ('Outro');


CREATE TABLE prioridades (
	idPrioridades   INT AUTO_INCREMENT PRIMARY KEY,
    nomePrioridade  VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO prioridades (nomePrioridade) VALUES
('Baixa'), ('Média'), ('Alta'), ('Crítica');


CREATE TABLE status_chamado (
	idStatus INT AUTO_INCREMENT PRIMARY KEY,
    nomeStatus  VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO status_chamado (nomeStatus) VALUES
('Aberto'), ('Em andamento'), ('Aguardando'), ('Resolvido'), ('Fechado');


CREATE TABLE chamados (
	idChamados INT AUTO_INCREMENT PRIMARY KEY,
    numeroChamado VARCHAR(30) NOT NULL UNIQUE,
    titulo   VARCHAR(200) NOT NULL,
    solicitante_id   INT NOT NULL,
    setorChamado   VARCHAR(100) NOT NULL,
    categoria_id  INT NOT NULL,
    prioridade_id  INT NOT NULL,
    status_id  INT NOT NULL,
    tecnico_id   INT NULL,
    descricao  TEXT,
    data_abertura  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_resolucao  TIMESTAMP NULL,
    
    CONSTRAINT fk_chamado_solicitante FOREIGN KEY (solicitante_id) REFERENCES usuarios(idUsuarios),
    
    CONSTRAINT fk_chamado_tecnico FOREIGN KEY (tecnico_id) REFERENCES usuarios(idUsuarios),
    
    CONSTRAINT fk_chamado_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(idCategorias),
    
    CONSTRAINT fk_chamado_prioridade FOREIGN KEY (prioridade_id) REFERENCES prioridades(idPrioridades),
    
    CONSTRAINT fk_chamado_status FOREIGN KEY (status_id) REFERENCES status_chamado(idStatus)
);


 CREATE TABLE notas_chamado (
	idNotas INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT NOT NULL,
    usuario_id INT NOT NULL,
    textoNotas TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_nota_chamado FOREIGN KEY (chamado_id) REFERENCES chamados(idChamados) ON DELETE CASCADE,
    
    CONSTRAINT fk_nota_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(idUsuarios)
 
 );


SHOW TABLES;

SELECT * FROM categorias;
SELECT * FROM prioridades;
SELECT * FROM status_chamado;
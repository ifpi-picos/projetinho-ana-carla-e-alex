const tarefas = [

  // CRIEI ESSE OBJETO PARA FACILITAR NA HORA DOS TESTE
  {
    titulo: "COZINHAR",
    descricao: "ALMOÇO",
    dataVencimento: "02-12-2024",
    prioridade:"Baixa",
    status : "pendente"
  }
];
// CRIEI UMA FUNÇAO PARA ADICIONAR UMA TAREFA
// ADICIONEI O COMANDO .trim() para ELIMINAR OS ESPAÇOS EM BRANCO e (INÍCIO E FINAL) não dar erros no código.
//UTILIZEI NEW DATE PARA COLOCAR A DATA NO FORMATO.
function adicionarTarefa() {
  const titulo = prompt("Digite o título da tarefa:").trim();
  const descricao = prompt("Digite a descrição da tarefa:").trim();
  let dataVencimento = new Date(prompt("Digite a data de vencimento (DD-MM-AAAA):"));
  const prioridade = prompt("Digite a prioridade (Baixa, Média, Alta):").trim();


// Validação dos campos
//UTILIZEI (!) PARA TORNAR O TÍTULO DA TAREFA OBRIGATÓRIO.
if (!titulo) {
  console.log("O título da tarefa é obrigatório.");
  return;
}

// Validação da data
//UTILIZEI isNaN para verificar se a data inserida pelo usuário é válida.
if (isNaN(dataVencimento)) {
  console.log("Data de vencimento inválida. Por favor, insira no formato AAAA-MM-DD.");
  return;
}

// Validação da prioridade
let prioridadesValidas = ["Baixa", "Média", "Alta"];
console.log(`prioridade:${prioridade}:`)
  if (!prioridadesValidas.includes(prioridade)) {
    console.log("Prioridade inválida. Opções válidas: Baixa, Média, Alta.");
    return;
  }
  const novaTarefa = {
    titulo: titulo,
    descricao: descricao,
    dataVencimento: dataVencimento,
    prioridade: prioridade,
    status: "pendente"
  };

  tarefas.push(novaTarefa);
  console.log(tarefas);
  
  console.log("Tarefa adicionada com sucesso!");
}

//FUNÇÃO EDITAR SIMPLES
function editarTarefa() {
  const tarefaEditar = prompt("Digite o título da tarefa a ser editada: ").trim();

   //Essa linha busca a posição (índice) da tarefa que precisa ser editada dentro da lista de tarefas (armazenada em um array chamado tarefas).
   // UTILIZO A FUNÇÃO findIndex para percorrer a função e comparar o titulo que o usuário digitou e o que está na lista.
   // caso encontre o título , ficará armazenado index.
  const index = tarefas.findIndex((tarefa) => tarefa.titulo === tarefaEditar);

  if (index !== -1) {
    //SE A TAREFA FOR ENCONTRADA , O USUÁRIO IRÁ DIGITAR UMA "NOVA TAREFA"
  
    const novoTitulo = prompt("Novo título: ").trim();
    const novaDescricao = prompt("Nova descrição: ").trim();
    const novaDataVencimento = prompt("Nova data de vencimento (DD-MM-AAAA): ").trim();
    const novaPrioridade = prompt("Nova prioridade (Baixa, Média, Alta): ").trim();

    
    
// A TAREFA ANTERIOR IRÁ ATUALIZAR 
    tarefas[index] = {
      titulo: novoTitulo || tarefas[index].titulo, // Se o usuário editar algum campo da parte de cima , será uzado para atualizar o código posterior.
      //  UTILIZEI' || ', POIS CORRESPONDE AO "SE NÃO " .
      // CASO O USUÁRIO NÃO DIGITE UM NOVO "VALOR"  O VALOR ANTIGO É MANTIDO.
      //BASICAMENTE O "(OU) (||)" FUNCIONA DA SEGUINTE MANEIRA : SE O PRIMEIRO VALOR FOR FALSO EXECUTA O OUTRO.

      descricao: novaDescricao || tarefas[index].descricao,
      dataVencimento: novaDataVencimento || tarefas[index].dataVencimento,
      prioridade: novaPrioridade || tarefas[index].prioridade,
      status: tarefas[index].status // Manter o status atual
    };

    console.log("Tarefa editada com sucesso!");
  } else {
    console.log("Tarefa não encontrada!");
  }
}
function removerTarefa() {
  const tarefa = prompt("Digite o título da tarefa a ser removida: ").trim();

  // Encontra o índice da tarefa a ser removido com base no título
  // SE ELE ENCONTRAR O ÍNDICE DA TAREFA É ARMAZENADO NO INDEX
  // NOVAMENTE UTILIZO O findIndex()
  const index = tarefas.findIndex((t) => t.titulo === tarefa);

  if (index !== -1) {
    // Confirmar a remoção
    //Se a tarefa foi encontrada:
//Se o usuário digitar "S" ou "s", a tarefa é removida usando splice() e uma mensagem de sucesso é exibida.
//Caso contrário, a remoção é cancelada.

    const confirmacao = prompt(`Tem certeza que deseja remover a tarefa "${tarefa}"? Digite "S" para SIM ou "N" para NÃO: `).trim();

    if (confirmacao.toLowerCase() === 's') { 
      // Utilizo o toLowerCase para "não diferenciar maiúscula e minúscula"
      // Remover a tarefa e exibir mensagem de sucesso
      const tarefaRemovida = tarefas.splice(index, 1)[0];
      console.log(`Tarefa "${tarefaRemovida.titulo}" removida com sucesso!`);
    } else {
      // SE NÃO A REMOÇÃO É CANCELADA
      console.log("Remoção cancelada.");
    }
  } else {
    console.log("Tarefa não encontrada na lista.");
  }

  return tarefas; // Retornar a lista de tarefas atualizada
}


function marcarComoConcluida() {
  listarTarefas()
  const indiceMarcar = parseInt(prompt("Digite o índice da tarefa a ser marcada como concluída:")) - 1;
  // UTILIZO parseInt para CONVERTER DE STRING PARA UM NÚMERO INTEIRO.
  // SUBTRAIR 1 DO ÍNDICE POIS GERALEMENTE OS USUÁRIOS CONTAR A PARTIR DO 1 E O PROGRAMA A PARTIR D
  console.log(tarefas);
  
  if (indiceMarcar >= 0 && tarefas.length > 0) {
    tarefas[indiceMarcar].status = "concluída";
    console.log("Tarefa marcada como concluída com sucesso!");
  } else {
    console.log("Índice de tarefa inválido.");
  }
}


function listarTarefas(ordenarPor = "dataVencimento", filtrarPor = "todas", prioridade = "todas", dataVencimento = null) {
  let tarefasOrdenadas = [...tarefas]; // Criar uma cópia para não modificar o array original

  // Ordenação
  if (ordenarPor === "dataVencimento") {
    tarefasOrdenadas.sort((a, b) => a.dataVencimento - b.dataVencimento);
  } else if (ordenarPor === "prioridade") {
    tarefasOrdenadas.sort((a, b) => {
      const prioridades = { Baixa: 0, Média: 1, Alta: 2 };
      return prioridades[a.prioridade] - prioridades[b.prioridade];
    });
  } else if (ordenarPor === "dataCriacao") {
    tarefasOrdenadas.sort((a, b) => a.dataCriacao - b.dataCriacao);
  }

  // Filtragem
  if (filtrarPor !== "todas") {
    tarefasOrdenadas = tarefasOrdenadas.filter(tarefa => tarefa.status === filtrarPor);
  }

  if (prioridade !== "todas") {
    tarefasOrdenadas = tarefasOrdenadas.filter(tarefa => tarefa.prioridade === prioridade);
  }

  if (dataVencimento) {
    tarefasOrdenadas = tarefasOrdenadas.filter(tarefa => tarefa.dataVencimento.getTime() === dataVencimento.getTime());
  }

  // Exibição
  console.log("Lista de tarefas:");
  
  tarefasOrdenadas.forEach((tarefa, index) => {
    
    let dataFormatada = new Date(tarefa.dataVencimento)

    const statusIcon = tarefa.status === "concluido" ? "✅" : " ";
    console.log (`${index + 1}. ${statusIcon} - ${tarefa.titulo} - ${tarefa.status} - ${dataFormatada.toLocaleDateString("pt-BR")} - ${tarefa.prioridade}`);
  });
}


function pesquisarTarefas() {
  const termoPesquisa=(prompt("Digite o termo de pesquisa:")).trim()
  const resultados = tarefas.filter(tarefa =>
    tarefa.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
    tarefa.descricao.toLowerCase().includes(termoPe.toLowerCase())
  );

  if (resultados.length > 0) {
    console.log("Resultados da pesquisa:");
    resultados.forEach((tarefa, index) => {
      console.log(`${index + 1}. ${tarefa.titulo} - ${tarefa.status}`);
    });
  } else {
    console.log("Nenhuma tarefa encontrada.");
  }
}

function resumoTarefas() {
  const totalTarefas = tarefas.length;
  const tarefasPendentes = tarefas.filter(tarefa => tarefa.status === "pendente").length;
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.status === "concluída").length;
  const proximaTarefa = tarefas.sort((a, b) => a.dataVencimento - b.dataVencimento)[0];

  console.log("Resumo das tarefas:");
  console.log(`Total de tarefas: ${totalTarefas}`);
  console.log(`Tarefas pendentes: ${tarefasPendentes}`);
  console.log(`Tarefas concluídas: ${tarefasConcluidas}`);
  console.log("Próxima tarefa a vencer:", proximaTarefa.titulo);
}

while (true) {
  const opcao = Number(prompt(`\n
    1. Adicionar tarefa
    2. Listar tarefas
    3. Editar tarefa
    4. Remover tarefa
    5. Marcar tarefa como concluída
    6. Pesquisar tarefas
    7. Resumo das tarefas
    8. Sair
  `));

  switch (opcao) {
    case 1:
      adicionarTarefa();
      break;
    case 2:
      listarTarefas();
      break;
    case 3:
      editarTarefa();
      break;
    case 4:
    removerTarefa();
      break;
    case 5:
      marcarComoConcluida();
      break;
    case 6:
    pesquisarTarefas() 
      break;
    case 7:
      resumoTarefas();
      break;
    case 8:
      process.exit()
      console.log("Programa encerrado!");
      
    default:
      console.log("Opção inválida!");
  }
}

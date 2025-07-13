function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    nome: params.get("nome") || "Paciente",
    cpf: params.get("cpf") || "",
    data: params.get("data") || "",
    hora: params.get("hora") || "",
    medico: params.get("medico") || ""
  };
}

const dados = getParams();
const cpfEsperado = dados.cpf?.replace(/\D/g, "");

// Função para validar o CPF digitado
function verificarCPF() {
  const cpfDigitado = document.getElementById("cpfInput").value.replace(/\D/g, "");
  const erro = document.getElementById("error");
  erro.textContent = "";

  if (cpfDigitado === cpfEsperado) {
    document.getElementById("cpfForm").classList.add("hidden");
    document.getElementById("mensagemFinal").classList.remove("hidden");
  } else {
    erro.textContent = "CPF incorreto. Tente novamente.";
  }
}

function cancelarCheckin() {
  window.history.back();
}

// Máscara simples para o campo CPF
window.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.getElementById("cpfInput");

  if (cpfInput) {
    cpfInput.addEventListener("input", () => {
      let value = cpfInput.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      cpfInput.value = value;
    });
  }

  // Controla animação splash e mostra conteúdo depois
  setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.classList.add("zoom-out");

    setTimeout(() => {
      splash.remove(); // remove animação

      const conteudo = document.getElementById("conteudo");
      conteudo.classList.remove("hidden");

      const mensagem = document.getElementById("mensagemPersonalizada");
      mensagem.innerText = `Olá ${dados.nome}, faça check-in na sua consulta de hoje (dia ${dados.data}) às ${dados.hora} com o(a) médico(a) ${dados.medico}. Para o check-in, insira seu CPF abaixo:`;

      const cpfForm = document.getElementById("cpfForm");
      cpfForm.classList.remove("hidden");
      cpfForm.classList.add("fade-in");

    }, 1000);
  }, 3000);
});



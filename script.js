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

// Após 3 segundos, faz o zoom-out da animação e depois mostra o formulário
setTimeout(() => {
  const animation = document.getElementById("animation");
  animation.classList.add("zoom-out");

  setTimeout(() => {
    animation.classList.add("hidden");

    const cpfForm = document.getElementById("cpfForm");
    const mensagem = document.getElementById("mensagemPersonalizada");

    mensagem.innerText = `Olá ${dados.nome}, faça check-in na sua consulta de hoje às ${dados.hora} do dia ${dados.data} com o(a) médico(a) ${dados.medico}. Para o check-in, insira seu CPF abaixo:`;

    cpfForm.classList.remove("hidden");
    cpfForm.classList.add("fade-in");

  }, 1000); // tempo da animação zoom-out
}, 3000); // tempo de exibição da animação inicial

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

// Aplica máscara ao campo CPF se o elemento estiver presente
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
});

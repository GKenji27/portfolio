function iniciarRevelacaoAoRolar() {
  const elementosRevelar = document.querySelectorAll(".revelar");

  if (elementosRevelar.length === 0) return;

  const observadorDeRevelar = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("mostrar");
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosRevelar.forEach((elemento) => observadorDeRevelar.observe(elemento));
}

function marcarLinkDeNavegacaoAtivo() {
  const linksDoMenu = document.querySelectorAll(".menu-principal__link");
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

  linksDoMenu.forEach((link) => {
    const destinoLink = link.getAttribute("href");
    if (destinoLink === paginaAtual) {
      link.classList.add("menu-principal__link--ativo");
    } else {
      link.classList.remove("menu-principal__link--ativo");
    }
  });
}

function configurarFormularioDeContato() {
  const formulario = document.querySelector(".formulario-contato");
  if (!formulario) return;

  const campoNome = formulario.querySelector("#nome");
  const campoEmail = formulario.querySelector("#email");
  const campoMensagem = formulario.querySelector("#mensagem");
  const caixaDeMensagem = formulario.querySelector(".formulario-contato__mensagem");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nomeValido = campoNome.value.trim().length >= 2;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value.trim());
    const mensagemValida = campoMensagem.value.trim().length >= 10;

    if (!nomeValido || !emailValido || !mensagemValida) {
      exibirMensagemDoFormulario(
        caixaDeMensagem,
        "Por favor, preencha todos os campos corretamente (mensagem com no mínimo 10 caracteres).",
        "erro"
      );
      return;
    }

    exibirMensagemDoFormulario(
      caixaDeMensagem,
      `Obrigado, ${campoNome.value.trim()}! Sua mensagem foi enviada com sucesso.`,
      "sucesso"
    );

    formulario.reset();
  });
}

function exibirMensagemDoFormulario(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.classList.remove(
    "formulario-contato__mensagem--sucesso",
    "formulario-contato__mensagem--erro"
  );
  elemento.classList.add(`formulario-contato__mensagem--${tipo}`);
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarRevelacaoAoRolar();
  marcarLinkDeNavegacaoAtivo();
  configurarFormularioDeContato();
});
// Menu-sanduíche do cabeçalho — só melhora a experiência no celular.
// Degradação graciosa: sem este JS, o menu já aparece normal (CSS base).
// Quando o JS roda, marcamos a nav com a classe "com-js" e aí o CSS
// esconde o menu atrás do botão. Sem try-catch (padrão do Thiago): uso guardas.
(function () {
  const nav = document.querySelector("nav");
  const botao = document.querySelector(".abre-menu");
  const menu = document.getElementById("menu-principal");
  if (!nav || !botao || !menu) return; // faltou algo -> não faz nada (menu segue visível)

  // sinaliza ao CSS que o JS está ativo (só então o menu vira sanduíche)
  nav.classList.add("com-js");

  function alterna(abrir) {
    const aberto = abrir === undefined ? nav.dataset.menu !== "aberto" : abrir;
    nav.dataset.menu = aberto ? "aberto" : "fechado";
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  alterna(false); // começa fechado

  botao.addEventListener("click", function () {
    alterna();
  });

  // clicou num link do menu -> navegou pra âncora, então fecha
  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) alterna(false);
  });

  // Esc fecha e devolve o foco pro botão
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && nav.dataset.menu === "aberto") {
      alterna(false);
      botao.focus();
    }
  });
})();

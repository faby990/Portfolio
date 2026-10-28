// ===== 1. SAUDAÇÃO DINÂMICA =====
// Pega a hora do computador e escolhe a saudação certa.
const saudacao = document.getElementById("saudacao");
const hora = new Date().getHours();

let texto;
if (hora < 12) {
  texto = "Bom dia";
} else if (hora < 18) {
  texto = "Boa tarde";
} else {
  texto = "Boa noite";
}
saudacao.textContent = texto + ", eu sou";


// ===== 2. MENU HAMBÚRGUER =====
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

// Abre ou fecha o menu e avisa o leitor de tela (aria-expanded)
function alternarMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  btnMenu.setAttribute("aria-expanded", abrir);
  btnMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

btnMenu.addEventListener("click", function () {
  const estaAberto = btnMenu.getAttribute("aria-expanded") === "true";
  alternarMenu(!estaAberto);
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    alternarMenu(false);
  });
});

// Fecha o menu com a tecla Esc e devolve o foco para o botão
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menu.classList.contains("aberto")) {
    alternarMenu(false);
    btnMenu.focus();
  }
});


// ===== 3. MODO CLARO / ESCURO =====
const btnTema = document.getElementById("btn-tema");
const iconeTema = document.getElementById("icone-tema");
const raiz = document.documentElement; // a tag <html>

function aplicarTema(tema) {
  const escuro = tema === "escuro";
  if (escuro) {
    raiz.setAttribute("data-tema", "escuro");
  } else {
    raiz.removeAttribute("data-tema");
  }
  iconeTema.textContent = escuro ? "☀" : "☾";
  btnTema.setAttribute("aria-pressed", escuro);
  btnTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
}

// Lê a escolha salva; se não houver, usa a preferência do aparelho.
// (try/catch evita erro caso o navegador bloqueie o armazenamento)
let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (erro) {}

const aparelhoEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(temaSalvo || (aparelhoEscuro ? "escuro" : "claro"));

btnTema.addEventListener("click", function () {
  const novoTema = raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
  aplicarTema(novoTema);
  try {
    localStorage.setItem("tema", novoTema); // lembra a escolha na próxima visita
  } catch (erro) {}
});


// ===== 4. ANO AUTOMÁTICO NO RODAPÉ =====
document.getElementById("ano").textContent = new Date().getFullYear();

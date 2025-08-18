
const btnBoasVindas = document.getElementById('btn-boasvindas');
const btnToggle = document.getElementById('btn-toggle');
const btnTema = document.getElementById('btn-tema');
const listaExtra = document.getElementById('lista-extra');
const saudacaoTopo = document.getElementById('saudacao');
const formNome = document.getElementById('form-nome');
const campoNome = document.getElementById('nome');
const ano = document.getElementById('ano');
const contador = document.getElementById('contador');


btnBoasVindas.addEventListener('click', function () {
  alert('Olá! Obrigado por visitar meu currículo.');
});

btnToggle.addEventListener('click', function () {
  const visivel = listaExtra.hasAttribute('hidden') ? false : true;
  if (visivel) {
    listaExtra.setAttribute('hidden', '');
    btnToggle.setAttribute('aria-expanded', 'false');
  } else {
    listaExtra.removeAttribute('hidden');
    btnToggle.setAttribute('aria-expanded', 'true');
  }
});

formNome.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = (campoNome.value || '').trim();
  if (nome) {
    saudacaoTopo.innerText = `Olá, ${nome}! Bem-vindo(a) 👋`;
    localStorage.setItem('nomeVisitante', nome);
    campoNome.value = '';
    campoNome.focus();
  }
});


const nomeSalvo = localStorage.getItem('nomeVisitante');
if (nomeSalvo) {
  saudacaoTopo.innerText = `Olá, ${nomeSalvo}! Bem-vindo(a) 👋`;
}

(function contadorVisitas(){
  const chave = 'visitasCurriculo';
  const visitas = parseInt(localStorage.getItem(chave) || '0', 10) + 1;
  localStorage.setItem(chave, String(visitas));
  contador.innerText = `Visitas no seu navegador: ${visitas}`;
})();


ano.innerText = new Date().getFullYear();


btnTema.addEventListener('click', () => {
  const root = document.documentElement;
  const corAtual = getComputedStyle(root).getPropertyValue('--brand').trim();

  if (corAtual === '#22c55e') {
    root.style.setProperty('--brand', '#f472b6');        
    root.style.setProperty('--brand-contrast', '#831843'); 
  } else {
    root.style.setProperty('--brand', '#22c55e');
    root.style.setProperty('--brand-contrast', '#14532d');
  }
});


(function desenharGrafico(){
  const canvas = document.getElementById('grafico');
  if (!canvas.getContext) return;
  const ctx = canvas.getContext('2d');


  const labels = ['Python', 'JS', 'HTML/CSS', 'PostgreSQL', 'JWT'];
  const valores = [90, 85, 80, 75, 70]; 

  const w = canvas.width, h = canvas.height;
  const padding = 30;
  const larguraBarra = 50;
  const gap = 30;
  const x0 = padding + 10;
  const y0 = h - padding;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#94a3b8'; 
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(w - padding, y0);
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, padding);
  ctx.stroke();

  valores.forEach((v, i) => {
    const x = x0 + 15 + i * (larguraBarra + gap);
    const altura = (v / 100) * (h - padding * 2);
    const y = y0 - altura;

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x, y, larguraBarra, altura);

    ctx.fillStyle = '#e5e7eb';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + larguraBarra / 2, y0 + 14);

    ctx.fillText(String(v), x + larguraBarra / 2, y - 6);
  });
})();

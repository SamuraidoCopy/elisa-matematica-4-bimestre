const $ = (id) => document.getElementById(id);
const storageKey = 'elisa-matematica-4b-concluidas';

function loadCompleted() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(modules.filter(module => Array.isArray(saved) && saved.includes(module.id)).map(module => module.id));
  } catch {
    return new Set();
  }
}

const state = {
  moduleIndex: 0,
  questionIndex: 0,
  selected: null,
  answered: false,
  isReview: false,
  reviewMisses: new Set(),
  completed: loadCompleted()
};

function saveCompleted() {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...state.completed]));
  } catch {
    // The game still works if this browser blocks local storage.
  }
}

const adventures = [
  {place:'Trilha', landmark:'🌈', scene:'Na trilha, os números seguem pistas.', task:'Descubra o que vem depois.'},
  {place:'Feira', landmark:'🍎', scene:'Na feira, uma tabela conta as frutas vendidas.', task:'Compare as quantidades.'},
  {place:'Biblioteca', landmark:'📚', scene:'Na biblioteca, um gráfico mostra os livros lidos.', task:'Leia cada barra.'},
  {place:'Loja', landmark:'🛍️', scene:'Na loja, precisamos pagar e conferir o troco.', task:'Vamos calcular juntos.'},
  {place:'Cozinha', landmark:'🥤', scene:'Na cozinha, medimos suco e limonada.', task:'Explore litros e mililitros.'},
  {place:'Mercado', landmark:'⚖️', scene:'No mercado, medimos frutas e farinha.', task:'Explore quilos e gramas.'},
  {place:'Jardim', landmark:'🌳', scene:'No jardim, plantas estão organizadas em grupos iguais.', task:'Conte os grupos.'}
];
let discoveries = [];
function renderAdventure() {
  const scene = $('adventureScene');
  if (state.isReview) { scene.hidden = true; return; }
  const mission = adventures[state.moduleIndex];
  scene.hidden = false;
  scene.replaceChildren();
  const landscape = document.createElement('div');
  landscape.className = 'adventure-landscape';
  const landmark = document.createElement('span');
  landmark.className = 'adventure-landmark'; landmark.textContent = mission.landmark;
  const object = document.createElement('span');
  object.className = 'adventure-object'; object.textContent = currentQuestion().icon;
  landscape.append(landmark, object);
  const story = document.createElement('p'); story.textContent = mission.scene + ' ' + mission.task;
  const collection = document.createElement('div'); collection.className = 'discovery-trail';
  collection.setAttribute('aria-label', 'Descobertas: ' + discoveries.length + ' de ' + questionTotal());
  for (let i = 0; i < questionTotal(); i++) {
    const token = document.createElement('span');
    token.textContent = discoveries[i] || '◇';
    token.setAttribute('aria-hidden', 'true');
    collection.append(token);
  }
  scene.append(landscape, story);
  const visual = questionVisuals[modules[state.moduleIndex].id]?.[state.questionIndex];
  if (visual) scene.append(makeStoryVisual(visual));
  scene.append(collection);
}
const mapPositions = [
  {x:16,y:16}, {x:48,y:10}, {x:79,y:16}, {x:16,y:47},
  {x:49,y:46}, {x:79,y:47}, {x:49,y:77}
];
let mapTimer = null;
let mapDestination = null;
function enterMapDestination() {
  if (mapTimer !== null) clearTimeout(mapTimer);
  mapTimer = null;
  $('skipWalk').hidden = true;
  if (mapDestination === null) return;
  const destination = mapDestination;
  mapDestination = null;
  startMission(destination);
}
function renderModuleList() {
  $('moduleList').innerHTML = modules.map((module, index) => {
    const active = !state.isReview && index === state.moduleIndex;
    const done = state.completed.has(module.id);
    return `<button class="module-item${active ? ' active' : ''}" data-module="${index}" style="--x:${mapPositions[index].x}%;--y:${mapPositions[index].y}%" type="button"${active ? ' aria-current="step"' : ''}>
      <span class="module-icon" aria-hidden="true">${adventures[index].landmark}</span>
      <span class="module-name"><small>${adventures[index].place}</small><br>${module.short}</span>
      <span class="module-check"${done ? ' aria-label="concluída"' : ' aria-hidden="true"'}>${done ? '✓' : ''}</span>
    </button>`;
  }).join('');
  if (state.isReview) $('finalReviewButton').setAttribute('aria-current', 'step');
  else $('finalReviewButton').removeAttribute('aria-current');
}

function renderProgress() {
  const count = state.completed.size;
  const percent = Math.round(count / modules.length * 100);
  $('progressText').textContent = `${count} de ${modules.length} missões concluídas`;
  $('progressPercent').textContent = `${percent}%`;
  $('progressFill').style.width = `${percent}%`;
  $('resetButton').disabled = count === 0;
}

function renderExplanation() {
  const points = state.isReview
    ? modules.map(module => ({ icon: module.icon, title: module.short, text: module.concept }))
    : modules[state.moduleIndex].explanation;
  const exhibit = !state.isReview && modules[state.moduleIndex].id === 'origens';
  $('learningTitle').textContent = state.isReview ? 'Vamos lembrar as missões'
    : exhibit ? 'A caixa sem etiquetas' : adventures[state.moduleIndex].place + ': uma nova descoberta';
  document.querySelector('#learningCard .learning-intro').textContent = exhibit
    ? 'A exposição vai abrir, mas as peças chegaram misturadas. Sua missão é descobrir de onde cada uma veio e colocá-la na prateleira certa.'
    : state.isReview ? 'Leia com a Elisa, um ponto de cada vez.' : adventures[state.moduleIndex].scene + ' ' + adventures[state.moduleIndex].task;
  if (!state.isReview) document.querySelector('#learningCard .learning-intro').textContent = stories[modules[state.moduleIndex].id].intro;
  $('learningPoints').replaceChildren(...points.map(point => {
    const item = document.createElement('li');
    const icon = document.createElement('span');
    icon.className = 'learning-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = point.icon;
    const content = document.createElement('div');
    const title = document.createElement('h4');
    title.textContent = point.title;
    const text = document.createElement('p');
    text.textContent = point.text;
    content.append(title, text);
    if (point.visual) content.append(makeStoryVisual(point.visual));
    item.append(icon, content);
    return item;
  }));
}

function showStage(stage, moveFocus = true) {
  $('learningCard').hidden = stage !== 'learn';
  $('conceptCard').hidden = stage !== 'learn';
  $('questionCard').hidden = stage !== 'play';
  $('finishCard').hidden = stage !== 'finish';
  if (moveFocus) {
    const heading = { learn: 'learningTitle', play: 'questionText', finish: 'finishTitle' };
    $(heading[stage]).focus();
  }
}

function currentQuestion() {
  return state.isReview
    ? modules[state.questionIndex].review
    : modules[state.moduleIndex].questions[state.questionIndex];
}

function questionTotal() {
  return state.isReview ? modules.length : modules[state.moduleIndex].questions.length;
}

const exhibitArt = ["<path fill=\"#a6653e\" d=\"M24 34h54v29H24z\"/><ellipse fill=\"#744626\" cx=\"24\" cy=\"49\" rx=\"11\" ry=\"15\"/><ellipse fill=\"#e7b982\" cx=\"77\" cy=\"49\" rx=\"13\" ry=\"15\"/><ellipse fill=\"none\" stroke=\"#9d6946\" cx=\"77\" cy=\"49\" rx=\"7\" ry=\"9\"/><path stroke=\"#754527\" d=\"M34 41h28M34 54h23\"/>","<circle fill=\"#eed8ae\" cx=\"51\" cy=\"49\" r=\"25\"/><path fill=\"none\" stroke=\"#a88758\" stroke-width=\"2\" d=\"M29 45q21-23 43 9M28 52q22-19 40 10M35 64q16-25 37-26M40 71q10-21 34-27M70 65q16 0 18 8\"/>","<path fill=\"#a85940\" d=\"M15 63l17-23 20 1 12 7 15-7 12 22-15 10H27z\"/><path fill=\"#cc8362\" d=\"M15 63l17-23 20 1 12 7 15-7 12 22-29-4-13 7z\"/>","<path fill=\"none\" stroke=\"#a78333\" stroke-width=\"3\" d=\"M51 75L29 30m22 45-2-53m2 53 23-48m-23 48 11-42m-11 42L37 41\"/><g fill=\"#dfac47\"><circle cx=\"28\" cy=\"27\" r=\"6\"/><circle cx=\"49\" cy=\"19\" r=\"6\"/><circle cx=\"75\" cy=\"24\" r=\"6\"/><circle cx=\"63\" cy=\"30\" r=\"5\"/><circle cx=\"35\" cy=\"39\" r=\"5\"/></g><path stroke=\"#ad6540\" stroke-width=\"4\" d=\"M43 65h16\"/>","<path fill=\"none\" stroke=\"#8d5033\" stroke-width=\"13\" d=\"M26 62c-12-13 1-29 27-29 26 0 40 14 26 24-10 8-29 7-46 6\"/><rect x=\"15\" y=\"53\" width=\"24\" height=\"17\" rx=\"3\" fill=\"none\" stroke=\"#dbad4f\" stroke-width=\"5\"/><circle cx=\"53\" cy=\"62\" r=\"2\" fill=\"#553423\"/>"];
const shelfIcons = ['🌿', '🐑', '⛰️'];
let exhibited = [];

function drawing(index) {
  return '<svg aria-hidden="true" viewBox="0 0 104 90">' + exhibitArt[index] + '</svg>';
}

function renderQuestion() {
  const item = currentQuestion();
  state.selected = null;
  state.answered = false;
  const classification = item.type === 'classification';
  const label = item.stage === 'guided' ? 'Exemplo guiado'
    : item.stage === 'challenge' ? 'Desafio final'
      : classification ? 'Peça' : 'Pergunta';
  $('questionCount').textContent = `${label}${classification ? ' ·' : ''} ${state.questionIndex + 1} de ${questionTotal()}`;
  $('classification').hidden = !classification;
  $('questionCard').classList.toggle('exhibit-scene', classification);
  $('nextButton').hidden = classification;
  $('answerArea').classList.toggle('classification-options', classification);
  $('answerArea').setAttribute('aria-label', classification ? 'Categorias de origem' : 'Opções de resposta');
  if (classification) {
    $('classificationStep').textContent = 'Abra a caixa e examine a peça.';
    const label = document.createElement('strong');
    label.textContent = item.material;
    $('materialCard').innerHTML = '<span class="crate" aria-hidden="true">📦</span>' + drawing(state.questionIndex);
    $('materialCard').append(label);
    $('materialCard').setAttribute('aria-label', 'Abrir caixa');
    $('materialCard').disabled = false;
    $('materialCard').classList.remove('placed');
    $('materialCard').setAttribute('aria-pressed', 'false');
  }
  renderAdventure();
  $('questionIcon').textContent = item.icon;
  $('questionText').textContent = classification
    ? ['Uma caixa sem etiquetas chegou ao laboratório!', 'Uma nova peça para a exposição.', 'Chegou mais uma peça da caixa.', 'Falta pouco para abrir a exposição.', 'A última peça parece diferente. De que é feita?'][state.questionIndex]
    : item.text;
  $('answerArea').replaceChildren(...item.options.map((option, index) => {
    const button = document.createElement('button');
    const letter = document.createElement('span');
    button.type = 'button';
    button.className = 'answer-option';
    button.dataset.answer = index;
    button.setAttribute('aria-pressed', 'false');
    letter.textContent = String.fromCharCode(65 + index);
    letter.setAttribute('aria-hidden', 'true');
    if (classification) {
      const label = document.createElement('strong');
      label.textContent = option;
      const shelf = document.createElement('span');
      shelf.className = 'shelf-contents';
      shelf.setAttribute('aria-hidden', 'true');
      shelf.innerHTML = exhibited.filter(piece => piece.shelf === index).map(piece => drawing(piece.index)).join('');
      const icon = document.createElement('span');
      icon.className = 'shelf-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = shelfIcons[index];
      button.append(icon, label, shelf);
      button.disabled = true;
    } else {
      button.append(letter, option);
    }
    button.addEventListener('click', () => {
      selectAnswer(index);
      if (classification) showFeedback();
    });
    return button;
  }));
  $('hintArea').hidden = true;
  $('hintArea').textContent = `Pista · ${item.hint}`;
  $('feedbackArea').hidden = true;
  $('feedbackArea').textContent = '';
  $('hintButton').disabled = false;
  $('retryButton').hidden = true;
  $('nextButton').disabled = true;
  $('nextButton').textContent = 'Conferir';
}

function startMission(index, isReview = false, moveFocus = true) {
  state.moduleIndex = index;
  state.questionIndex = 0;
  state.isReview = isReview;
  state.reviewMisses.clear();
  exhibited = [];
  discoveries = [];
  const module = modules[index];
  $('lessonKicker').textContent = isReview ? 'Uma pergunta de cada missão' : `Missão ${index + 1} de ${modules.length}`;
  $('lessonTitle').textContent = isReview ? 'Revisão final' : module.title;
  $('lessonNumber').textContent = isReview ? '★' : module.icon;
  $('conceptIcon').textContent = isReview ? '★' : module.icon;
  $('conceptText').textContent = isReview ? 'Vamos juntar as pistas que você aprendeu.' : module.concept;
  $('practiceButton').textContent = isReview ? 'Começar revisão'
    : module.questions[0].type === 'classification' ? 'Começar com um exemplo' : 'Jogar esta missão';
  renderModuleList();
  renderExplanation();
  renderQuestion();
  showStage('learn', moveFocus);
  if (moveFocus) $('lesson').scrollIntoView({ block: 'start' });
}

function selectAnswer(index) {
  if (state.answered) return;
  state.selected = index;
  $('answerArea').querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.answer) === index));
  });
  $('nextButton').disabled = false;
}

function showFeedback() {
  const item = currentQuestion();
  const correct = state.selected === item.answer;
  state.answered = true;
  $('answerArea').querySelectorAll('button').forEach(button => {
    const index = Number(button.dataset.answer);
    button.classList.toggle('correct', index === item.answer);
    button.classList.toggle('wrong', index === state.selected && !correct);
    button.disabled = true;
  });
  if (state.isReview && !correct) state.reviewMisses.add(modules[state.questionIndex].short);
  if (!state.isReview && correct) { discoveries[state.questionIndex] = item.icon; renderAdventure(); }
  $('feedbackArea').hidden = false;
  $('feedbackArea').textContent = correct
    ? `Isso mesmo! ${item.why}`
    : `Vamos conferir. A resposta é “${item.options[item.answer]}”. ${item.why}`;
  $('hintButton').disabled = true;
  if (item.type === 'classification') {
    $('materialCard').disabled = true;
    $('classificationStep').textContent = correct ? 'Peça guardada na exposição.' : 'A peça ainda está na bancada.';
    $('retryButton').hidden = correct;
    $('nextButton').hidden = !correct;
    if (correct) {
      exhibited.push({ index: state.questionIndex, shelf: item.answer });
      $('answerArea').querySelector('.correct .shelf-contents').insertAdjacentHTML('beforeend', drawing(state.questionIndex));
      $('materialCard').classList.add('placed');
      $('nextButton').focus();
    } else {
      $('retryButton').focus();
    }
  }
  const last = state.questionIndex + 1 === questionTotal();
  $('nextButton').textContent = item.type === 'classification' ? (last ? 'Abrir a exposição' : 'Abrir outra peça') : last ? 'Terminar' : 'Próxima pergunta';
}

function finishMission() {
  const lastMission = state.moduleIndex + 1 === modules.length;
  $('continueButton').hidden = state.isReview;
  $('exhibitGallery').hidden = true;
  if (state.isReview) {
    $('finishTitle').textContent = 'Revisão concluída!';
    $('finishText').textContent = state.reviewMisses.size
      ? `Você terminou! Para praticar mais, escolha no menu: ${[...state.reviewMisses].join(', ')}.`
      : 'Você acertou todas as perguntas desta rodada.';
  } else {
    state.completed.add(modules[state.moduleIndex].id);
    saveCompleted();
    renderProgress();
    renderModuleList();
    const exhibit = modules[state.moduleIndex].id === 'origens';
    if (exhibit) {
      const gallery = $('exhibitGallery');
      gallery.replaceChildren(...exhibited.map(piece => {
        const item = modules[state.moduleIndex].questions[piece.index];
        const figure = document.createElement('figure');
        const caption = document.createElement('figcaption');
        figure.innerHTML = drawing(piece.index);
        caption.textContent = item.material + ' · ' + item.options[piece.shelf];
        figure.append(caption);
        return figure;
      }));
      gallery.hidden = false;
    }
    $('finishTitle').textContent = exhibit ? 'A exposição está aberta!' : 'Missão concluída!';
    $('finishText').textContent = exhibit
      ? 'Você guardou as cinco peças! Se quiser, escolha uma para mostrar a alguém e conte de onde ela veio.'
      : 'Você chegou ao fim. Pode seguir, jogar de novo ou fazer uma pausa.';
    $('continueButton').textContent = lastMission ? 'Ir para a revisão final' : 'Próxima missão';
  }
  showStage('finish');
}

function nextQuestion() {
  if (!state.answered) {
    if (state.selected !== null) showFeedback();
  } else if (state.questionIndex + 1 < questionTotal()) {
    state.questionIndex += 1;
    renderQuestion();
    showStage('play');
  } else {
    finishMission();
  }
}

$('moduleList').addEventListener('click', event => {
  const button = event.target.closest('[data-module]');
  if (!button) return;
  if (mapTimer !== null) clearTimeout(mapTimer);
  const index = Number(button.dataset.module);
  mapDestination = index;
  $('mapHero').style.left = mapPositions[index].x + '%';
  $('mapHero').style.top = mapPositions[index].y + '%';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    enterMapDestination();
  } else {
    $('skipWalk').hidden = false;
    mapTimer = setTimeout(enterMapDestination, 1800);
  }
});
$('skipWalk').addEventListener('click', enterMapDestination);
$('startButton').addEventListener('click', () => {
  const firstPending = modules.findIndex(module => !state.completed.has(module.id));
  if (firstPending === -1) startMission(0, true);
  else startMission(firstPending);
});
$('finalReviewButton').addEventListener('click', () => startMission(0, true));
$('replayButton').addEventListener('click', () => startMission(state.moduleIndex, state.isReview));
$('continueButton').addEventListener('click', () => {
  const next = state.moduleIndex + 1;
  if (next === modules.length) startMission(0, true);
  else startMission(next);
});
$('resetButton').addEventListener('click', () => {
  if (!state.completed.size || !window.confirm('Apagar as missões concluídas e começar de novo?')) return;
  state.completed.clear();
  saveCompleted();
  renderProgress();
  startMission(0, false, false);
});
$('pauseButton').addEventListener('click', () => $('pauseDialog').showModal());
$('practiceButton').addEventListener('click', () => showStage('play'));
$('explanationButton').addEventListener('click', () => showStage('learn'));
$('hintButton').addEventListener('click', () => { $('hintArea').hidden = false; });
$('materialCard').addEventListener('click', () => {
  $('materialCard').setAttribute('aria-pressed', 'true');
  const item = currentQuestion();
  $('materialCard').setAttribute('aria-label', item.material);
  $('classificationStep').textContent = item.stage === 'guided'
    ? 'A madeira vem de uma árvore. Árvores são plantas. Vamos guardá-la em Vegetal.'
    : 'Observe a peça e escolha em qual prateleira ela fica.';
  const options = $('answerArea').querySelectorAll('button');
  options.forEach(option => { option.disabled = false; });
  options[0]?.focus({ preventScroll: true });
});
$('retryButton').addEventListener('click', () => {
  renderQuestion();
  showStage('play');
});
$('nextButton').addEventListener('click', nextQuestion);

startMission(0, false, false);
renderProgress();





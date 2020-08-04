// functionality here heavily inspired by this css-tricks article:
// https://css-tricks.com/using-css-transitions-auto-dimensions/
const collapse = answerEl => {
  const elHeight = answerEl.scrollHeight;

  const elTransition = answerEl.style.transition;
  answerEl.style.transition = '';

  requestAnimationFrame(() => {
    answerEl.style.height = `${elHeight}px`;
    answerEl.style.transition = elTransition;

    requestAnimationFrame(() => {
      answerEl.style.height = '0px';
    });
  });
};


const expand = answerEl => {
  const elHeight = answerEl.scrollHeight;

  answerEl.style.height = `${elHeight}px`;

  const listener = answerEl.addEventListener('transitioned', event => {
    answerEl.style.height = null;
  });

  answerEl.removeEventListener('transitioned', listener);
};


const questionClickHandler = entryEl => event => {
  // check to see whether it was a keydown event, and check to see if
  // the key that was pressed is space or enter
  // if it is neither of those keys, do nothing with the keydown event
  console.log('event type: ', event.type);
  if (event.type === 'keydown' && !(event.keyCode === 32 || event.keyCode === 13)) {
    return;
  }

  const isCollapsed = entryEl.getAttribute('data-collapsed') === 'true';
  const answerEl = entryEl.querySelector('.faq-answer__text-wrapper');

  !isCollapsed ? collapse(answerEl) : expand(answerEl);

  entryEl.setAttribute('data-collapsed', !isCollapsed);
  entryEl.setAttribute('aria-expanded', isCollapsed);
  entryEl.setAttribute('aria-pressed', isCollapsed);
};


const ready = () => {
  const faqEntryEls = document.querySelectorAll('.faq-entry');
  
  [...faqEntryEls].forEach(entryEl => {
    // collapse all answers to begin
    const answerChild = entryEl.querySelector('.faq-answer__text-wrapper');
    answerChild.style.height = '0px';

    const questionChild = entryEl.querySelector('.faq-question');
    questionChild.addEventListener('click', questionClickHandler(entryEl));
    entryEl.addEventListener('keydown', questionClickHandler(entryEl));
  });
};

document.addEventListener('DOMContentLoaded', ready);
const questionClickHandler = entry => event => {
  const isCollapsed = entry.getAttribute('data-collapsed') === 'true';

  entry.setAttribute('data-collapsed', !isCollapsed);
};


const ready = () => {
  const faqEntries = document.querySelectorAll('.faq-entry');
  
  [...faqEntries].forEach(entry => {
    const questionChild = entry.querySelector('.faq-question');
    questionChild.addEventListener('click', questionClickHandler(entry));
  });
};

document.addEventListener('DOMContentLoaded', ready);
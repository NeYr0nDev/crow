document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  // Функция для открытия элемента
  const openItem = (item) => {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    item.classList.add('active');
    icon.textContent = '−'; // Меняем плюс на минус
    
    // Вычисляем реальную высоту контента + добавляем место для padding
    answer.style.maxHeight = answer.scrollHeight + 30 + 'px'; 
  };

  // Функция для закрытия элемента
  const closeItem = (item) => {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    item.classList.remove('active');
    icon.textContent = '+';
    answer.style.maxHeight = null; // Сбрасываем высоту
  };

  // Инициализация (открываем элементы, у которых со старта есть класс active)
  faqItems.forEach(item => {
    if (item.classList.contains('active')) {
      openItem(item);
    }
  });

  // Обработка кликов
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Закрываем все остальные вкладки (поведение аккордеона)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          closeItem(otherItem);
        }
      });

      // Переключаем текущую
      if (isActive) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
});

// Появление маскота
document.addEventListener('DOMContentLoaded', () => {
  const mascotHelper = document.querySelector('.mascot-helper');
  const closeBtn = document.querySelector('.mascot-close');
  
  let inactivityTimer;
  const INACTIVITY_TIME = 5000; // 5 секунд бездействия для теста (потом можно поставить 10-15)

  // Функция показа маскота
  const showMascot = () => {
    mascotHelper.classList.add('active');
  };

  // Функция скрытия маскота
  const hideMascot = () => {
    mascotHelper.classList.remove('active');
  };

  // Функция сброса таймера
  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    // Если маскот уже показан, мы его не прячем при активности, 
    // пусть висит, пока юзер сам его не закроет. 
    // Запускаем таймер заново только если маскот скрыт.
    if (!mascotHelper.classList.contains('active')) {
      inactivityTimer = setTimeout(showMascot, INACTIVITY_TIME);
    }
  };

  // Отслеживаем активность пользователя
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('scroll', resetTimer);
  window.addEventListener('keydown', resetTimer);
  window.addEventListener('click', resetTimer);

  // Закрытие по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      hideMascot();
    });
  }

  // Запускаем таймер при старте
  resetTimer();
});
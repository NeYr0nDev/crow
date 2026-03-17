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
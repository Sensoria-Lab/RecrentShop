// Типы для отзывов
export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[]; // Массив путей к фотографиям
}

// Данные отзывов
export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: 'Артём Соколов',
    rating: 5,
    text: 'приехал быстро (буквально 3-4 дня с учетом праздников), коврик огромен, даже неожиданно огромен, качество 15/10, исполнение принта 25/10, за такую цену чуть ли не лучшее предложение на рынке ковров, спасибо за такое прекрасное исполнение!',
    date: '09.11.2025',
    photos: [
      '/images/reviews/review-1-photo-1.jpg',
      '/images/reviews/review-1-photo-2.jpg',
      '/images/reviews/review-1-photo-3.jpg'
    ]
  },
  {
    id: 'review-2',
    author: 'Екатерина Волкова',
    rating: 5,
    text: 'Коврик - огонь! Единственный вопрос, не нашел нигде, как его правильно стирать, чтобы не повредить поверхность?',
    date: '09.11.2025',
    photos: [
      '/images/reviews/review-2-photo-1.jpg',
      '/images/reviews/review-2-photo-2.jpg',
      '/images/reviews/review-2-photo-3.jpg'
    ]
  },
  {
    id: 'review-3',
    author: 'Александра Морозова',
    rating: 5,
    text: 'Заказывала коврик для сына-геймера на день рождения. Пришел раньше срока, что очень порадовало! Качество печати превосходное, цвета яркие и насыщенные. Сын в восторге, сказал что скольжение мышки идеальное. Буду рекомендовать друзьям!',
    date: '05.11.2025',
    photos: [
      '/images/reviews/review-3-photo-1.jpg',
      '/images/reviews/review-3-photo-2.jpg'
    ]
  },
  {
    id: 'review-4',
    author: 'Максим Ковалев',
    rating: 4,
    text: 'Хороший коврик за свою цену. Единственное, что немного смутило - первое время был специфический запах, но выветрился за пару дней. В остальном все отлично: не скользит по столу, мышка плавно двигается, края прошиты качественно. Советую!',
    date: '02.11.2025',
    photos: [
      '/images/reviews/review-4-photo-1.jpg'
    ]
  }
];

// Функция для получения отзывов с пагинацией
export const getReviews = (page: number = 1, perPage: number = 2): Review[] => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return REVIEWS.slice(start, end);
};

// Функция для получения общего количества отзывов
export const getTotalReviews = (): number => {
  return REVIEWS.length;
};

// Функция для проверки наличия еще отзывов
export const hasMoreReviews = (currentCount: number): boolean => {
  return currentCount < REVIEWS.length;
};

/**
 * Централизованное хранилище всего контента сайта
 * Это единая точка управления контентом, готовая для интеграции с бэкендом
 */

import { SiteContent } from '../types/content';
import { ALL_PRODUCTS } from './products';
import { offerContent } from './offerContent';
import { NAV_ITEMS, MOBILE_NAV_ITEMS } from '../constants/routes';

export const SITE_CONTENT: SiteContent = {
  // Главная страница
  hero: {
    title: 'RECRENT SHOP',
    ctaButton: 'Перейти в каталог'
  },

  // Все товары
  products: ALL_PRODUCTS,

  // Информационные блоки
  info: [
    {
      id: 'sizes',
      title: 'Размеры',
      content: `Размер нашей одежды может отличаться от одежды классических размеров. Перед заказом рекомендуем внимательно ознакомиться с размерной сеткой выбранной одежды в карточке товара (после фото товара, в форме таблицы).

Сравните по таблице параметры ABC с параметрами своей аналогичной одежды и выберите ближайший для вас размер!`
    },
    {
      id: 'delivery',
      title: 'Доставка',
      content: `Отправка заказов осуществляется "Почтой России" и "СДЭК"

«Почта России» осуществляет доставку по всему миру.
"СДЭК" осуществляет доставку по России, а также в Беларусь и Казахстан до пункта выдачи или до двери (курьерская доставка)

Стоимость доставки в ваш город будет автоматически рассчитана и включена в итоговую сумму заказа.

Обработка и отправка заказов осуществляется в течение 3-5 рабочих дней.

Оформляя предзаказ на сайте магазина, вы полностью принимаете условия обработки, претензии по срокам не принимаются.

Магазин не несёт ответственности за задержку посылок транспортными компаниями.`
    },
    {
      id: 'offer',
      title: 'Оферта',
      content: offerContent
    },
    {
      id: 'track',
      title: 'Где мой заказ',
      content: `Отследить заказ можно после получения номера накладной от СДЭК или трек-номера от Почты России!

Все заказы в обработке 3-5 дней, после поступит уведомление:
• если Почта России - в смс на мобильный
• если СДЭК - на указанный адрес электронной почты!`
    }
  ],

  // Контакты
  contacts: [
    {
      id: 'vk',
      title: 'ВКонтакте',
      url: 'https://vk.com/recrentshop',
      description: 'Наша группа ВКонтакте'
    },
    {
      id: 'telegram',
      title: 'Telegram',
      url: 'https://t.me/recrentshop',
      description: 'Свяжитесь с нами в Telegram'
    },
    {
      id: 'email',
      title: 'Email',
      url: 'mailto:support@recrentshop.ru',
      description: 'Напишите нам на почту'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      url: 'https://wa.me/79999999999',
      description: 'Напишите в WhatsApp'
    }
  ],

  // Навигация
  navigation: {
    main: NAV_ITEMS,
    mobile: MOBILE_NAV_ITEMS
  }
};

/**
 * Хелперы для получения контента
 * В будущем будут заменены на API вызовы
 */

export const getHeroContent = () => SITE_CONTENT.hero;
export const getAllProducts = () => SITE_CONTENT.products;
export const getInfoItems = () => SITE_CONTENT.info;
export const getContactItems = () => SITE_CONTENT.contacts;
export const getNavigationItems = () => SITE_CONTENT.navigation;

// Получение конкретного элемента по ID
export const getInfoById = (id: string) =>
  SITE_CONTENT.info.find(item => item.id === id);

export const getContactById = (id: string) =>
  SITE_CONTENT.contacts.find(item => item.id === id);

export const getProductById = (id: number | string) =>
  SITE_CONTENT.products.find(item => item.id === id);

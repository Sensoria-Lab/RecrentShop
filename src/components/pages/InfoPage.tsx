import React, { useState } from 'react';
import Header from '../shared/Header';
import DecryptedText from '../shared/DecryptedText';

// Accordion item component
interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onToggle }) => (
  <div className="bg-black/40 backdrop-blur rounded-xl border border-white/8 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors"
    >
      <h3 className="text-white font-manrope font-semibold text-2xl">{title}</h3>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-8 pb-8 pt-0">
        <div className="w-full h-px bg-white/20 mb-6"></div>
        <div className="text-white font-manrope font-medium text-lg leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  </div>
);

const InfoPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const accordionItems = [
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
      content: `Договор публичной оферты о продаже товаров в интернет-магазине «recrentshop»

1. Общие положения

1.1. «recrentshop», далее «Продавец», публикует Публичную оферту о продаже товаров по образцам, представленным на официальном интернет-сайте Продавца https://recrentshop.ru.

1.2. В соответствии со статьей 437 Гражданского Кодекса Российской Федерации (ГК РФ) данный документ является публичной офертой, и в случае принятия изложенных ниже условий физическое лицо, производящее акцепт этой оферты, осуществляет оплату Товара Продавца в соответствии с условиями настоящего Договора.

В соответствии с пунктом 3 статьи 438 ГК РФ, оплата Товара Покупателем является акцептом оферты, что считается равносильным заключению Договора на условиях, изложенных в оферте.

1.3. На основании вышеизложенного, внимательно ознакомьтесь с текстом публичной оферты, и если вы не согласны с каким-либо пунктом оферты, Вам предлагается отказаться от покупки Товаров или использования Услуг, предоставляемых Продавцом.

1.4. В настоящей оферте, если контекст не требует иного, нижеприведенные термины имеют следующие значения:
• «Оферта» – публичное предложение Продавца, адресованное любому физическому лицу (гражданину), заключить с ним договор купли-продажи (далее – «Договор») на существующих условиях, содержащихся в Договоре, включая все его приложения.
• «Покупатель» – физическое лицо, заключившее с Продавцом Договор на условиях, содержащихся в Договоре.
• «Акцепт» – полное и безоговорочное принятие Покупателем условий Договора.
• «Товар» – перечень наименований ассортимента, представленный на официальном интернет-сайте.
• «Заказ» – отдельные позиции из ассортиментного перечня Товара, указанные Покупателем при оформлении заявки на интернет-сайте или через Оператора.
• «Доставка» – курьерские услуги по доставке Заказа.

2. Предмет договора

2.1. Продавец продает Товар в соответствии с действующим прейскурантом, опубликованным на интернет-сайте Продавца https://recrentshop.ru, а Покупатель производит оплату и принимает Товар в соответствии с условиями настоящего Договора.

2.2. Настоящий Договор и приложения к нему являются официальными документами Продавца и неотъемлемой частью оферты.

3. Оформление Заказа

3.1. Заказ Товара осуществляется Покупателем через Интернет-сайт https://recrentshop.ru

3.2. При регистрации на интернет-сайте Продавца Покупатель обязуется предоставить следующую регистрационную информацию о себе: фамилия, имя, отчество, фактический адрес доставки, индекс, адрес электронной почты, контактный телефон.

3.3. При оформлении Заказа через Оператора Покупатель обязуется предоставить информацию, указанную в п. 3.2. настоящего Договора.

[Полный текст оферты сокращен для удобства отображения]`
    },
    {
      id: 'track',
      title: 'Где мой заказ',
      content: `Отследить заказ можно после получения номера накладной от СДЭК или трек-номера от Почты России!

Все заказы в обработке 3-5 дней, после поступит уведомление:
• если Почта России - в смс на мобильный
• если СДЭК - на указанный адрес электронной почты!`
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with PC_black.png */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/backgrounds/main-background.png'), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'overlay'
        }}
      />

      {/* Main layout container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-center px-12 py-4 sticky top-0 z-50">
          <div className="max-w-[900px] w-full">
            <Header onNavigate={onNavigate} />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 px-20 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-16">
              <h1 className="text-white font-manrope font-bold text-5xl lg:text-6xl mb-4">
                Информация
              </h1>
              <div className="w-32 h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Accordion menu */}
            <div className="space-y-4">
              {accordionItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  isOpen={openSection === item.id}
                  onToggle={() => toggleSection(item.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InfoPage;
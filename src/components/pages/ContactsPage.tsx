import React from 'react';
import Header from '../shared/Header';


const ContactsPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
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

      {/* Decorative flowing lines overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/images/backgrounds/pattern.svg')`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
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
                Контакты
              </h1>
              <div className="w-32 h-1 bg-white/40 mx-auto"></div>
            </div>

            {/* Contact information block */}
            <div className="flex justify-center">
              <div className="bg-black/30 backdrop-blur rounded-xl p-16 max-w-4xl w-full text-center">
            <div className="space-y-8">
              {/* Email */}
              <div className="mb-12">
                <h2 className="text-white font-manrope font-extrabold text-4xl mb-8">
                  info@recrentshop.ru
                </h2>
              </div>

              {/* Business information */}
              <div className="text-white font-manrope font-semibold text-2xl leading-relaxed space-y-4">
                <p className="mb-6">
                  Индивидуальный предприниматель<br />
                  Осинцев Юрий Витальевич
                </p>

                <div className="space-y-2">
                  <p>
                    ИНН <span className="font-extrabold">450100470595</span>
                  </p>
                  <p>
                    ОГРНИП <span className="font-extrabold">321774600455545</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </main>
        </div>
    </div>
  );
};

export default ContactsPage;
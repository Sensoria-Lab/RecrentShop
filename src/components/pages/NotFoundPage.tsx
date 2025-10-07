import React from 'react';
import PageLayout from '../shared/PageLayout';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
          <div className="max-w-4xl mx-auto">
            {/* Page title */}
            <div className="text-center mb-16">
              <h1 className="text-white font-manrope font-bold text-5xl lg:text-6xl mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">404</h1>
              <div className="w-32 h-1 bg-white/40 mx-auto"></div>
            </div>
            <div className="flex justify-center">
              <div className="panel panel-strong p-16 max-w-4xl w-full text-center overflow-hidden">
                <div className="space-y-10">
                  <p className="text-white/80 font-manrope font-medium text-2xl leading-relaxed max-w-2xl mx-auto">
                    Страница не найдена или была перемещена. Возможно, вы ошиблись в адресе. Вы можете вернуться назад или перейти на главную.
                  </p>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="px-10 py-4 rounded-xl font-manrope font-semibold text-xl text-white bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-colors"
                    >
                      На главную
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="px-10 py-4 rounded-xl font-manrope font-semibold text-xl text-white bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 transition-colors"
                    >
                      Назад
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </PageLayout>
  );
};

export default NotFoundPage;
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-[#EAE2E6] mb-4">404</h1>
                <p className="text-white/70 text-xl mb-8">Страница не найдена</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#EAE2E6] hover:bg-[#EAE2E6]/90 text-[#191516] font-jetbrains text-[11px] tracking-[0.15em] uppercase px-6 py-3 transition-colors"
                >
                    На главную
                </Link>
            </div>
        </div>
    );
}


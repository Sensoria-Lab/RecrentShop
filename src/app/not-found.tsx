import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-[var(--rc-fg)] mb-4">404</h1>
                <p className="text-[var(--rc-fg-secondary)] text-xl mb-8">Страница не найдена</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[var(--rc-bg-invert)] hover:bg-[var(--rc-fg-subtle)] text-[var(--rc-bg-invert)] font-jetbrains text-[11px] tracking-[0.15em] uppercase px-6 py-3 transition-colors"
                >
                    На главную
                </Link>
            </div>
        </div>
    );
}


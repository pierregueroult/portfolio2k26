import { Header } from '@/features/landing/components/header';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <Header />
      <div className="blog-container">
        <p className="mt-42 text-center">{t('comingSoon')}</p>
      </div>
    </>
  );
}

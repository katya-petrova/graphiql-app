import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { i18nCookieName } from '@/middleware';
import { Button } from '../Button';

type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

const languages: LanguageOption[] = [
  { code: 'en', label: 'En', flag: '/flags/en.svg' },
  { code: 'ru', label: 'Ru', flag: '/flags/ru.svg' },
];

export const LanguageSwitcher = ({ isSlim }: { isSlim?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split('/').filter((part) => part);
  const currentLocale = pathParts[0] || 'en';

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languages.find((lang) => lang.code === currentLocale) ?? languages[0]
  );

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (language: LanguageOption) => {
    document.cookie = `${i18nCookieName}=${language.code}; path=/; max-age=31536000; SameSite=Lax`;
    setSelectedLanguage(language);
    setIsOpen(false);

    const newPathname = `/${language.code}${pathname.substring(3)}`;
    router.replace(newPathname);
    router.refresh();
  };

  return (
    <div ref={rootRef} className="flex-1 flex justify-center">
      <div className="relative">
        <Button
          data-testid="language-button"
          variant="secondary"
          className={`flex items-center duration-300 ${isOpen ? `border-gray-300 text-gray-300 shadow-[0_8px_10px_theme('colors.blue.800')]` : ''} hover:shadow-[0_8px_10px_theme('colors.blue.800')] font-semibold py-1 px-1.5 ${isSlim ? 'md:py-1' : 'md:py-1.5'} md:px-2 rounded-lg`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.label}
            width={20}
            height={20}
            className="mr-2 border-gray-300"
          />
          <span>{selectedLanguage.label}</span>
          <Image
            src={'/arrow-down.svg'}
            alt={'arrow'}
            width={18}
            height={18}
            className={`invert transition-transform duration-300 ease-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </Button>

        <ul
          className={`absolute flex flex-col w-full backdrop-blur-md border rounded-lg mt-1.5 left-0 transition-all duration-300 ease-out transform ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {languages.map((language) => {
            const isActive = selectedLanguage.code === language.code;
            return (
              <li key={language.code} className="flex justify-items-end">
                <Button
                  onClick={() => handleLanguageChange(language)}
                  variant="secondary"
                  className={`flex items-center w-full hover:bg-white hover:bg-opacity-15 hover:brightness-110 border-none select-none ${
                    isActive
                      ? 'bg-white bg-opacity-15 brightness-110 pointer-events-none'
                      : ''
                  }`}
                  tabIndex={selectedLanguage.code === language.code ? -1 : 0}
                >
                  <Image
                    src={language.flag}
                    alt={language.label}
                    width={20}
                    height={20}
                    className="mr-2 border border-gray-600 rounded-full"
                    style={{
                      boxShadow: isActive
                        ? '0 0 10px rgba(255, 255, 255, 0.7)'
                        : 'none',
                      border: isActive ? '1px solid #d1d5db' : 'none',
                    }}
                  />
                  {language.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

const languages: LanguageOption[] = [
  { code: 'en', label: 'En', flag: '/flags/en.svg' },
  { code: 'ru', label: 'Ru', flag: '/flags/ru.svg' },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languages[0]
  );

  const router = useRouter();
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const handleLanguageChange = (language: LanguageOption) => {
    const newPathname = `/${language.code}${pathname.substring(3)}`;
    router.replace(newPathname);
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        className="flex items-center hover:shadow-[0_8px_10px_theme('colors.blue.800')] font-semibold p-1.5 px-2 rounded-lg border border-white border-1 transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.label}
          width={24}
          height={24}
          className="mr-2"
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
      </button>

      <ul
        className={`absolute bg-gray-800 border overflow-hidden rounded-lg mt-1.5 left-0 transition-all duration-300 ease-out transform ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {languages.map((language) => (
          <li key={language.code}>
            <button
              onClick={() => handleLanguageChange(language)}
              className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-700 ${
                selectedLanguage.code === language.code
                  ? 'bg-gray-700 text-white'
                  : ''
              }`}
            >
              <Image
                src={language.flag}
                alt={language.label}
                width={24}
                height={24}
                className="mr-2 border border-gray-600 rounded-full"
              />
              {language.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

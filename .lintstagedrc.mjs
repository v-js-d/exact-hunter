const isWindows = process.platform === 'win32';

const config = {
  // На Linux/macOS: tsc только по изменённым файлам через @jonasgeiler/tsc-files
  // На Windows: полный typecheck по всему проекту (tsc-files глючит с pnpm+win)
  //FIXME: помимо всего этого tsc-files конфликтует с SVGR,
  // так как не подхватывает ambient-декларации (например *.svg из svg.d.ts).
  // tsc-files создаёт временный tsconfig и подставляет в files только застейдженные файлы;
  // объявление declare module '*.svg' из src/shared/types/svg.d.ts не попадает в программу проверки,
  // поэтому импорт .svg например в src/shared/assets/icons/index.ts даёт TS2307
  '**/*.ts?(x)': isWindows
    ? ['eslint --fix', 'prettier --write', () => 'pnpm typecheck']
    : ['eslint --fix', 'prettier --write', 'tsc-files --noEmit'],

  '*': 'prettier --write --ignore-unknown',
};

export default config;

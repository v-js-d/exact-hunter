// TODO: временно используем component. Удалить после решения проблемы с ts-files
export type { EHLogoProps } from './eh-logo/ui/EHLogo';
export { EHLogo } from './eh-logo/ui/EHLogo';

//FIXME: tsc-files конфликтует с SVGR,
// так как не подхватывает ambient-декларации (например *.svg из svg.d.ts).
// tsc-files создаёт временный tsconfig и подставляет в files только застейдженные файлы;
// объявление declare module '*.svg' из src/shared/types/svg.d.ts не попадает в программу проверки,
// поэтому импорт .svg например в src/shared/assets/icons/index.ts даёт TS2307
//export { default as EHLogo } from './eh-logo/eh-logo.svg';

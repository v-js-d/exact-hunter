import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    config.plugins?.push(
      svgr({
        // Настройка, чтобы импортировать так: import MyIcon from './icon.svg?react'
        // Или без ?react, если настроить инклюды
        include: '**/*.svg',
      }),
    );

    return config;
  },
};

export default config;

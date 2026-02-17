const config = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', 'tsc-files --noEmit'],

  '*': 'prettier --write --ignore-unknown',
};

export default config;

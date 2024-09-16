module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', '.github'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import', 'prettier'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'], // 내장 모듈과 외부 모듈을 먼저
                    ['internal'], // 내부 모듈
                    ['parent', 'sibling', 'index'], // 상위/형제/인덱스 모듈 순서로
                ],
                'newlines-between': 'always', // 그룹 간 줄바꿈을 강제
                alphabetize: { order: 'asc', caseInsensitive: true }, // 알파벳 순으로 정렬
            },
        ],
    },
};

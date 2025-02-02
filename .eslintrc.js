module.exports = {
    root: true,
    env: {
        node: true,
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript/recommended',
    ],
    rules: {
        'indent': ['error', 2], // Enforces a 2-space indent
        'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
        'vue/html-indent': ['error', 2, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'space-before-function-paren': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'no-trailing-spaces': 'error',
        'space-in-parens': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
        '@typescript-eslint/indent': ['error', 2], // Enforces a 2-space indent for TypeScript files
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                'indent': 'off',
            }
        },
        {
            files: ['*.ts'],
            rules: {
                '@typescript-eslint/indent': ['error', 2],
            }
        }
    ]
};

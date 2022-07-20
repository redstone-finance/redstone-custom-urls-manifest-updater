module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "max-len": ["error", 120],
  },
};

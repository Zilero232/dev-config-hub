<p align="center">
  <h1 align="center">Stylelint Configuration 🎯</h1>
</p>

<p align="center">
  <a href="https://github.com/Zilero232/dev-config-hub">
      <img src="https://img.shields.io/github/actions/workflow/status/Zilero232/dev-config-hub/integrate.yml?label=CI&logo=GitHub" alt="CI status">
    </a>
  <a href="https://www.npmjs.com/package/@zilero/tsconfigs">
      <img src="https://img.shields.io/npm/dm/@zilero/tsconfigs?logo=NPM" alt="npm downloads">
    </a>
  <a href="https://github.com/Zilero232/cli">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="npm license">
    </a>
  <a href="https://github.com/Zilero232/dev-config-hub/tree/main/tools/stylelint">
      <img src="https://img.shields.io/npm/v/@zilero/tsconfigs?label=version" alt="version">
    </a>
</p>

> ✨ Opinionated TypeScript configurations for modern development

## ✨ Features

- 📦 Zero-config setup
- 🎯 Strict type checking enabled
- 🔧 Modern ECMAScript features
- 🚀 Optimized for React/Next.js
- 💪 Path aliases support
- 📱 Module resolution strategies
- 🎭 Different environment presets

## 📥 Installation

### Using npm

```bash
npm install --save-dev @zilero/tsconfigs
```
### Using yarn

```bash
yarn add -D @zilero/tsconfigs
```

### Using pnpm

```bash
pnpm install -D @zilero/tsconfigs
```

## 🚀 Quick start

Create the `tsconfig.json` at the root of your project:

```json
{
  "extends": "./node_modules/@zilero/tsconfigs/tsconfig.base.json",
	"compilerOptions": {
  }
}
```

## 📚 Available Configurations

- `tsconfig.base.json`  - Base configuration for TypeScript projects
- `tsconfig.react.json` - Configuration for React applications
- `tsconfig.next.json`  - Configuration for Next.js projects
- `tsconfig.node.json`  - Configuration for Node.js applications

## 🤝 Contributing

We'd love for you to contribute to `@zilero/tsconfigs`! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is always appreciated.

### How to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## 📜 Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project to ensure a welcoming and productive atmosphere.

## 🔒 Security Policy

Security is our priority. If you encounter any issues, please read our full [Security Policy](SECURITY.md) to report vulnerabilities safely and responsibly.

## 👥 Team

These folks keep the project moving and are resources for help.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://career.habr.com/zilero">
          <img src="https://avatars.githubusercontent.com/u/68345676?s=400&u=eb7df22c29a8aca48def78ec54a7526601c9fd8f&v=4" width="100" height="100" alt="Artemev Alexandr - Avatar">
          <br />
          Artemev A. A.
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 📄 License

License `@zilero/tsconfigs` is licensed under the [MIT License](LICENSE).

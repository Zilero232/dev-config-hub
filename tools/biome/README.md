# 🌿 @zilero/biome

<p align="center">
  <a href="https://github.com/Zilero232/dev-config-hub">
    <img src="https://img.shields.io/github/actions/workflow/status/Zilero232/dev-config-hub/integrate.yaml?label=CI&logo=GitHub" alt="CI status">
  </a>
  <a href="https://www.npmjs.com/package/@zilero/biome">
    <img src="https://img.shields.io/npm/dm/@zilero/biome?logo=NPM" alt="npm downloads">
  </a>
  <a href="https://github.com/Zilero232/cli">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="npm license">
  </a>
  <a href="https://github.com/Zilero232/dev-config-hub/tree/main/tools/biome">
    <img src="https://img.shields.io/npm/v/@zilero/biome?label=version" alt="version">
  </a>
</p>

> ✨ Modern formatter, linter, and more for JavaScript, TypeScript, JSX, and JSON

## 📥 Installation

### Using npm

```bash
npm install --save-dev @zilero/biome
```
### Using yarn

```bash
yarn add -D @zilero/biome
```

### Using pnpm

```bash
pnpm install -D @zilero/biome
```

## 🚀 Quick start

Create the `biome.json` at the root of your project:

```json
{
	"extends": ["./node_modules/@zilero/biome/biome.json"]
}
```

Add scripts to your `package.json`:

```json
"scripts": {
  "biome:check": "biome check --no-errors-on-unmatched",
  "biome:lint": "biome check --write --unsafe --no-errors-on-unmatched",
  "biome:check-staged": "biome check --files-ignore-unknown=true --no-errors-on-unmatched --staged",
  "biome:lint-staged": "biome check --write --files-ignore-unknown=true --no-errors-on-unmatched --staged",
}
```

## 🤝 Contributing

We'd love for you to contribute to `@zilero/biome`! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is always appreciated.

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

License `@zilero/biome` is licensed under the [MIT License](LICENSE).

# Personal Portfolio Website

A modern personal portfolio website built with Astro and deployed on Netlify.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 📦 Build

To build the project for production:

```bash
npm run build
```

## 🌐 Deployment on Netlify

This project is configured for easy deployment on Netlify:

### Option 1: Connect Git Repository (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Netlify will automatically detect the build settings from `netlify.toml`
6. Deploy!

### Option 2: Manual Deploy
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify's deploy area

### Environment Variables
If you need environment variables:
1. Go to your Netlify site dashboard
2. Navigate to "Site settings" > "Environment variables"
3. Add your variables

## 🛠️ Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Astro components
│   ├── layouts/        # Page layouts
│   └── pages/          # Page routes
├── astro.config.mjs    # Astro configuration
├── netlify.toml        # Netlify deployment config
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Configuration

- **Astro Config**: `astro.config.mjs` - Main Astro configuration with Netlify adapter
- **Netlify Config**: `netlify.toml` - Build and deployment settings for Netlify
- **TypeScript**: `tsconfig.json` - TypeScript compiler options

## 📝 Notes

- The site is configured as a static site (`output: 'static'`)
- Remember to update the `site` URL in `astro.config.mjs` with your actual Netlify URL
- The Netlify configuration includes redirects for SPA-like behavior

## 🚀 Technologies Used

- [Astro](https://astro.build/) - Static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Netlify](https://netlify.com/) - Hosting and deployment

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

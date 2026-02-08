# Forge Monorepo

> A collection of 16 developer micro-tools - API testing, color palettes, QR codes, invoices, and more. All free, all in your browser.

## Tools Included

| Tool | Description | Port |
|------|-------------|------|
| **api-forge** | API Request Builder & Tester (like Postman) | 3001 |
| **color-forge** | Color Palette Generator | 3002 |
| **cron-forge** | Cron Expression Builder & Visualizer | 3003 |
| **diff-forge** | Text & Code Diff Viewer | 3004 |
| **email-forge** | Email Template Builder | 3005 |
| **font-forge** | Font Preview & Testing Tool | 3006 |
| **invoice-forge** | Invoice Generator with PDF Export | 3007 |
| **json-forge** | JSON Formatter, Validator & Editor | 3008 |
| **md-forge** | Markdown Editor & Preview | 3009 |
| **meta-forge** | Meta Tags Generator for SEO | 3010 |
| **pass-forge** | Secure Password Generator | 3011 |
| **qr-forge** | QR Code Generator & Reader | 3012 |
| **readme-forge** | AI-powered README Generator (CLI + Web) | 3013 |
| **regex-forge** | Regex Builder & Tester | 3014 |
| **screenshot-forge** | Screenshot & Image Editing Tool | 3015 |
| **screenshot-forge-api** | Screenshot API Service | 3016 |

## Quick Start

```bash
# Install dependencies
npm install

# Run all tools (serves from port 3000)
npm run dev

# Or run a specific tool
npm run serve:api-forge
npm run serve:color-forge
# ... etc
```

## Project Structure

```
forge-monorepo/
├── package.json          # Root with workspaces config
├── apps/
│   ├── api-forge/        # Each tool is a workspace
│   ├── color-forge/
│   ├── cron-forge/
│   ├── diff-forge/
│   ├── email-forge/
│   ├── font-forge/
│   ├── invoice-forge/
│   ├── json-forge/
│   ├── md-forge/
│   ├── meta-forge/
│   ├── pass-forge/
│   ├── qr-forge/
│   ├── readme-forge/     # Also has CLI functionality
│   ├── regex-forge/
│   ├── screenshot-forge/
│   └── screenshot-forge-api/
├── packages/
│   └── shared/           # Shared utilities (for future use)
└── README.md
```

## Development

### Running Individual Apps

Each app can be run independently:

```bash
# Using npm scripts
npm run serve:api-forge      # Opens http://localhost:3001
npm run serve:color-forge    # Opens http://localhost:3002

# Or using workspace commands
npm run dev --workspace=@forge/api-forge
```

### Running All Apps

The `dev` command serves all apps from a single server:

```bash
npm run dev
# All apps available at http://localhost:3000/[app-name]/
# e.g., http://localhost:3000/api-forge/
```

### Using README Forge CLI

The readme-forge tool also includes a CLI:

```bash
# Run the CLI directly
npm run readme-forge -- --help

# Or use it with arguments
npm run readme-forge -- ./path/to/project
```

## Tech Stack

Most tools are **zero-build static HTML** applications:
- Pure HTML5, CSS3, and Vanilla JavaScript
- No build step required
- Can be deployed directly to GitHub Pages or any static host

**readme-forge** also includes a Node.js CLI for generating READMEs programmatically.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all tools on port 3000 |
| `npm run serve:[tool]` | Start specific tool on its dedicated port |
| `npm run build` | Build all workspaces (runs if build script exists) |
| `npm run lint` | Lint all workspaces (runs if lint script exists) |
| `npm run test` | Test all workspaces (runs if test script exists) |
| `npm run readme-forge` | Run the README generator CLI |

## Port Assignments

To avoid conflicts, each tool has a dedicated port:

- **3000**: Development server for all apps (combined)
- **3001-3016**: Individual app ports (see table above)

## Workspaces

This monorepo uses npm workspaces. Each app is a workspace package:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

All apps use the `@forge/` scope:
- `@forge/api-forge`
- `@forge/color-forge`
- etc.

## Deployment

### GitHub Pages

Each app's `index.html` can be deployed directly. For the monorepo:

1. Build/copy apps to a `dist` folder
2. Deploy to GitHub Pages
3. Access at `https://username.github.io/forge-monorepo/[app-name]/`

### Vercel/Netlify

Configure the root as the deploy directory. Apps will be available at:
- `/api-forge/`
- `/color-forge/`
- etc.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to fork and modify!

---

Made with fire by [Simplereally](https://github.com/Simplereally)

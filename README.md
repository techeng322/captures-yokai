# Captures Yokai - Monitoring Dashboard

A Next.js dashboard for monitoring yokai (spirits) in real-time across Tokyo.

## Features

- Real-time monitoring of spiritual energy spikes
- Anomaly list with threat level indicators
- Capture functionality with optimistic updates
- Server-Sent Events (SSE) for live updates

## Tech Stack

- Next.js 14 (App Router)
- React 18+
- Feature Sliced Design (FSD)
- TanStack Query
- SCSS Modules
- Zod validation
- Docker Compose

## Getting Started

### Using Docker Compose

```bash
docker-compose up
```

### Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/monitoring](http://localhost:3000/monitoring) in your browser.

### Building for Production

**On Windows:** The standalone build requires symlink permissions. Choose one:

1. **Enable Developer Mode** (Recommended):
   - Open Windows Settings → Privacy & Security → For developers
   - Enable "Developer Mode"
   - This allows symlinks without administrator privileges

2. **Build in Docker** (Recommended for production):
   ```bash
   docker build -t captures-yokai .
   ```
   This avoids Windows symlink issues entirely.

3. **Run as Administrator**:
   - Right-click PowerShell/Command Prompt → "Run as Administrator"
   - Then run `pnpm build`

## Project Structure

The project follows Feature Sliced Design (FSD) architecture:

```
src/
├── app/              # Next.js App Router pages
├── shared/           # Shared utilities, types, UI components
├── entities/         # Business entities
└── features/         # Features (capture, monitoring)
```

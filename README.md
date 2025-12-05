# Captures Yokai - Monitoring Dashboard

A real-time monitoring dashboard built with Next.js for tracking and capturing yokai (spirits) across Tokyo. Operators can monitor spiritual energy spikes in real-time and dispatch cleanup teams to capture anomalies.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## ✨ Features

### Real-time Monitoring
- **Live Updates**: Server-Sent Events (SSE) stream updates every 3 seconds
- **Threat Level Changes**: Random spirits change threat levels dynamically (Low → Medium → High → Critical)
- **Connection Status**: Visual indicator for SSE connection state

### Anomaly Management
- **Spirit Cards**: Display list of spirits with detailed information:
  - Name (e.g., Kitsune, Oni, Tengu)
  - Threat Level (color-coded: Low, Medium, High, Critical)
  - Location (Tokyo districts)
  - Status (Active/Caught)
- **Capture Functionality**: One-click capture with optimistic updates

### User Experience
- **Optimistic Updates**: Instant UI feedback when capturing spirits
- **Error Handling**: Automatic rollback on capture failure (30% probability)
- **Notifications**: User-friendly error and success notifications
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Core
- **Next.js 14** - App Router with React Server Components
- **React 18+** - Latest React features and hooks
- **TypeScript** - Type-safe development

### Architecture
- **Feature Sliced Design (FSD)** - Strict architectural methodology
- **TanStack Query** - Server state management and caching
- **Zod** - Runtime type validation for all API data

### Styling
- **SCSS Modules** - Component-scoped styling
- **Custom Design System** - Consistent UI components

### DevOps
- **Docker & Docker Compose** - Containerized deployment
- **pnpm** - Fast, disk space efficient package manager

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **pnpm** 9.0.0 (specified in `packageManager` field)
- **Docker** and **Docker Compose** (for containerized deployment)
- **Git** (for version control)

### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm@9.0.0

# Using Homebrew (macOS)
brew install pnpm

# Using standalone script
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## 🚀 Getting Started

### Quick Start with Docker Compose (Recommended)

The easiest way to run the application:

```bash
# Clone the repository
git clone <repository-url>
cd captures-yokai

# Start the application
docker-compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000)

To run in detached mode:
```bash
docker-compose up -d
```

To stop the application:
```bash
docker-compose down
```

### Local Development

For local development without Docker:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will start on [http://localhost:3000](http://localhost:3000)

Navigate to [http://localhost:3000/monitoring](http://localhost:3000/monitoring) to see the dashboard.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 📁 Project Structure

The project follows **Feature Sliced Design (FSD)** architecture:

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Route Handlers
│   │   └── spirits/
│   │       ├── route.ts           # GET /api/spirits
│   │       ├── stream/route.ts    # GET /api/spirits/stream (SSE)
│   │       └── [id]/capture/route.ts  # POST /api/spirits/:id/capture
│   ├── monitoring/        # Monitoring page
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # React Query provider
│
├── shared/                # Shared resources
│   ├── lib/              # Utilities and helpers
│   │   ├── api.ts        # API client functions
│   │   └── mockSpirits.ts # Mock data
│   ├── types/            # TypeScript types and Zod schemas
│   │   ├── spirit.ts     # Spirit entity schema
│   │   ├── api.ts        # API parameter schemas
│   │   └── ...
│   ├── ui/               # Shared UI components
│   │   ├── SpiritCard/   # Spirit card component
│   │   └── Notification/ # Notification component
│   └── styles/           # Global styles
│
├── entities/             # Business entities (if needed)
│
└── features/             # Feature modules
    ├── monitoring-spirits/  # Monitoring feature
    │   └── hooks/
    │       ├── useSpirits.ts        # Fetch spirits list
    │       ├── useSpiritUpdates.ts  # SSE updates hook
    │       └── useConnectionStatus.ts # Connection status
    └── capture-spirit/      # Capture feature
        └── hooks/
            └── useCaptureSpirit.ts  # Capture mutation
```

### FSD Layer Rules

- **app/** - Application initialization, routing, providers
- **features/** - Business features (monitoring, capture)
- **entities/** - Business entities (spirits, users, etc.)
- **shared/** - Reusable code (UI, utilities, types)

## 🔌 API Documentation

### GET `/api/spirits`

Returns a list of all spirits.

**Response:**
```json
[
  {
    "id": "spirit-1",
    "name": "Kitsune",
    "threatLevel": "High",
    "location": "Shibuya",
    "status": "Active"
  }
]
```

### GET `/api/spirits/stream`

Server-Sent Events (SSE) stream for real-time updates.

**Response Format:**
```
data: {"id":"spirit-1","threatLevel":"Critical","timestamp":1234567890}

```

**Update Frequency:** Every 3 seconds

**Event Data:**
- `id` - Spirit ID
- `threatLevel` - New threat level (Low, Medium, High, Critical)
- `timestamp` - Unix timestamp

### POST `/api/spirits/:id/capture`

Captures a spirit by ID.

**Response (Success):**
```json
{
  "id": "spirit-1",
  "name": "Kitsune",
  "threatLevel": "High",
  "location": "Shibuya",
  "status": "Caught"
}
```

**Response (Error - 30% probability):**
```json
{
  "message": "Capture failed: Spirit escaped!"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (spirit already caught)
- `404` - Spirit not found
- `500` - Capture failed (30% chance)

## 💻 Development Guide

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Code formatting
- **SCSS Modules**: Component-scoped styles

### Adding a New Feature

1. Create feature folder in `src/features/`
2. Follow FSD structure:
   - `ui/` - Feature-specific components
   - `hooks/` - Custom React hooks
   - `lib/` - Feature utilities
3. Use shared types from `src/shared/types/`
4. Validate all API data with Zod schemas

### Testing API Routes

You can test API routes using curl:

```bash
# Get all spirits
curl http://localhost:3000/api/spirits

# Capture a spirit
curl -X POST http://localhost:3000/api/spirits/spirit-1/capture

# Stream updates (SSE)
curl -N http://localhost:3000/api/spirits/stream
```

## 🏗 Building for Production

### Windows Users

The standalone build requires symlink permissions. Choose one:

1. **Enable Developer Mode** (Recommended):
   - Open Windows Settings → Privacy & Security → For developers
   - Enable "Developer Mode"
   - This allows symlinks without administrator privileges
   - Then run: `pnpm build`

2. **Build in Docker** (Recommended for production):
   ```bash
   docker build -t captures-yokai .
   ```
   This avoids Windows symlink issues entirely.

3. **Run as Administrator**:
   - Right-click PowerShell/Command Prompt → "Run as Administrator"
   - Navigate to project directory
   - Run: `pnpm build`

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

The production build uses Next.js standalone output mode for optimized Docker deployments.

## 🐛 Troubleshooting

### Build Errors

#### "Static page generation timeout"
- **Solution**: API routes are already marked as `dynamic = 'force-dynamic'`
- This error should not occur with the current configuration

#### "EPERM: operation not permitted, symlink" (Windows)
- **Solution**: Enable Developer Mode or build in Docker
- See [Building for Production](#building-for-production)

#### "ERR_PNPM_FETCH_500" (npm registry errors)
- **Solution**: The `.npmrc` file includes retry configuration
- Wait a few minutes and retry, or check [npm status](https://status.npmjs.org/)
- Docker builds download pnpm binary directly from GitHub to bypass npm registry

### Runtime Issues

#### SSE Connection Not Working
- Check browser console for errors
- Verify `/api/spirits/stream` endpoint is accessible
- Ensure no proxy/firewall blocking SSE connections

#### Capture Not Working
- Check network tab for API errors
- Verify spirit ID exists in mock data
- Check browser console for validation errors

### Docker Issues

#### Port Already in Use
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

#### Build Fails
```bash
# Clean Docker cache and rebuild
docker-compose build --no-cache
docker-compose up
```

## 🚢 Deployment

### Docker Deployment

1. **Build the image:**
   ```bash
   docker build -t captures-yokai .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 captures-yokai
   ```

3. **Using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV` - Set to `production` for production builds
- `PORT` - Server port (default: 3000)
- `HOSTNAME` - Server hostname (default: "0.0.0.0")

### Production Considerations

- **Standalone Mode**: Optimized for Docker deployments
- **Static Assets**: Automatically optimized and cached
- **API Routes**: All marked as dynamic for proper server-side rendering
- **Error Handling**: Comprehensive error boundaries and validation

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the project maintainers.

---

**Built with ❤️ using Next.js and Feature Sliced Design**

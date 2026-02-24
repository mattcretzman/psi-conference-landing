# PSI Conference Landing

Config-driven conference landing page template for PSI Athletic Trainer recruitment events.

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS + Framer Motion
- Express + Drizzle ORM (PostgreSQL)
- GoHighLevel webhook integration

## Quick Start
```bash
npm install
# Set VITE_CONFERENCE=maata-2026 (or seata-2026)
# Set DATABASE_URL=postgres://...
npm run dev
```

## Adding a New Conference
1. Create `client/src/config/your-conference.ts` (copy an existing one)
2. Register in `client/src/config/index.ts`
3. Deploy with `VITE_CONFERENCE=your-conference`

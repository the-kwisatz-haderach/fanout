# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who care a lot about music and go to many concerts. They often don't know anyone else who likes the same bands, so they go alone or miss shows. They come to fanout to find concerts worth going to and to meet people who are into the same music, especially people going to the same show.

## Product Purpose

Fanout lets people find concerts and connect with others who are interested in the same concerts and bands. It succeeds when a fan finds a show they want to see and also finds people to share it with.

## Positioning

Fanout puts concert discovery, setlists, merch, and meeting other fans in one shared interface. Today these live in separate apps. The social side is tied to a specific concert and to shared bands, not to a general social graph: the reason two people connect is that they're going to the same show or love the same artists.

## Operating Context

- Users browse upcoming concerts and narrow them down by genre and band.
- Around a concert, users look at setlists and merch.
- Users find and connect with others who are going to the same concert.

## Capabilities and Constraints

Confirmed capabilities:
- Browse concerts.
- Filter concerts by genre and by band.
- View setlists.
- View merch.
- Connect with other users going to the same concert.

Technical context: a pnpm and Turborepo monorepo. `packages/web` is Next.js 16 with Tailwind v4. `packages/api` is Fastify with Drizzle on Postgres. Shared types and logic belong in `packages/shared`.

Not decided yet (don't assume these in design work):
- What "connect" means: messaging, following, group chats for a concert, meetup coordination, or something else.
- Where concert, setlist, and merch data comes from, and whether merch can be bought in the app or only viewed.
- Whether setlists are past setlists, predicted setlists, or both.
- Geographic scope, and whether discovery is based on location.
- Account, profile, and privacy model, including what other users can see about someone.

## Evidence on Hand

None yet. There are no users, testimonials, partner venues or artists, or real concert data in the repo. Don't invent any of these. The web app is still the `create-next-app` starter, and the `users` table in `packages/api/src/db/schema.ts` is a placeholder.

## Product Principles

1. **The concert is the anchor.** Discovery, setlists, merch, and people all gather around a specific show, so every path should lead back to a concert or come out of one.
2. **Shared taste is the reason to connect.** Suggest people because of shared concerts and bands, never just because they're on the platform.
3. **One place, not a bundle.** The features should feel like one product with a shared model, not separate tools placed side by side.
4. **Make it easy to go together.** Success isn't only finding a show. It's not having to go alone.

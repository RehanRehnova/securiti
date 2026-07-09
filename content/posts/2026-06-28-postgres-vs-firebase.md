---
title: Postgres vs Firebase — We Migrated 2M Users Off Firebase
slug: postgres-vs-firebase
date: 2026-06-28
category: Engineering
excerpt: Firebase costs scaled to $8k/month. Queries timed out at 1M rows. We moved to Postgres + Supabase. Latency dropped 80%. Here's the migration.
thumbnail: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/blog/postgres-firebase.jpg
author: Rehan Khan
author_role: Founder & CTO
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/team/rehan.jpg
tags: [Database, Firebase, Postgres, Scaling]
featured: false
read_time: 9 min read
---

## The Firebase Bill

Month 1: $40  
Month 6: $800  
Month 18: $8,200  

**Reads cost money. Writes cost money. Bandwidth costs money.** At 2M users, we were paying Firebase rent.

### When Firebase Dies

1. **Complex queries** — "Users from Pakistan with >3 orders last month" = client-side filter of 500k docs
2. **Joins** — Don't exist. You denormalize or suffer.
3. **Backups** — Export = $200 + 6 hours

### The Postgres Migration

**Stack:** Supabase [hosted Postgres] + Prisma

```prisma
model User {
  id String @id @default(cuid())
  email String @unique
  country String @index
  orders Order[]
}

model Order {
  id String @id
  userId String
  amount Int
  createdAt DateTime @default(now()) @index
  user User @relation(fields: [userId], references: [id])
}

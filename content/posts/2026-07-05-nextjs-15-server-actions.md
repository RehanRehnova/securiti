---
title: Next.js 15 Server Actions — We Deleted All API Routes
slug: nextjs-15-server-actions
date: 2026-07-05
category: Web Apps
excerpt: No more /api folder. No more fetch. No more loading states. Server Actions cut 40% of our codebase. Here's how we migrated 100% in 2 weeks.
thumbnail: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/blog/nextjs-15.jpg
author: Rehan Khan
author_role: Founder & CTO
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/team/rehan.jpg
tags: [Next.js, React, Full-Stack, Performance]
featured: false
read_time: 6 min read
---

## Before: The API Route Hell

```ts
// /api/invoices/route.ts
export async function POST(req) {
  const body = await req.json()
  const validated = schema.parse(body)
  const invoice = await db.insert(invoices).values(validated)
  return Response.json(invoice)
}

// /components/InvoiceForm.tsx
const [loading, setLoading] = useState(false)
const onSubmit = async (data) => {
  setLoading(true)
  await fetch('/api/invoices', { method: 'POST', body: JSON.stringify(data) })
  setLoading(false)
  router.refresh()
}

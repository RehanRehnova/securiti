---
title: Case Study How We Cut Client Onboarding From 3 Days to 8 Hours for a Lahore Design Agency
slug: lahore-design-agency-onboarding-case-study
date: 2026-07-06
category: Case Studies
excerpt: An 18-person design agency in Lahore serving US clients was onboarding manually with Notion and Calendly. We built a custom portal and automation. Result 35 hours saved per month.
thumbnail: https://res.cloudinary.com/dhcayqpqr/image/upload/v1783623112/20260709_232932_0000_nns7qu.png
author: Rehan Bhatti
author_role: Founder and CEO, Rehnova Digitals
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1783611674/IMG_20260708_185742_599_gkzqwf.png
tags:
  - Automation
  - Pakistan
featured: false
read_time: 7 min read
---

## **The Client**

> Note: Client name is withheld due to NDA. All metrics shared with permission.

A design agency based in Lahore. 18 person team. 95 percent clients from US and UK. Service: UI UX design for SaaS startups.

20 to 25 new clients per month.

## **The Problem**

Their client onboarding was killing time.

**Old flow:**

1. Client pays deposit via Wise or Stripe

2. Account manager emails Notion template link manually

3. Client fills discovery form on Typeform

4. Account manager copies answers to Notion manually

5. Client books kickoff call on Calendly

6. After call, designer creates Figma file manually and shares link

7. Account manager sends welcome email with 6 different links

Founder told us, "Our clients think we are unprofessional before we even start designing."

**Numbers:**

- Onboarding time: 3 days average

- Founder time: 1.5 hours per client

- Account manager time: 1 hour per client

- Total: 2.5 hours per client × 25 = 62.5 hours per month on admin

Two US clients cancelled projects because onboarding was slow and confusing.

## **What We Built**

We replaced 6 tools with one system.

**Stack:**

1. Next.js web app — custom client portal

2. Postgres database

3. Stripe webhooks for payment trigger

4. n8n for automation

5. Figma API for file creation

**New flow:**

1. Client pays via Stripe

2. Stripe webhook fires instantly

3. System creates client account in portal automatically

4. System creates Figma file from template via API and shares with client

5. System sends one email: "Welcome. Login here. Everything is inside."

6. Client logs into portal: discovery form, project timeline, Figma link, invoices, files — all in one place

7. System auto schedules kickoff call based on designer availability

No Notion. No Typeform. No manual email. No copy paste.

We also built an internal dashboard for the agency. They see every client status: Paid, Form Pending, Call Booked, Design Started.

## **Results After 60 Days**

**Before:**

- Onboarding time: 3 days

- Team time per client: 2.5 hours

- Tools: Notion, Calendly, Typeform, Gmail, Figma, Stripe — all separate

- Client complaints: 3 per month about confusion

**After:**

- Onboarding time: 8 hours average

- Team time per client: 20 minutes

- Tools: One portal plus automation

- Client complaints: Zero in last 60 days

- Time saved: 35 hours per month for founder + 27 hours for account manager

- Extra benefit: Client NPS score went from 7.2 to 9.1

Cost to run: 30 dollars per month hosting on Hetzner.

Previous tools: 240 dollars per month for Typeform pro, Calendly teams, extra Notion seats, Zapier.

## **The Impact**

This was not just about saving time.

**1. Automation removed human delay**

Payment at 2 AM triggers everything. No waiting for account manager to wake up.

**2. Web app created trust**

US clients log into a branded portal. Not 6 random links. It looks like a $10M agency, not a freelancer.

**3. Data pipeline gave visibility**

Founder knows exactly where each client is stuck. Before, he had to ask in Slack.

That is what we do at Rehnova. We combine custom web apps, automation, and data pipelines so Pakistan agencies can compete globally.

The agency now spends those 62 hours on design and sales, not admin.

---
title: Case Study How We Built a Lead Management System for a Dubai Real Estate Agency
slug: dubai-real-estate-lead-automation-case-study
date: 2026-07-05
category: Case Studies
excerpt: A Dubai real estate agency with 25 agents was losing leads in WhatsApp groups. We built a custom web app that auto-captures leads and assigns them. Lead response time went from 2 hours to 3 minutes.
thumbnail: https://media.securiti.ai/wp-content/uploads/2024/05/Thumbnail-Navigating-the-AI-Frontier_.png
author: Rehan Bhatti
author_role: Founder and CEO, Rehnova Digitals
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1783611674/IMG_20260708_185742_599_gkzqwf.png
tags: [Case Studies, Web Apps, Automation, UAE, Real Estate]
featured: false
read_time: 8 min read
---

## **The Client**

> Note: Client name is withheld due to NDA. All metrics shared with permission.

A real estate agency based in Dubai. 25 agents. Selling off-plan properties in Dubai Marina and Downtown.

Leads come from Property Finder, Bayut, Facebook Ads, and Instagram.

300 to 400 leads per month.

## **The Problem**

Every lead was dying in WhatsApp groups.

**Old flow:**

1. Lead comes from Property Finder to agency email

2. Admin forwards lead to main WhatsApp group with 25 agents

3. First agent to reply gets the lead

4. Agent messages lead manually on WhatsApp

5. No follow-up tracking. No CRM. No idea if lead was contacted.

**Pain points:**

- Response time: 2 hours average. Sometimes 6 hours. Hot leads go cold.

- Lead disputes: 3 agents fight over same lead every week

- Lost leads: Admin estimated 40 percent leads never contacted

- No data: Owner had no idea which agent is performing, which source works

- Agents waste time asking "Is this lead taken?" in WhatsApp group

One deal worth 1.2M AED was lost because two agents contacted the same client and gave different prices. Client walked away.

## **What We Built**

We built one system to kill WhatsApp chaos.

**Stack:**

1. Next.js web app — custom CRM portal

2. Postgres for database

3. n8n for automation

4. WhatsApp Business API for messaging

5. Property Finder and Facebook webhooks

**New flow:**

1. Lead comes from Property Finder or Facebook

2. Webhook sends to our system instantly

3. System auto assigns lead to agent using round-robin logic

4. Agent gets WhatsApp notification in 10 seconds: "New lead assigned. Name: Ahmed. Budget: 2M AED. Call now."

5. If agent does not call in 15 minutes, system auto reassigns to next agent

6. All chat history, notes, follow-ups saved in portal

7. Owner dashboard shows live metrics: leads per source, response time per agent, deals closed

Agents no longer use WhatsApp groups. They login to portal. One screen shows all their leads, reminders, documents.

## **Results After 90 Days**

**Before:**

- Lead response time: 2 hours average

- Leads contacted: 60 percent estimated

- Lead disputes: 12 per month

- Owner visibility: Zero. Just WhatsApp screenshots

- Tools: Email, WhatsApp, Excel — chaos

**After:**

- Lead response time: 3 minutes average

- Leads contacted: 98 percent

- Lead disputes: Zero. System decides.

- Owner visibility: Full dashboard. Knows cost per lead, conversion per agent

- Tools: One portal. WhatsApp only for client chat, not for lead distribution

- Extra result: Deals closed increased 40 percent in 3 months because no hot lead is missed

Cost to run: 45 dollars per month hosting plus WhatsApp API costs.

Previous chaos cost: Lost deals worth millions per year.

## **The Impact**

This was three things working together.

**1. Automation solved speed**

Webhook to WhatsApp in 10 seconds. No human delay. In Dubai real estate, first to respond wins.

**2. Web app solved trust and data**

Agents now look professional. They have full client history before calling. Owner has real data, not "I think we got 200 leads."

**3. Data pipeline solved disputes**

Round-robin logic in Postgres. No argument. System is fair. Agents focus on selling, not fighting.

That is what we do at Rehnova. We take broken WhatsApp workflows and turn them into systems that scale.

The owner told us, "For the first time I can sleep. I know no lead is being missed."

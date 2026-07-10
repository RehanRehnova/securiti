---
title: Case Study How We Automated Operations for a UAE Business Setup Firm With Team in Pakistan
slug: uae-business-setup-automation-case-study
date: 2026-07-04
category: Case Studies
excerpt: A Dubai business setup firm with operations in Karachi was managing client documents on email and WhatsApp. We built a secure portal for document collection and visa tracking. Support tickets dropped 60 percent.
thumbnail: https://media.securiti.ai/wp-content/uploads/2023/08/what-is-first-party-data-banner-securiti.jpg
author: Rehan Bhatti
author_role: Founder and CEO, Rehnova Digitals
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1783611674/IMG_20260708_185742_599_gkzqwf.png
tags: [Case Studies, Web Apps, Automation, UAE, Pakistan]
featured: false
read_time: 8 min read
---

## The Client

> Note: Client name is withheld due to NDA. All metrics shared with permission.

A business setup consultancy registered in Dubai Mainland. Operations team of 22 people based in Karachi, Pakistan. Sales team in Dubai.

They help entrepreneurs register companies, process visas, open bank accounts.

80 to 100 new clients per month.

## The Problem

Their entire operation was running on Gmail and WhatsApp.

**Old flow:**

1. Sales closes client in Dubai

2. Client emails passport copy to sales

3. Sales forwards to Karachi team on WhatsApp

4. Karachi team asks for 6 more documents one by one on WhatsApp

5. Client sends photos, sometimes blurry, sometimes wrong format

6. Team saves in Google Drive folders manually

7. Client asks "what is my visa status" every 2 days on WhatsApp

8. Team checks Excel and replies manually

**Pain points:**

- Document collection: Took 12 days average. Clients sent wrong files, missed files

- Status updates: 200+ WhatsApp messages per day from clients asking "update?"

- Data security: Passport copies on personal WhatsApp. Major compliance risk

- Team time: 5 full-time staff just replying to status messages

- Client complaints: "Why do I have to send same document twice?"

Two clients cancelled because they felt the process was unprofessional and unsafe.

## What We Built

We built a secure client portal plus automation.

**Stack:**

1. Next.js web app — client portal with secure document upload

2. Postgres for data

3. n8n for automation and notifications

4. AWS S3 for encrypted document storage

5. WhatsApp Business API for status updates only

**New flow:**

1. Sales closes client and creates account in portal

2. Client gets one link via WhatsApp: "Upload your documents here"

3. Portal shows checklist: Passport, Photo, Emirates ID, etc. Shows what is uploaded, what is pending

4. Client uploads. System validates file type and size instantly

5. Karachi team gets notified in Slack: "Client Ahmed uploaded Passport"

6. Team updates visa status in portal: Step 1, Step 2, Step 3

7. Client gets auto WhatsApp message: "Your visa moved to Step 3: Medical scheduled"

8. Client can login anytime to see live status. No need to message.

No documents on WhatsApp. No email attachments. No "update?" messages.

We also built an internal dashboard. Manager sees every client pipeline stage. Knows which staff is delaying which step.

## Results After 120 Days

**Before:**

- Document collection time: 12 days average

- Support messages per day: 200+ on WhatsApp

- Staff on status updates: 5 people

- Data security: Zero. Passport copies on personal phones

- Client experience: Multiple WhatsApp threads, confusing

**After:**

- Document collection time: 3 days average

- Support messages per day: 70 — 60% drop

- Staff on status updates: 2 people. 3 moved to processing work

- Data security: All documents encrypted in S3. Access logs tracked

- Client experience: One login. Clear checklist. Live tracking like Aramex

- Extra result: Client NPS went from 6.5 to 8.8

Cost to run: 60 dollars per month for hosting and S3.

Previous cost: 5 staff × time wasted = thousands per month.

## The Impact

This solved three bottlenecks every service business faces.

**1. Web app solved trust and compliance**

Clients upload passport to a branded portal, not WhatsApp. Feels like a bank. Safe. Dubai clients care about this.

**2. Automation solved communication**

Status updates sent automatically. Team stops being human chatbots.

**3. Data pipeline solved visibility**

Owner sees real-time pipeline. 100 clients, which step, which staff, which bottleneck. Before was Excel chaos.

This is why UAE companies hire Pakistan teams — quality work at good cost. But WhatsApp operations kill trust.

We gave them systems so they look like a Dubai enterprise, run by Karachi efficiency.

That is what we do at Rehnova. We build web apps and automation for service businesses that handle sensitive data and high client volume.
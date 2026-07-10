---
title: Self-Hosted n8n — Replace $500/mo Zapier in 1 Hour
slug: self-hosted-n8n-zapier-replacement
date: 2026-06-20
category: Automation
excerpt: Zapier bills us $492/mo for 50k tasks. n8n on a $6 VPS does unlimited. Here's the Docker setup + 3 workflows we use in production.
thumbnail: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/blog/n8n-zapier.jpg
author: Rehan Khan
author_role: Founder & CTO
author_avatar: https://res.cloudinary.com/dhcayqpqr/image/upload/v1/team/rehan.jpg
tags: [Automation, n8n, DevOps, Self-Hosted]
featured: false
read_time: 5 min read
---

## Zapier: $0.02 per task

## n8n: $0.00 per task

We run 380k tasks/month. Math says switch.

### 1-Hour Setup

```bash
# docker-compose.yml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports: ["5678:5678"]
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=change_me
    volumes: ["n8n_data:/home/node/.n8n"]
volumes: { n8n_data: }

# Website Builder and Management Platform

## Overview
A web application combining a Next.js frontend with a Laravel backend for managing websites, pages, templates, themes, and user workflows.

## Problem / Context
The source supports website content creation and management through dashboard and template-oriented screens.

## Core Capabilities
- Website and page management flows.
- Template selection and theme preferences.
- Admin/dashboard and authentication views.
- Laravel backend models/controllers for website, page, template, and user operations.

## Architecture
Next.js/React frontend with separate user/admin areas and a Laravel 10 backend. This is a clean snapshot; original Git history was not copied.

## Tech Stack
Next.js, React, Redux Toolkit, TanStack Query, Laravel, PHP, Composer, npm.

## Main Workflows
Users authenticate, browse or create website content, select templates, and manage pages and theme preferences.

## Domain Model
Websites, pages, templates, themes/preferences, users, and authentication state are represented in the source.

## Integrations
Production hosting, analytics, custom domains, and external integrations were not verified.

## Engineering Highlights
The source separates a Next.js UI from a Laravel backend and includes authentication, template, and theme-management code.

## Setup
Install frontend dependencies with npm and configure the backend using a copy `.env.example` to a local `.env` and generate an application key. Use disposable local data; never connect this copy to production.

## Configuration
Use local environment files for API endpoints, database, mail, and app keys. No credentials are included.

## Testing
Frontend manifest/lockfile parsing, PHP syntax, and Composer manifest validation are performed for this snapshot. Cypress scripts exist; no configured end-to-end run is claimed.

## Security & Privacy
Environment files, dumps, logs, seeders, uploads, gallery media, and contact data were excluded or normalized. Supplied third-party MIT notices are retained.

## Limitations
This is a website builder/management app. A profile/link-hub directory, custom domains, analytics, and production deployment were not verified. The source includes inherited boilerplate and third-party assets.

## Project Status
Legacy application source published for engineering review; current operational status is unknown.

## Ownership / Provenance
Source supplied by Mohamed Gamal, who confirms authority to publish his work. The source's MIT boilerplate attribution is retained where present; publication history starts clean.

## License / Usage
Retained upstream MIT notices apply to covered files. No additional license grant for custom project code is added here.

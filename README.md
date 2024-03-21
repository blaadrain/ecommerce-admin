# Fullstack Ecommerce Admin Dashboard with React, NextJS, TailwindCSS, Prisma & MySQL

![dashboard](https://github.com/blaadrain/ecommerce-admin/assets/96272057/694b6f08-e1d4-4266-8e82-abf8addbd745)

Key Features:

- Serves as CMS, Admin and API
- Ability to control mulitple vendors / stores through this single CMS
- Ability to create, update and delete Products, Categories & Billboards
- Ability to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form
- Ability to search through all categories, products, sizes, colors, billboards with included pagination using TanStack tables
- Ability to upload multiple images for products, and change them whenever you want (in development)
- Ability to control which products are "featured" so they show on the homepage
- Ability to control which products are "archived" so they never show anywhere in the store
- Ability to see your orders, sales, products left in stock
- Ability to see graphs of your revenue
- Authentication via Clerk
- MySQL + Prisma setup

### Prerequisites

**Node version 18.x**

### Cloning the repository

```shell
git clone https://github.com/blaadrain/ecommerce-admin.git
```

### Install packages

```shell
pnpm i
```

### Setup .env file

```js
DATABASE_URL=''
FRONTEND_STORE_URL=http://localhost:3001

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Start the app

```shell
pnpm run dev
```

## Available commands

Running commands with npm `pnpm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |



# Fincra Currency Converter

## Developing the app

### Generating zod schemas from dto

 1. Run the following command to generate a zod schema from a dto file

    ```bash
    pnpm ts-to-zod src/_generated/createHospitalDto.ts src/_generated/createHospitalDtoSchema.ts
    ```

    where `createHospitalDto.ts` is the dto file and `createHospitalDtoSchema.ts` is the output zod schema
 2. Use the generated schema as a starter code boilerplate for further creating your form schema

## 🎉 Tech Stack

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast, opinionated frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework.
- **Tailwind Prettier Plugin** - A Prettier plugin for formatting Tailwind CSS classes.
- **ESLint** - A pluggable linting utility for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 20.19.0)
- pnpm (package manager)

## 🚀 Getting Started

Follow these steps to get started with the react-vite-ui template:

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Generate OpenAPI react-query hooks and Api entites from the backend server

   ```bash
   pnpm codegen
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

## 📜 Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.
- pnpm codegen - Generates OpenAPI react-query hooks and Api entites from the backend server.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
frontend/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── .eslintrc.cjs     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.js # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## 🎇 Pre Push House Keeping

1. Pull from remote branch

   ```bash
   git pull origin HEAD
   ```

2. Ensure you have the most recent Open API schema

   ```bash
   pnpm codegen
   ```

3. Ensure the application passes the build command and fix any error that surfaces

   ```bash
   pnpm build
   ```

## How to find the right hook for your API call

1. Reference the [swagger documentation](https://v2.api.bloomers.ng/swagger).

2. The CRUD (CREATE-READ-UPDATE-DELETE) acronym is used for GET/POST/PATCH/PUT/DELETE Request

3. A GET request will have the word `Read/Create` in it's hook.

4. A POST request will have the word `Create/create` in it's hook.

5. A PATCH/PUT request will have the word `Update/update` in it's hook.

6. A DELETE request will have the word `Delete/delete` in it's hook.

7. A GET request that returns an array will have the plural form of the entity in it's name, eg `*ReadHospitals`

8. A Hook that expresses verbs like `login`, `logout` or `forgot-password` will not follow the above-stated `CRUD` convention but rather will be have the `camelCased` version of the url in their name.

9. A request that has a path param like `hospital/parent/:parent-id` will have the `ById` prefix in its name

### Example url and hooks

- /api/auth/signup --> `useSignup`
- /api/auth/forgot-password --> `useForgotPassword`
- GET /api/hospital --> `useReadHospitals`
- POST /api/hospital --> `useCreateHospital`
- GET /api/hospital/dashboard/overview --> `useReadHospitalDashboardOverview`
- GET /api/hospital/parents/{parentId} --> `useReadHospitalParentById`
- POST /api/hospital/parents/{parentId} --> `useCreateHospitalChildByParentId`

### Created with # [React + Vite + TypeScript Template (react-vite-ui)](https://github.com/dan5py/react-vite-ui.git)

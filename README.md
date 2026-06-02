# Blogger Application

A production-grade, highly optimized, Neobrutalist-designed blog application built with Next.js, React, Tailwind CSS, and MongoDB. Featuring seamless light, dark, and system color transitions, a robust session validation security system, automated dynamic SEO routes, and a full CI/CD test automation setup.

---

## Features

- **Responsive Neobrutalist UI**: Vibrant visual elements, harsh drop-shadows, strict thick borders, and highly premium modern layouts that adapt seamlessly to mobile, tablet, and desktop screens.
- **Three-Mode Theme Control**: Implements selectable Light, Dark, and System modes that persist user preferences in local storage, respect OS settings dynamically, and completely eliminate flash-on-load.
- **Session-Secured Administration**: Protects all administrative actions (adding products, managing posts, deleting subscribers, and changing profiles) through a secure cryptographic session token cookie with CSRF and directory traversal mitigations.
- **Dynamic SEO Automation**: Automated, dynamic sitemaps (`sitemap.xml`) and web crawler configurations (`robots.txt`) that pull published posts live from the MongoDB database.
- **Newsletter Subscription**: Responsive subscription form and dashboard to manage email subscriptions.
- **Unit Testing Setup**: Pre-configured Jest test runner to validate utility functions.
- **Continuous Integration Pipeline**: Automated GitHub Actions workflow to run lint checks, tests, and build checks on push and pull requests.

---

## Tech Stack

- **Framework**: [Next.js 15.5.9](https://nextjs.org/) (App Router)
- **Library**: [React 19.1.0](https://react.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) with PostCSS
- **Database**: [Mongoose / MongoDB](https://mongoosejs.com/)
- **Utilities**: Axios, React Icons, React Toastify, Sharp
- **Testing**: Jest

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # CI/CD pipeline definition
├── __tests__/
│   └── session.test.js        # Unit tests for session utilities
├── app/
│   ├── admin/                 # Private administrative pages
│   ├── api/                   # Serverless API routes (authenticated & public)
│   ├── blogs/                 # Public dynamic blog pages
│   ├── profile/               # Public author profile pages
│   ├── globals.css            # Custom CSS & Tailwind imports
│   ├── layout.js              # Base layout with theme injection
│   ├── page.js                # Home landing page
│   ├── robots.js              # Dynamic Robots configuration
│   └── sitemap.js             # Dynamic Sitemap configuration
├── Assets/                    # Local static assets & mock data
├── Components/
│   ├── AdminComponents/       # Admin dashboard subcomponents
│   └── ...                    # Shared components (ThemeToggle, Header, etc.)
├── lib/
│   ├── config/                # Database connection configuration
│   ├── context/               # Global state contexts (ThemeContext)
│   ├── models/                # MongoDB Schema models
│   └── utils/                 # Cryptographic and authentication utilities
├── eslint.config.mjs          # Linting rules
├── jest.config.js             # Test runner configuration
├── jsconfig.json              # Path aliases
├── middleware.js              # Routing & auth middleware
└── package.json               # Dependencies & build scripts
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Darksun-Dyuti/z-blog-app.git
   cd z-blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

Create a `.env.local` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env.local
```

Configure the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB connection URI string | `mongodb://127.0.0.1:27017/blogapp` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `securepass123` |
| `ADMIN_SESSION_SECRET`| Secure secret key for cryptographic session signing | `your-secret-32-chars-long-string` |
| `NEXT_PUBLIC_SITE_URL`| Production deployment domain (for SEO routes) | `https://zblogapp.vercel.app` |

---

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- **`npm run build`**: Builds the application for production to the `.next` folder.
- **`npm run start`**: Starts the production server after compiling the build.
- **`npm run lint`**: Runs ESLint to check code quality and syntax compliance.
- **`npm run test`**: Runs the Jest unit test suites.

---

## Development Setup

1. Spin up a local MongoDB instance (or connect to a MongoDB Atlas cluster).
2. Configure your credentials in `.env.local`.
3. Seed the default profile by running the app and accessing `/profile` once.
4. Run `npm run dev` and navigate to `/admin` to log in with your credentials.

---

## Build Instructions

To compile the application for production deployment:
```bash
npm run build
```
Verify that static pages are generated correctly and the server routes build without errors.

---

## Deployment Guide

### Vercel Deployment

1. Import the repository in your Vercel Dashboard.
2. Add your `.env.local` keys under **Environment Variables** in project settings.
3. Configure the Framework Preset to **Next.js**.
4. Click **Deploy**. Vercel will automatically build the app and deploy serverless functions for the API routes.

### Docker / VPS Deployment

1. Build the production image:
   ```bash
   docker build -t blog-app .
   ```
2. Start the container with appropriate environment variables:
   ```bash
   docker run -p 3000:3000 --env-file .env.local blog-app
   ```

---

## Troubleshooting

- **MongoDB Connection Timeout**: Ensure your local MongoDB daemon is running, or verify network firewall configurations/IP Whitelisting on MongoDB Atlas.
- **Auth Signature Failures**: If changing host environments, ensure `ADMIN_SESSION_SECRET` remains identical to prevent active admin sessions from being invalidated.
- **Next.js Hydration Mismatch**: Handled automatically by utilizing `suppressHydrationWarning` on `<html>` and resolving the theme client-side within a single script tag before body execution.

---

## Performance Notes

- **Static Pre-rendering**: Public static pages are pre-rendered at build time. Dynamic routes use Server-Side rendering where appropriate.
- **Image Optimization**: All icons and cover images are loaded utilizing `next/image` to enforce layout stability (avoid Cumulative Layout Shift) and leverage next-gen format conversion (`webp`/`avif`).
- **Web Crypto Speed**: Sessions are verified using native Web Crypto API calls (`crypto.subtle`), avoiding execution bottlenecks from external signing libraries.

---

## Security Notes

- **API Protection**: All non-public APIs evaluate incoming cookies using the crypto engine. Unsupported request parameters or unauthorized states reject with `401 Unauthorized`.
- **Directory Traversal Safeguards**: File writes strip path variables and sanitize filenames before writing onto disk storage.
- **Security Headers**: Standard Next.js config rules enforce `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

---

## Contributing Guide

1. Fork the repository.
2. Create a branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Future Improvements

- Add OAuth support for administrative login (e.g., Auth.js / NextAuth).
- Implement WebAuthn / Passkeys for passwordless admin authentication.
- Integrate a rich visual WYSIWYG editor (like TipTap) for writing blog posts.

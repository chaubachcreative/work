# Chau Bach Site

Static multi-page site wired for Vite, React 18, TypeScript, Tailwind CSS v3, and shadcn/ui-compatible design tokens.

## Local Development

```bash
npm install
npm run dev
```

Vite will serve the site at the local URL printed in the terminal. The pages are:

- `/`
- `/checkout.html`
- `/client_portal.html`
- `/admin.html`

## Production Build

```bash
npm run build
npm run typecheck
npm run preview
```

Deploy the generated `dist/` folder to any static host.

## Connecting a Domain

1. Deploy this repo to a static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
2. Set the host build command to `npm run build`.
3. Set the publish/output directory to `dist`.
4. Add your custom domain in the host dashboard.
5. Update DNS at your domain registrar using the records your host provides.

For most hosts, use:

- Apex/root domain: `A` records or an `ALIAS`/`ANAME` record from the host.
- `www` subdomain: `CNAME` pointing to the host-provided target.

After DNS propagates, enable HTTPS in the host dashboard if it is not automatic.

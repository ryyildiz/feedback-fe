import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
  type LinksFunction,
} from 'react-router';
import '../styles.css';

export const meta: MetaFunction = () => [
  {
    title: 'Fikrini Paylaş',
  },
];

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://fonts.cdnfonts.com/css/greycliff-cf',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

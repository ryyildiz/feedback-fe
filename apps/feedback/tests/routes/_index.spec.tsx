import { test } from 'vitest';
import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import App from '../../app/app';

test('renders app without crashing', async () => {
  const ReactRouterStub = createRoutesStub([
    {
      path: '/',
      Component: App,
    },
  ]);

  render(<ReactRouterStub />);

  await screen.findByText('Turkcell');
});

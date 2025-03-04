import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <div className='mx-auto max-w-2xl p-2 min-h-dvh'>
        <Outlet />
      </div>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}

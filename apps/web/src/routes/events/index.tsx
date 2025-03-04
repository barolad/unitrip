import { getAllEvents } from '@entities/event';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
  loader: getAllEvents,
  head: () => ({
    meta: [{ title: 'Мероприятия' }]
  })
});

function RouteComponent() {
  const events = Route.useLoaderData();

  return (
    <>
      {events.map((event) => (
        <div>{Object.values(event)}</div>
      ))}
    </>
  );
}

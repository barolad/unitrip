import { createFileRoute } from "@tanstack/react-router";
import { eventsQueryOptions } from "@/entities/event/api/eventsQueryOptions";

export const Route = createFileRoute("/")({
  component: App,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(eventsQueryOptions),
});

function App() {
  return <div>Главная</div>;
}

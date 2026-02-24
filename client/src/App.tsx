import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ConferenceContext, resolveConference } from "@/config";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";

const conference = resolveConference();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConferenceContext.Provider value={conference}>
        <Landing />
        <Toaster />
      </ConferenceContext.Provider>
    </QueryClientProvider>
  );
}

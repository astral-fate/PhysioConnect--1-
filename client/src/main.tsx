import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "@/components/ui/toaster";
import PhysioApp from "./pages/PhysioApp";
import BookingFlow from "./pages/BookingFlow";
import Progress from "./pages/Progress";
import Chat from "./pages/Chat";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <div dir="rtl">
        <Switch>
          <Route path="/" component={PhysioApp} />
          <Route path="/book" component={BookingFlow} />
          <Route path="/progress" component={Progress} />
          <Route path="/chat" component={Chat} />
          <Route>404 - الصفحة غير موجودة</Route>
        </Switch>
        <Toaster />
      </div>
    </SWRConfig>
  </StrictMode>
);

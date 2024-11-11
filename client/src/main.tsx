import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import PhysioApp from "./pages/PhysioApp";
import ProgressPage from "./pages/ProgressPage";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <div dir="rtl">
        <Switch>
          <Route path="/" component={PhysioApp} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/chat" component={ChatPage} />
          <Route>404 - الصفحة غير موجودة</Route>
        </Switch>
        <Toaster />
      </div>
    </SWRConfig>
  </StrictMode>
);

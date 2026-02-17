import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { VariantProvider } from "./contexts/VariantContext";
import Home from "./pages/Home";
import Vendors from "@/pages/Vendors";
import Demo from "@/pages/Demo";
import Variants from "./pages/Variants";
import Specs from "@/pages/Specs";
import Calculator from "@/pages/Calculator";
import Roadmap from "./pages/Roadmap";
import Risks from "./pages/Risks";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/vendors" component={Vendors} />
      <Route path="/demo" component={Demo} />
      <Route path="/variants" component={Variants} />
      <Route path="/specs" component={Specs} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/risks" component={Risks} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <VariantProvider>
          <TooltipProvider>
          <Toaster />
<Router />
          </TooltipProvider>
        </VariantProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

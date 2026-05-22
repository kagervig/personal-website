import { ThemeProvider } from "./ThemeProvider";
import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryClientProviderWrapper>
        {children}
      </QueryClientProviderWrapper>
    </ThemeProvider>
  );
}

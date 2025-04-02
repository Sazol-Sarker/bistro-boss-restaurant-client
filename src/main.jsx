import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <div className="max-w-7xl mx-auto">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>
);

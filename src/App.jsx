import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import LoginPage from "./login/LoginPage";
import DashboardLayout from "./dashboard/DashboardLayout";

import { CMSHome } from "./pages/CMSHome";
import  ModernWhyChoosePage  from "./sections/ModernWhyChoosePage";
import { TeamPage } from "./sections/TeamPage";
import { ModernHeroPage } from "./sections/ModernHeroPage";

import { tokenManager } from "./services/api";
import ModernProgramsPage from "./sections/ModernProgramsPage";
import HighlightCardPage from "./sections/HighlightCardPage";
import OurSupportedCard from "./sections/OurSupportedCard";
import PartnerUniversity from "./sections/PartnerUniversity";
import StudyStepPage from "./sections/StudyStepPage";

function ProtectedRoute({ children }) {
  if (!tokenManager.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CMSHome />,
      },
      {
        path: "whychoose",
        element: <ModernWhyChoosePage />,
      },

      {
        path: "programs",
        element: <ModernProgramsPage />
      },

      {
        path: "highlight",
        element: <HighlightCardPage />
      },

      {
        path: "team",
        element: <TeamPage />,
      },
      {
        path: "hero",
        element: <ModernHeroPage />,
      },

      {
        path: "support",
        element: <OurSupportedCard />
      },

      {
        path: "partnerUni",
        element: <PartnerUniversity />
      },

      {
        path: "/studystep",
        element: <StudyStepPage />
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
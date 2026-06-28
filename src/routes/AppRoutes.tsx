import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import NotesListPage from "../pages/NotesListPage";
import CreateNotePage from "../pages/CreateNotePage";
import EditNotePage from "../pages/EditNotePage";
import NoteDetailsPage from "../pages/NoteDetailsPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/notes" element={<NotesListPage />} />
                    <Route path="/notes/create" element={<CreateNotePage />} />
                    <Route path="/notes/:id" element={<NoteDetailsPage />} />
                    <Route path="/notes/:id/edit" element={<EditNotePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default AppRoutes;

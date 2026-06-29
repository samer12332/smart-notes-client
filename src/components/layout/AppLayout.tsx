import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import ThemeToggle from "../ui/ThemeToggle";

function AppLayout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rounded-lg px-3 py-2 text-sm font-medium ${
            isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }`;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-lg font-bold">Smart Notes</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user?.email}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/notes" className={linkClass}>
                            Notes
                        </NavLink>

                        <NavLink to="/profile" className={linkClass}>
                            Profile
                        </NavLink>

                        <ThemeToggle />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </header>

            <Outlet />
        </div>
    );
}

export default AppLayout;

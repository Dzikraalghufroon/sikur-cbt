import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './page_admin/dashboard/dashboard';
import ProtectedRouteAdmin from './page_admin/Protectedroute';
const Alur = () => {
    //</ProtectedRouteAdmin>
    return (
        <Router>
            <Routes>
                <Route
                    path="/admin-dashboard"
                    element={
                        // <ProtectedRouteAdmin>
                            <AdminDashboard />
                        
                    }
                />
            </Routes>
        </Router>
    )
}
export default Alur;
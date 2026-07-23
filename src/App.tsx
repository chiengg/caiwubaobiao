import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import OrganizationManage from "@/pages/OrganizationManage";
import AccountManage from "@/pages/AccountManage";
import CurrencyManage from "@/pages/CurrencyManage";
import PeriodManage from "@/pages/PeriodManage";
import ScopeManage from "@/pages/ScopeManage";
import EquityManage from "@/pages/EquityManage";
import DataCollection from "@/pages/DataCollection";
import Consolidation from "@/pages/Consolidation";
import WorkPaper from "@/pages/WorkPaper";
import Reports from "@/pages/Reports";
import CustomReport from "@/pages/CustomReport";
import FinancialAnalysis from "@/pages/FinancialAnalysis";
import WorkflowManage from "@/pages/WorkflowManage";
import UserManage from "@/pages/UserManage";
import PermissionManage from "@/pages/PermissionManage";
import LogManage from "@/pages/LogManage";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings/organization" element={<OrganizationManage />} />
              <Route path="/settings/accounts" element={<AccountManage />} />
              <Route path="/settings/currency" element={<CurrencyManage />} />
              <Route path="/settings/period" element={<PeriodManage />} />
              <Route path="/scope" element={<ScopeManage />} />
              <Route path="/equity" element={<EquityManage />} />
              <Route path="/collection" element={<DataCollection />} />
              <Route path="/consolidation" element={<Consolidation />} />
              <Route path="/workpaper" element={<WorkPaper />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/custom-report" element={<CustomReport />} />
              <Route path="/analysis" element={<FinancialAnalysis />} />
              <Route path="/workflow" element={<WorkflowManage />} />
              <Route path="/system/users" element={<UserManage />} />
              <Route path="/system/permissions" element={<PermissionManage />} />
              <Route path="/system/logs" element={<LogManage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

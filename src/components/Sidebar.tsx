import { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Building,
  FileText,
  DollarSign,
  Calendar,
  Network,
  PieChart,
  Upload,
  Merge,
  FileSpreadsheet,
  BarChart3,
  BarChart2,
  TrendingUp,
  GitBranch,
  Users,
  User,
  Shield,
  FileCheck,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { navigationItems } from '../data/mockData';
import { useLocation, useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Settings,
  Building,
  FileText,
  DollarSign,
  Calendar,
  Network,
  PieChart,
  Upload,
  Merge,
  FileSpreadsheet,
  BarChart3,
  BarChart2,
  TrendingUp,
  GitBranch,
  Users,
  User,
  Shield,
  FileCheck,
};

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['settings', 'system']);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const renderNavigationItem = (item: typeof navigationItems[0], depth = 0) => {
    const Icon = iconMap[item.icon] || LayoutDashboard;
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id);
            } else {
              navigate(item.path);
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          } ${depth > 0 ? `pl-${4 + depth * 4}` : ''}`}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
        >
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
          <span className="flex-1 text-left">{item.name}</span>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map((child) => renderNavigationItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="h-16 bg-gradient-to-r from-blue-700 to-blue-600 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">合并报表系统</h1>
            <p className="text-blue-100 text-xs">Consolidation System</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {navigationItems.map((item) => renderNavigationItem(item))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">系统管理员</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
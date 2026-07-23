import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Shield, User, Check, X } from 'lucide-react';

interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const permissions: Permission[] = [
  { id: 1, name: '查看仪表盘', code: 'dashboard:view', description: '查看系统仪表盘', category: '系统' },
  { id: 2, name: '管理组织', code: 'organization:manage', description: '管理组织架构', category: '基础设置' },
  { id: 3, name: '管理科目', code: 'account:manage', description: '管理会计科目', category: '基础设置' },
  { id: 4, name: '管理币种', code: 'currency:manage', description: '管理币种汇率', category: '基础设置' },
  { id: 5, name: '管理期间', code: 'period:manage', description: '管理会计期间', category: '基础设置' },
  { id: 6, name: '配置合并范围', code: 'scope:configure', description: '配置合并范围', category: '合并设置' },
  { id: 7, name: '管理股权', code: 'equity:manage', description: '管理股权结构', category: '合并设置' },
  { id: 8, name: '数据采集', code: 'collection:manage', description: '管理数据采集', category: '合并流程' },
  { id: 9, name: '合并处理', code: 'consolidation:manage', description: '执行合并处理', category: '合并流程' },
  { id: 10, name: '查看工作底稿', code: 'workpaper:view', description: '查看合并工作底稿', category: '合并流程' },
  { id: 11, name: '查看报表', code: 'reports:view', description: '查看合并报表', category: '报表' },
  { id: 12, name: '导出报表', code: 'reports:export', description: '导出合并报表', category: '报表' },
  { id: 13, name: '财务分析', code: 'analysis:view', description: '查看财务分析', category: '分析' },
  { id: 14, name: '管理流程', code: 'workflow:manage', description: '管理工作流程', category: '系统' },
  { id: 15, name: '管理用户', code: 'user:manage', description: '管理系统用户', category: '系统管理' },
  { id: 16, name: '管理权限', code: 'permission:manage', description: '管理权限角色', category: '系统管理' },
];

const roles: Role[] = [
  { 
    id: 1, 
    name: '系统管理员', 
    description: '拥有系统全部权限', 
    permissions: ['dashboard:view', 'organization:manage', 'account:manage', 'currency:manage', 'period:manage', 'scope:configure', 'equity:manage', 'collection:manage', 'consolidation:manage', 'workpaper:view', 'reports:view', 'reports:export', 'analysis:view', 'workflow:manage', 'user:manage', 'permission:manage'],
    userCount: 1 
  },
  { 
    id: 2, 
    name: '财务主管', 
    description: '负责合并报表审核和发布', 
    permissions: ['dashboard:view', 'collection:manage', 'consolidation:manage', 'workpaper:view', 'reports:view', 'reports:export', 'analysis:view', 'workflow:manage'],
    userCount: 1 
  },
  { 
    id: 3, 
    name: '合并专员', 
    description: '负责数据采集和合并处理', 
    permissions: ['dashboard:view', 'organization:manage', 'account:manage', 'scope:configure', 'equity:manage', 'collection:manage', 'consolidation:manage', 'workpaper:view', 'reports:view'],
    userCount: 2 
  },
  { 
    id: 4, 
    name: '审计专员', 
    description: '查看报表和分析数据', 
    permissions: ['dashboard:view', 'reports:view', 'analysis:view'],
    userCount: 1 
  },
];

export default function PermissionManage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter(perm => 
    perm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perm.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(permissions.map(p => p.category))];

  const handleOpenModal = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions([...role.permissions]);
    setShowModal(true);
  };

  const togglePermission = (code: string) => {
    if (selectedPermissions.includes(code)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== code));
    } else {
      setSelectedPermissions([...selectedPermissions, code]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">权限管理</h1>
          <p className="text-gray-500 mt-1">管理系统角色和权限配置</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          添加角色
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'roles' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            角色管理
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'permissions' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            权限列表
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
            />
          </div>

          {activeTab === 'roles' ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredRoles.map((role) => (
                <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{role.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{role.description}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      <User className="w-3 h-3" />
                      {role.userCount}人
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">权限数: {role.permissions.length}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => handleOpenModal(role)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <Edit className="w-3.5 h-3.5" />
                      编辑权限
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <Trash2 className="w-3.5 h-3.5" />
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category} className="border border-gray-200 rounded-lg">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">{category}</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {filteredPermissions
                      .filter(p => p.category === category)
                      .map((perm) => (
                        <div key={perm.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{perm.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{perm.code}</p>
                          </div>
                          <p className="text-xs text-gray-500 max-w-xs">{perm.description}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">编辑角色权限</h2>
                <p className="text-sm text-gray-500">{selectedRole.name} - {selectedRole.description}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {categories.map((category) => (
                <div key={category} className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {permissions
                      .filter(p => p.category === category)
                      .map((perm) => (
                        <button
                          key={perm.id}
                          onClick={() => togglePermission(perm.code)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedPermissions.includes(perm.code)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {selectedPermissions.includes(perm.code) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-400 rounded" />
                          )}
                          {perm.name}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                取消
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                保存权限
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

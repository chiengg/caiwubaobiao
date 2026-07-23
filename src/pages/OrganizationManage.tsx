import { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronRight, Building2, Globe, MapPin, DollarSign } from 'lucide-react';
import { organizations, currencies } from '../data/mockData';
import type { Organization } from '../types';

export default function OrganizationManage() {
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 5, 6]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credit_code: '',
    registered_address: '',
    currency_code: 'CNY',
    parent_id: null as number | null,
    is_consolidation: false,
  });

  const toggleExpand = (id: number) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      code: '',
      name: '',
      credit_code: '',
      registered_address: '',
      currency_code: 'CNY',
      parent_id: null,
      is_consolidation: false,
    });
  };

  const handleEdit = (org: Organization) => {
    setFormData({
      code: org.code,
      name: org.name,
      credit_code: org.credit_code,
      registered_address: org.registered_address,
      currency_code: org.currency_code,
      parent_id: org.parent_id,
      is_consolidation: org.is_consolidation,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const renderTree = (orgs: Organization[], depth = 0) => {
    return orgs.map((org) => {
      const isExpanded = expandedNodes.includes(org.id);
      const hasChildren = org.children && org.children.length > 0;
      const isSelected = selectedOrg?.id === org.id;

      return (
        <div key={org.id}>
          <div
            onClick={() => {
              setSelectedOrg(org);
              if (hasChildren) toggleExpand(org.id);
            }}
            className={`flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors ${
              isSelected
                ? 'bg-blue-50 border-r-4 border-blue-600'
                : 'hover:bg-gray-50'
            }`}
            style={{ paddingLeft: `${16 + depth * 16}px` }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )
            ) : (
              <div className="w-4" />
            )}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              org.is_consolidation ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Building2 className={`w-5 h-5 ${
                org.is_consolidation ? 'text-blue-600' : 'text-gray-500'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{org.name}</p>
              <p className="text-xs text-gray-500">{org.code}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(org);
                }}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:bg-red-100 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          </div>
          {hasChildren && isExpanded && renderTree(org.children!, depth + 1)}
        </div>
      );
    });
  };

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">组织架构管理</h1>
          <p className="text-gray-500 mt-1">管理集团内所有法人单位的层级关系</p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>新增组织</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索组织..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
            {renderTree(filteredOrgs)}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          {selectedOrg ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">{selectedOrg.name}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(selectedOrg)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    编辑
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm">
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">基本信息</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">组织代码</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOrg.code}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">统一社会信用代码</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOrg.credit_code || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">注册地</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOrg.registered_address || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">财务信息</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">记账本位币</p>
                        <p className="text-sm font-medium text-gray-900">
                          {currencies.find((c) => c.code === selectedOrg.currency_code)?.name || selectedOrg.currency_code}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">是否合并主体</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedOrg.is_consolidation
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedOrg.is_consolidation ? '是' : '否'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">层级关系</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">上级组织</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedOrg.parent_id
                            ? organizations.find((o) => o.id === selectedOrg.parent_id)?.name || '-'
                            : '无（根节点）'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">子组织数量</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedOrg.children?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">状态信息</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">状态</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedOrg.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedOrg.status === 'active' ? '正常' : '停用'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Building2 className="w-16 h-16 mb-4" />
              <p className="text-lg">请选择一个组织</p>
              <p className="text-sm mt-2">从左侧列表中选择组织查看详情</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? '编辑组织' : '新增组织'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">组织代码 *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入组织代码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">组织名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入组织名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">统一社会信用代码</label>
                <input
                  type="text"
                  value={formData.credit_code}
                  onChange={(e) => setFormData({ ...formData, credit_code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入统一社会信用代码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">注册地</label>
                <input
                  type="text"
                  value={formData.registered_address}
                  onChange={(e) => setFormData({ ...formData, registered_address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入注册地"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">记账本位币 *</label>
                <select
                  value={formData.currency_code}
                  onChange={(e) => setFormData({ ...formData, currency_code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.code}>
                      {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">上级组织</label>
                <select
                  value={formData.parent_id || ''}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">无（根节点）</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_consolidation"
                  checked={formData.is_consolidation}
                  onChange={(e) => setFormData({ ...formData, is_consolidation: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_consolidation" className="text-sm font-medium text-gray-700">
                  设为合并主体
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? '保存修改' : '创建组织'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
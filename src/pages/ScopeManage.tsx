import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, History, Building2 } from 'lucide-react';
import { consolidationScopes } from '../data/mockData';
import type { ConsolidationScope, ScopeItem } from '../types';

export default function ScopeManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scopeList, setScopeList] = useState<ConsolidationScope[]>(consolidationScopes);
  const [selectedScope, setSelectedScope] = useState<ConsolidationScope | null>(consolidationScopes[0] || null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<ConsolidationScope>>({});

  const handleOpenModal = () => {
    setFormData({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSave = () => {
    setScopeList([...scopeList, {
      ...formData,
      id: Date.now(),
      items: []
    } as ConsolidationScope]);
    handleCloseModal();
  };

  const handleDeleteScope = (id: number) => {
    setScopeList(scopeList.filter(s => s.id !== id));
    if (selectedScope?.id === id) {
      setSelectedScope(scopeList.find(s => s.id !== id) || null);
    }
  };

  const getMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      full: '全面合并',
      proportionate: '比例合并',
      equity: '权益法'
    };
    return labels[method] || method;
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      full: 'bg-blue-100 text-blue-700',
      proportionate: 'bg-orange-100 text-orange-700',
      equity: 'bg-orange-100 text-orange-700'
    };
    return colors[method] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      included: '已纳入',
      excluded: '仅权益法'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      included: 'bg-green-100 text-green-700',
      excluded: 'bg-orange-100 text-orange-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const filteredItems = selectedScope?.items?.filter(item =>
    item.org_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.org_code.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">合并范围配置</h1>
          <span className="text-gray-500"> - </span>
          <span className="text-gray-700 font-medium">{selectedScope?.name || '-'}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">2026年6月</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 text-sm">
            <History className="w-4 h-4" />
            <span>历史版本</span>
          </button>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>新增范围</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="输入编码/名称等关键字搜索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {scopeList.map((scope) => (
              <button
                key={scope.id}
                onClick={() => setSelectedScope(scope)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedScope?.id === scope.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {scope.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">序号</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">子公司代码</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">子公司名称</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">板块</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">持股比例</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">合并方式</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">本位币</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">纳入状态</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">生效日期</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{index + 1}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{item.org_code}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{item.org_name}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.segment}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-mono">{item.share_ratio}%</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getMethodColor(item.consolidation_method)}`}>
                      {getMethodLabel(item.consolidation_method)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-mono">{item.currency_code}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.inclusion_status)}`}>
                      {getStatusLabel(item.inclusion_status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.effective_date}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            共 <span className="font-semibold">{filteredItems.length}</span> 条记录
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">上一页</button>
            <button className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded">1</button>
            <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">下一页</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">新增合并范围</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合并范围名称</label>
                <input
                  type="text"
                  value={(formData.name || '') as string}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入合并范围名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={(formData.description || '') as string}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="请输入合并范围描述"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

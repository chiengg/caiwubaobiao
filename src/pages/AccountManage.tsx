import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronRight, FileText, Download, Upload, Settings, MoreHorizontal, Check, X } from 'lucide-react';
import { accounts } from '../data/mockData';
import type { Account } from '../types';

export default function AccountManage() {
  const [activeTab, setActiveTab] = useState<string>('asset');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([1, 21, 31, 36, 37]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'asset' as Account['type'],
    balance_direction: 'debit' as Account['balance_direction'],
    parent_id: null as number | null,
    is_liquid: false,
    category: '',
    mnemonic_code: '',
    status: 'active' as 'active' | 'inactive',
  });

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const tabs = [
    { key: 'asset', label: '资产', type: 'asset' },
    { key: 'liability', label: '负债', type: 'liability' },
    { key: 'equity', label: '权益', type: 'equity' },
    { key: 'cost', label: '成本', type: 'cost' },
    { key: 'income', label: '损益', type: 'income' },
  ];

  const getTypeColor = (type: Account['type']) => {
    switch (type) {
      case 'asset':
        return 'text-blue-600 bg-blue-100';
      case 'liability':
        return 'text-red-600 bg-red-100';
      case 'equity':
        return 'text-green-600 bg-green-100';
      case 'income':
        return 'text-purple-600 bg-purple-100';
      case 'expense':
        return 'text-orange-600 bg-orange-100';
      case 'cost':
        return 'text-cyan-600 bg-cyan-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeName = (type: Account['type']) => {
    switch (type) {
      case 'asset':
        return '资产';
      case 'liability':
        return '负债';
      case 'equity':
        return '权益';
      case 'income':
        return '收入';
      case 'expense':
        return '费用';
      case 'cost':
        return '成本';
      default:
        return type;
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchType = acc.type === activeTab || (activeTab === 'income' && (acc.type === 'income' || acc.type === 'expense'));
    const matchStatus = showInactive || acc.status === 'active';
    const matchSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        acc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        acc.mnemonic_code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const getParentAccount = (parentId: number | null) => {
    if (!parentId) return null;
    return accounts.find((acc) => acc.id === parentId);
  };

  const handleSubmit = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      code: '',
      name: '',
      type: 'asset',
      balance_direction: 'debit',
      parent_id: null,
      is_liquid: false,
      category: '',
      mnemonic_code: '',
      status: 'active',
    });
  };

  const handleEdit = (account: Account) => {
    setFormData({
      code: account.code,
      name: account.name,
      type: account.type,
      balance_direction: account.balance_direction,
      parent_id: account.parent_id,
      is_liquid: account.is_liquid,
      category: account.category,
      mnemonic_code: account.mnemonic_code,
      status: account.status,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const getLevelIndent = (level: number) => {
    return (level - 2) * 16;
  };

  const getParentOptions = () => {
    const typeAccounts = accounts.filter((acc) => {
      if (activeTab === 'income') {
        return acc.type === 'income' || acc.type === 'expense';
      }
      return acc.type === activeTab;
    });
    return typeAccounts.filter((acc) => acc.level <= 2);
  };

  let rowIndex = 0;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">会计科目体系</h1>
          <p className="text-gray-500 mt-1">管理集团统一会计科目体系及科目映射</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="flex-1"></div>
            <div className="flex items-center gap-2 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="输入编码/名称/助记码/状态等关键字搜索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInactive(!showInactive)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                showInactive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {showInactive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              <span>显示停用科目</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4" />
              <span>新增科目</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              <span>编码设置</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>导出</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              <span>导入</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" />
              <span>明细辅助</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
              <span>批量操作</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">序号</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">科目编码</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">科目名称</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">助记码</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">余额方向</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">辅助核算</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">状态</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAccounts
                .filter((acc) => acc.level === 1)
                .map((group) => (
                  <React.Fragment key={group.id}>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="flex items-center gap-1"
                        >
                          {expandedGroups.includes(group.id) ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{group.code}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{group.name}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap"></td>
                      <td className="px-4 py-3 whitespace-nowrap"></td>
                      <td className="px-4 py-3 whitespace-nowrap"></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {group.status === 'active' ? '启用' : '停用'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setFormData({
                              code: '',
                              name: '',
                              type: group.type,
                              balance_direction: group.balance_direction,
                              parent_id: group.id,
                              is_liquid: false,
                              category: '',
                              mnemonic_code: '',
                              status: 'active',
                            });
                            setIsEditing(false);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          新增
                        </button>
                      </td>
                    </tr>
                    {expandedGroups.includes(group.id) &&
                      filteredAccounts
                        .filter((acc) => acc.parent_id === group.id)
                        .map((level2) => (
                          <React.Fragment key={level2.id}>
                            <tr className="hover:bg-gray-50">
                              <td className="px-4 py-2 whitespace-nowrap">
                                {++rowIndex}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="text-gray-900">{level2.code}</span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="text-gray-900">{level2.name}</span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="text-gray-600">{level2.mnemonic_code}</span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  level2.balance_direction === 'debit'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {level2.balance_direction === 'debit' ? '借' : '贷'}
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="text-gray-600">{level2.category || '-'}</span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  level2.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {level2.status === 'active' ? '启用' : '停用'}
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => {
                                      setFormData({
                                        code: '',
                                        name: '',
                                        type: level2.type,
                                        balance_direction: level2.balance_direction,
                                        parent_id: level2.id,
                                        is_liquid: false,
                                        category: '',
                                        mnemonic_code: '',
                                        status: 'active',
                                      });
                                      setIsEditing(false);
                                      setShowModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                  >
                                    新增
                                  </button>
                                  <button
                                    onClick={() => handleEdit(level2)}
                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                  >
                                    编辑
                                  </button>
                                  <button
                                    onClick={() => {}}
                                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                  >
                                    删除
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {filteredAccounts
                              .filter((acc) => acc.parent_id === level2.id)
                              .map((level3) => (
                                <tr key={level3.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    {++rowIndex}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="text-gray-600">{level3.code}</span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="text-gray-600" style={{ paddingLeft: '20px' }}>{level3.name}</span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="text-gray-500">{level3.mnemonic_code}</span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      level3.balance_direction === 'debit'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {level3.balance_direction === 'debit' ? '借' : '贷'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className="text-gray-500">{level3.category || '-'}</span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      level3.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {level3.status === 'active' ? '启用' : '停用'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center gap-4">
                                      <button
                                        onClick={() => handleEdit(level3)}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                      >
                                        编辑
                                      </button>
                                      <button
                                        onClick={() => {}}
                                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                      >
                                        删除
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            共 <span className="font-semibold">{filteredAccounts.length}</span> 条记录
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
          <div className="bg-white rounded-xl shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? '编辑科目' : '新增科目'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">科目编码 *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入科目编码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">科目名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入科目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">助记码</label>
                <input
                  type="text"
                  value={formData.mnemonic_code}
                  onChange={(e) => setFormData({ ...formData, mnemonic_code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入助记码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">科目类型 *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Account['type'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="asset">资产</option>
                  <option value="liability">负债</option>
                  <option value="equity">权益</option>
                  <option value="cost">成本</option>
                  <option value="income">收入</option>
                  <option value="expense">费用</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">余额方向 *</label>
                <select
                  value={formData.balance_direction}
                  onChange={(e) => setFormData({ ...formData, balance_direction: e.target.value as Account['balance_direction'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="debit">借方</option>
                  <option value="credit">贷方</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">上级科目</label>
                <select
                  value={formData.parent_id || ''}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">无（一级科目）</option>
                  {getParentOptions().map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.code} - {acc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">辅助核算</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="current, non-current, operating等"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_liquid"
                  checked={formData.is_liquid}
                  onChange={(e) => setFormData({ ...formData, is_liquid: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_liquid" className="text-sm font-medium text-gray-700">
                  流动资产/负债
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">启用</option>
                  <option value="inactive">停用</option>
                </select>
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
                {isEditing ? '保存修改' : '创建科目'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

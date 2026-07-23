import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, ArrowRight, PieChart, Building2 } from 'lucide-react';
import { equities, organizations } from '../data/mockData';
import type { Equity } from '../types';

export default function EquityManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [equityList, setEquityList] = useState<Equity[]>(equities);
  const [selectedEquity, setSelectedEquity] = useState<Equity | null>(equities[0] || null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Equity>>({});

  const handleOpenModal = (item?: Equity) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({});
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingItem) {
      setEquityList(equityList.map(e => e.id === editingItem.id ? { ...formData } as Equity : e));
    } else {
      setEquityList([...equityList, { ...formData, id: Date.now() } as Equity]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setEquityList(equityList.filter(e => e.id !== id));
    if (selectedEquity?.id === id) {
      setSelectedEquity(equityList.find(e => e.id !== id) || null);
    }
  };

  const [editingItem, setEditingItem] = useState<Equity | null>(null);

  const filteredEquities = equityList.filter(e => 
    e.investor_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.investee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalInvestment = equityList.reduce((sum, e) => sum + e.investment_cost, 0);
  const totalGoodwill = equityList.reduce((sum, e) => sum + e.goodwill, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">股权结构管理</h1>
          <p className="text-gray-500 mt-1">管理集团股权投资信息和股权结构</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索投资方或被投资方..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增股权
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">投资总额</p>
              <p className="text-lg font-bold text-gray-900">{(totalInvestment / 10000).toLocaleString()} 万元</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">商誉总额</p>
              <p className="text-lg font-bold text-gray-900">{(totalGoodwill / 10000).toLocaleString()} 万元</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">投资企业数</p>
              <p className="text-lg font-bold text-gray-900">{new Set(equityList.map(e => e.investee_id)).size} 家</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">平均持股比例</p>
              <p className="text-lg font-bold text-gray-900">
                {(equityList.reduce((sum, e) => sum + e.share_ratio, 0) / equityList.length * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">股权结构列表</h2>
            </div>
            <div className="p-2">
              {filteredEquities.map((equity) => (
                <div
                  key={equity.id}
                  onClick={() => setSelectedEquity(equity)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedEquity?.id === equity.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600">{(equity.share_ratio * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900 truncate">{equity.investor_name}</span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 truncate">{equity.investee_name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        投资成本: {(equity.investment_cost / 10000).toLocaleString()} 万元
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{equity.investment_date}</span>
                    <div className="flex items-center gap-1">
                      <button className="text-gray-400 hover:text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(equity.id);
                        }}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {selectedEquity ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">股权详情</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl font-bold text-blue-600">
                          {(selectedEquity.share_ratio * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">持股比例</p>
                        <p className="text-xl font-bold text-gray-900">
                          {selectedEquity.investor_name} → {selectedEquity.investee_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">投资成本</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(selectedEquity.investment_cost / 10000).toLocaleString()} 万元
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">商誉</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(selectedEquity.goodwill / 10000).toLocaleString()} 万元
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">投资方</span>
                    <span className="text-sm font-medium text-gray-900">{selectedEquity.investor_name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">被投资方</span>
                    <span className="text-sm font-medium text-gray-900">{selectedEquity.investee_name}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">投资日期</span>
                    <span className="text-sm font-medium text-gray-900">{selectedEquity.investment_date}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">持股比例</span>
                    <span className="text-sm font-medium text-gray-900">{(selectedEquity.share_ratio * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">投资成本</span>
                    <span className="text-sm font-medium text-gray-900">
                      ¥{(selectedEquity.investment_cost / 10000).toLocaleString()} 万元
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">股权结构图</h3>
                  <div className="flex items-center justify-center gap-4 py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-xs mt-2 text-gray-600">{selectedEquity.investor_name}</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-green-600">
                          {(selectedEquity.share_ratio * 100).toFixed(0)}%
                        </span>
                      </div>
                      <span className="text-xs mt-2 text-gray-600">{selectedEquity.investee_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">请选择一条股权记录查看详情</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingItem ? '编辑股权' : '新增股权'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">投资方</label>
                  <select
                    value={(formData.investor_id || '') as number}
                    onChange={(e) => setFormData({ ...formData, investor_id: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    {organizations.flat(3).map(o => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">被投资方</label>
                  <select
                    value={(formData.investee_id || '') as number}
                    onChange={(e) => setFormData({ ...formData, investee_id: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    {organizations.flat(3).map(o => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">持股比例 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={((formData.share_ratio || 0) * 100) as number}
                  onChange={(e) => setFormData({ ...formData, share_ratio: parseFloat(e.target.value) / 100 || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">投资成本 (万元)</label>
                <input
                  type="number"
                  value={(formData.investment_cost || 0) / 10000 as number}
                  onChange={(e) => setFormData({ ...formData, investment_cost: parseFloat(e.target.value) * 10000 || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">商誉 (万元)</label>
                <input
                  type="number"
                  value={(formData.goodwill || 0) / 10000 as number}
                  onChange={(e) => setFormData({ ...formData, goodwill: parseFloat(e.target.value) * 10000 || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">投资日期</label>
                <input
                  type="date"
                  value={(formData.investment_date || '') as string}
                  onChange={(e) => setFormData({ ...formData, investment_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

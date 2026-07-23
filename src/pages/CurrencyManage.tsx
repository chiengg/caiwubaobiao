import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, RefreshCw } from 'lucide-react';
import { currencies, exchangeRates } from '../data/mockData';
import type { Currency, ExchangeRate } from '../types';

export default function CurrencyManage() {
  const [activeTab, setActiveTab] = useState<'currency' | 'exchange'>('currency');
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyList, setCurrencyList] = useState<Currency[]>(currencies);
  const [rateList, setRateList] = useState<ExchangeRate[]>(exchangeRates);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Currency | ExchangeRate | null>(null);
  const [formData, setFormData] = useState<Partial<Currency & ExchangeRate>>({});

  const handleOpenModal = (item?: Currency | ExchangeRate) => {
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
    if (activeTab === 'currency') {
      if (editingItem) {
        setCurrencyList(currencyList.map(c => c.id === editingItem.id ? { ...formData } as Currency : c));
      } else {
        setCurrencyList([...currencyList, { ...formData, id: Date.now() } as Currency]);
      }
    } else {
      if (editingItem) {
        setRateList(rateList.map(r => r.id === editingItem.id ? { ...formData } as ExchangeRate : r));
      } else {
        setRateList([...rateList, { ...formData, id: Date.now() } as ExchangeRate]);
      }
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (activeTab === 'currency') {
      setCurrencyList(currencyList.filter(c => c.id !== id));
    } else {
      setRateList(rateList.filter(r => r.id !== id));
    }
  };

  const filteredCurrencies = currencyList.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRates = rateList.filter(r => 
    r.from_currency.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.to_currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRateTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      spot: '即期汇率',
      average: '平均汇率',
      history: '历史汇率',
      period_end: '期末汇率'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">币种汇率管理</h1>
          <p className="text-gray-500 mt-1">管理系统中的币种信息和汇率配置</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
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
            {activeTab === 'currency' ? '新增币种' : '新增汇率'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'currency' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            币种管理
          </button>
          <button
            onClick={() => setActiveTab('exchange')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'exchange' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            汇率管理
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'currency' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">币种代码</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">币种名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">币种符号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">小数位数</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCurrencies.map((currency) => (
                    <tr key={currency.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{currency.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{currency.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{currency.symbol}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{currency.decimal_places}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(currency)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(currency.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">源币种</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">目标币种</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">汇率类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">汇率值</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">期间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">生效日期</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{rate.from_currency}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{rate.to_currency}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{getRateTypeLabel(rate.rate_type)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{rate.rate.toFixed(4)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{rate.period}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{rate.effective_date}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(rate)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rate.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-green-600">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingItem ? (activeTab === 'currency' ? '编辑币种' : '编辑汇率') : (activeTab === 'currency' ? '新增币种' : '新增汇率')}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {activeTab === 'currency' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">币种代码</label>
                    <input
                      type="text"
                      value={(formData.code || '') as string}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">币种名称</label>
                    <input
                      type="text"
                      value={(formData.name || '') as string}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">币种符号</label>
                    <input
                      type="text"
                      value={(formData.symbol || '') as string}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">小数位数</label>
                    <input
                      type="number"
                      value={(formData.decimal_places || '') as number}
                      onChange={(e) => setFormData({ ...formData, decimal_places: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">源币种</label>
                      <select
                        value={(formData.from_currency || '') as string}
                        onChange={(e) => setFormData({ ...formData, from_currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">请选择</option>
                        {currencies.map(c => <option key={c.id} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">目标币种</label>
                      <select
                        value={(formData.to_currency || '') as string}
                        onChange={(e) => setFormData({ ...formData, to_currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">请选择</option>
                        {currencies.map(c => <option key={c.id} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">汇率类型</label>
                    <select
                      value={(formData.rate_type || '') as string}
                      onChange={(e) => setFormData({ ...formData, rate_type: e.target.value as 'spot' | 'average' | 'history' | 'period_end' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="spot">即期汇率</option>
                      <option value="average">平均汇率</option>
                      <option value="history">历史汇率</option>
                      <option value="period_end">期末汇率</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">汇率值</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={(formData.rate || '') as number}
                      onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">期间</label>
                      <input
                        type="text"
                        value={(formData.period || '') as string}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        placeholder="如: 2026-03"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">生效日期</label>
                      <input
                        type="date"
                        value={(formData.effective_date || '') as string}
                        onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}
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

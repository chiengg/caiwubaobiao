import { useState } from 'react';
import { Plus, Edit2, Search, X, Calendar, Lock, Unlock, Play, CheckCircle } from 'lucide-react';
import { periods } from '../data/mockData';
import type { Period } from '../types';

export default function PeriodManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodList, setPeriodList] = useState<Period[]>(periods);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Period | null>(null);
  const [formData, setFormData] = useState<Partial<Period>>({});

  const handleOpenModal = (item?: Period) => {
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
      setPeriodList(periodList.map(p => p.id === editingItem.id ? { ...formData } as Period : p));
    } else {
      setPeriodList([...periodList, { ...formData, id: Date.now() } as Period]);
    }
    handleCloseModal();
  };

  const handleStatusChange = (period: Period, newStatus: Period['status']) => {
    setPeriodList(periodList.map(p => p.id === period.id ? { ...p, status: newStatus } : p));
  };

  const getStatusLabel = (status: Period['status']) => {
    const labels: Record<string, string> = {
      unopened: '未开启',
      opened: '已开启',
      closed: '已关闭',
      locked: '已锁定'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: Period['status']) => {
    const colors: Record<string, string> = {
      unopened: 'bg-gray-100 text-gray-600',
      opened: 'bg-green-100 text-green-600',
      closed: 'bg-blue-100 text-blue-600',
      locked: 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: Period['status']) => {
    switch (status) {
      case 'unopened': return Calendar;
      case 'opened': return Play;
      case 'closed': return CheckCircle;
      case 'locked': return Lock;
      default: return Calendar;
    }
  };

  const filteredPeriods = periodList.filter(p => 
    p.year.toString().includes(searchTerm) || 
    `${p.year}-${String(p.month).padStart(2, '0')}`.includes(searchTerm)
  );

  const generateYearPeriods = () => {
    const year = parseInt(prompt('请输入年份：') || '2026');
    if (isNaN(year)) return;
    
    const newPeriods: Period[] = [];
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();
      newPeriods.push({
        id: Date.now() + month,
        year,
        quarter: Math.ceil(month / 3),
        month,
        start_date: `${year}-${String(month).padStart(2, '0')}-01`,
        end_date: `${year}-${String(month).padStart(2, '0')}-${daysInMonth}`,
        status: 'unopened',
        calendar_type: 'gregorian'
      });
    }
    setPeriodList([...periodList, ...newPeriods]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">会计期间管理</h1>
          <p className="text-gray-500 mt-1">管理会计期间日历和期间状态</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索年份或期间..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={generateYearPeriods}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            生成年度期间
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增期间
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">年度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">季度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">月度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">期间范围</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">日历类型</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPeriods.map((period) => {
                  const StatusIcon = getStatusIcon(period.status);
                  return (
                    <tr key={period.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{period.year}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Q{period.quarter}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{period.month}月</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {period.start_date} ~ {period.end_date}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(period.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusLabel(period.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {period.calendar_type === 'gregorian' ? '公历' : period.calendar_type}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(period)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {period.status === 'unopened' && (
                            <button
                              onClick={() => handleStatusChange(period, 'opened')}
                              className="text-gray-400 hover:text-green-600"
                              title="开启期间"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          {period.status === 'opened' && (
                            <button
                              onClick={() => handleStatusChange(period, 'closed')}
                              className="text-gray-400 hover:text-blue-600"
                              title="关闭期间"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {period.status === 'closed' && (
                            <button
                              onClick={() => handleStatusChange(period, 'locked')}
                              className="text-gray-400 hover:text-red-600"
                              title="锁定期间"
                            >
                              <Lock className="w-4 h-4" />
                            </button>
                          )}
                          {period.status === 'locked' && (
                            <button
                              onClick={() => handleStatusChange(period, 'closed')}
                              className="text-gray-400 hover:text-green-600"
                              title="解锁期间"
                            >
                              <Unlock className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingItem ? '编辑会计期间' : '新增会计期间'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年度</label>
                  <input
                    type="number"
                    value={(formData.year || '') as number}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">季度</label>
                  <select
                    value={(formData.quarter || '') as number}
                    onChange={(e) => setFormData({ ...formData, quarter: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="1">Q1</option>
                    <option value="2">Q2</option>
                    <option value="3">Q3</option>
                    <option value="4">Q4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">月度</label>
                  <select
                    value={(formData.month || '') as number}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}月</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={(formData.start_date || '') as string}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input
                    type="date"
                    value={(formData.end_date || '') as string}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">日历类型</label>
                <select
                  value={(formData.calendar_type || '') as string}
                  onChange={(e) => setFormData({ ...formData, calendar_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gregorian">公历</option>
                  <option value="fiscal">财历</option>
                </select>
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

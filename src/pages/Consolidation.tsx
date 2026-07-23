import { useState } from 'react';
import { Play, RefreshCw, CheckCircle, AlertCircle, Clock, ArrowRight, Search, X, Plus } from 'lucide-react';
import { eliminationEntries, exchangeRates, periods, organizations } from '../data/mockData';

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  progress: number;
  assignee: string;
  due_date: string;
}

const processSteps: ProcessStep[] = [
  { id: '1', name: '数据采集', description: '收集各子公司报表数据', status: 'completed', progress: 100, assignee: '合并专员', due_date: '2026-03-20' },
  { id: '2', name: '数据审核', description: '审核子公司提交数据', status: 'completed', progress: 100, assignee: '集团财务', due_date: '2026-03-22' },
  { id: '3', name: '汇率折算', description: '非本位币报表折算', status: 'completed', progress: 100, assignee: '合并专员', due_date: '2026-03-23' },
  { id: '4', name: '权益法调整', description: '成本法转权益法调整', status: 'completed', progress: 100, assignee: '合并专员', due_date: '2026-03-24' },
  { id: '5', name: '内部对账', description: '核对内部往来余额', status: 'completed', progress: 100, assignee: '合并专员', due_date: '2026-03-25' },
  { id: '6', name: '抵销处理', description: '生成内部抵销分录', status: 'in_progress', progress: 60, assignee: '合并专员', due_date: '2026-03-28' },
  { id: '7', name: '合并计算', description: '执行合并计算', status: 'pending', progress: 0, assignee: '合并专员', due_date: '2026-03-29' },
  { id: '8', name: '报表生成', description: '生成合并报表', status: 'pending', progress: 0, assignee: '合并专员', due_date: '2026-04-01' },
];

export default function Consolidation() {
  const [activeTab, setActiveTab] = useState<'process' | 'elimination'>('process');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntryModal, setShowEntryModal] = useState(false);

  const getStatusColor = (status: ProcessStep['status']) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-600',
      in_progress: 'bg-blue-100 text-blue-600',
      completed: 'bg-green-100 text-green-600',
      error: 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: ProcessStep['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in_progress': return RefreshCw;
      case 'completed': return CheckCircle;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredEntries = eliminationEntries.filter(e => 
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEntryTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      equity: '内部股权投资抵销',
      intercompany: '内部往来抵销',
      inventory: '内部存货交易抵销',
      fixed_asset: '内部固定资产交易抵销',
      cash_flow: '内部现金流抵销'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">合并处理</h1>
          <p className="text-gray-500 mt-1">执行合并报表编制流程和抵销处理</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {periods.filter(p => p.status === 'opened').map(p => (
              <option key={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Play className="w-4 h-4" />
            执行合并计算
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">当前步骤</p>
              <p className="text-lg font-bold text-gray-900">抵销处理</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已完成步骤</p>
              <p className="text-lg font-bold text-gray-900">5 / 8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">抵销分录数</p>
              <p className="text-lg font-bold text-gray-900">{eliminationEntries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">进度</p>
              <p className="text-lg font-bold text-gray-900">62.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('process')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'process' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合并流程
          </button>
          <button
            onClick={() => setActiveTab('elimination')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'elimination' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            抵销分录
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'process' ? (
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {processSteps.map((step, index) => {
                  const StatusIcon = getStatusIcon(step.status);
                  const isLast = index === processSteps.length - 1;
                  
                  return (
                    <div key={step.id} className="relative flex items-start gap-4">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-100' :
                        step.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <StatusIcon className={`w-6 h-6 ${
                          step.status === 'completed' ? 'text-green-600' :
                          step.status === 'in_progress' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{step.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? '已完成' : 
                             step.status === 'in_progress' ? '进行中' : '待处理'}
                          </span>
                        </div>
                        {step.status !== 'pending' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>进度</span>
                              <span>{step.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  step.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                                }`}
                                style={{ width: `${step.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <span>负责人: {step.assignee}</span>
                          <span>截止: {step.due_date}</span>
                          {step.status === 'in_progress' && (
                            <button className="text-blue-600 hover:text-blue-700">查看详情</button>
                          )}
                          {step.status === 'pending' && (
                            <button className="text-green-600 hover:text-green-700">执行</button>
                          )}
                        </div>
                      </div>
                      {!isLast && step.status === 'completed' && (
                        <ArrowRight className="w-5 h-5 text-gray-400 mt-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索抵销分录..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => setShowEntryModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  新增抵销分录
                </button>
              </div>
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{entry.description}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          类型: {getEntryTypeLabel(entry.entry_type)} | 创建时间: {entry.created_at}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-blue-600">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">科目编码</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">科目名称</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">借方金额</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">贷方金额</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {entry.lines.map((line) => (
                          <tr key={line.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 text-sm text-gray-900">{line.account_code}</td>
                            <td className="px-3 py-2 text-sm text-gray-500">{line.account_name}</td>
                            <td className="px-3 py-2 text-sm text-right text-gray-500">
                              {line.debit_amount > 0 ? line.debit_amount.toLocaleString() : '-'}
                            </td>
                            <td className="px-3 py-2 text-sm text-right text-gray-500">
                              {line.credit_amount > 0 ? line.credit_amount.toLocaleString() : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">新增抵销分录</h2>
              <button onClick={() => setShowEntryModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分录类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="equity">内部股权投资抵销</option>
                  <option value="intercompany">内部往来抵销</option>
                  <option value="inventory">内部存货交易抵销</option>
                  <option value="fixed_asset">内部固定资产交易抵销</option>
                  <option value="cash_flow">内部现金流抵销</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入抵销分录描述"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">抵销分录明细</label>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>选择科目</option>
                    </select>
                    <input type="text" placeholder="借方金额" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="贷方金额" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      添加行
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowEntryModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

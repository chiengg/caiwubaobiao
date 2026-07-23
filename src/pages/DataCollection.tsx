import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download, Send, RefreshCw, Search, X } from 'lucide-react';
import { organizations, periods, accounts } from '../data/mockData';

interface CollectionTask {
  id: number;
  org_id: number;
  org_name: string;
  period_id: number;
  period_name: string;
  report_type: string;
  status: 'pending' | 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';
  submit_time?: string;
  assignee: string;
  due_date: string;
}

const collectionTasks: CollectionTask[] = [
  { id: 1, org_id: 2, org_name: '子公司A', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'approved', submit_time: '2026-03-20 14:30', assignee: '张三', due_date: '2026-03-20' },
  { id: 2, org_id: 2, org_name: '子公司A', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'approved', submit_time: '2026-03-20 14:35', assignee: '张三', due_date: '2026-03-20' },
  { id: 3, org_id: 3, org_name: '子公司B', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'reviewing', submit_time: '2026-03-21 10:15', assignee: '李四', due_date: '2026-03-21' },
  { id: 4, org_id: 3, org_name: '子公司B', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'submitted', submit_time: '2026-03-21 10:20', assignee: '李四', due_date: '2026-03-21' },
  { id: 5, org_id: 4, org_name: '子公司C', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'draft', assignee: '王五', due_date: '2026-03-22' },
  { id: 6, org_id: 4, org_name: '子公司C', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'pending', assignee: '王五', due_date: '2026-03-22' },
];

export default function DataCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'validation'>('tasks');

  const getStatusLabel = (status: CollectionTask['status']) => {
    const labels: Record<string, string> = {
      pending: '待填报',
      draft: '草稿',
      submitted: '已提交',
      reviewing: '审核中',
      approved: '已审核',
      rejected: '已退回'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: CollectionTask['status']) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-600',
      draft: 'bg-yellow-100 text-yellow-600',
      submitted: 'bg-blue-100 text-blue-600',
      reviewing: 'bg-purple-100 text-purple-600',
      approved: 'bg-green-100 text-green-600',
      rejected: 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: CollectionTask['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'draft': return FileText;
      case 'submitted': return Send;
      case 'reviewing': return RefreshCw;
      case 'approved': return CheckCircle;
      case 'rejected': return AlertCircle;
      default: return FileText;
    }
  };

  const filteredTasks = collectionTasks.filter(t => 
    t.org_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.report_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = collectionTasks.filter(t => t.status === 'pending').length;
  const submittedCount = collectionTasks.filter(t => t.status === 'submitted' || t.status === 'reviewing').length;
  const approvedCount = collectionTasks.filter(t => t.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据采集</h1>
          <p className="text-gray-500 mt-1">管理子公司报表数据采集和审核流程</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Excel导入
          </button>
          <button
            onClick={() => setShowInputModal(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FileText className="w-4 h-4" />
            手工录入
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待填报</p>
              <p className="text-lg font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">审核中</p>
              <p className="text-lg font-bold text-gray-900">{submittedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已审核</p>
              <p className="text-lg font-bold text-gray-900">{approvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">完成率</p>
              <p className="text-lg font-bold text-gray-900">
                {Math.round(approvedCount / collectionTasks.length * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <select
              value={selectedOrg || ''}
              onChange={(e) => setSelectedOrg(e.target.value ? parseInt(e.target.value) : null)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部组织</option>
              {organizations.flat(3).filter(o => !o.is_consolidation).map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(p => (
                <option key={p.id} value={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'tasks' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                采集任务
              </button>
              <button
                onClick={() => setActiveTab('validation')}
                className={`py-2 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'validation' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                数据校验
              </button>
            </div>
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
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'tasks' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">组织名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">报表类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">提交时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">填报人</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">截止日期</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map((task) => {
                    const StatusIcon = getStatusIcon(task.status);
                    return (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.org_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.report_type}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusLabel(task.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.submit_time || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.assignee}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{task.due_date}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-gray-400 hover:text-blue-600">
                              <Download className="w-4 h-4" />
                            </button>
                            {task.status === 'reviewing' && (
                              <button className="text-gray-400 hover:text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {task.status === 'reviewing' && (
                              <button className="text-gray-400 hover:text-red-600">
                                <AlertCircle className="w-4 h-4" />
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
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">子公司C - 资产负债表校验异常</h3>
                    <ul className="mt-2 space-y-1 text-xs text-red-700">
                      <li>• 资产总计与负债+权益合计不平衡，差额: 50,000.00</li>
                      <li>• 货币资金科目数据缺失</li>
                      <li>• 应收账款余额为负数，请检查</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">子公司B - 利润表校验警告</h3>
                    <ul className="mt-2 space-y-1 text-xs text-yellow-700">
                      <li>• 营业收入环比下降超过30%，请确认数据准确性</li>
                      <li>• 管理费用异常偏高，建议核实</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">子公司A - 全部报表校验通过</h3>
                    <p className="mt-2 text-xs text-green-700">数据完整性、平衡性、勾稽关系校验均通过</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Excel导入</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-900">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-500 mt-1">支持 .xlsx, .xls 格式</p>
              </div>
              <button className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <Download className="w-4 h-4 inline mr-2" />
                下载标准模板
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                开始导入
              </button>
            </div>
          </div>
        </div>
      )}

      {showInputModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">手工录入报表数据</h2>
              <button onClick={() => setShowInputModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>选择组织</option>
                  {organizations.flat(3).filter(o => !o.is_consolidation).map(o => (
                    <option key={o.id}>{o.name}</option>
                  ))}
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>选择报表类型</option>
                  <option>资产负债表</option>
                  <option>利润表</option>
                  <option>现金流量表</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>选择期间</option>
                  {periods.map(p => (
                    <option key={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">科目编码</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">科目名称</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">金额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accounts.slice(0, 10).map((account) => (
                      <tr key={account.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{account.code}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{account.name}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            className="w-full text-right px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setShowInputModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                保存草稿
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                提交审核
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

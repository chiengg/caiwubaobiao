import { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle, ArrowRight, Users, FileText, Calendar, Search } from 'lucide-react';

interface WorkflowStep {
  id: number;
  name: string;
  assignee: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dueDate: string;
  actualDate?: string;
}

interface ProcessInstance {
  id: number;
  name: string;
  type: 'consolidation' | 'collection' | 'review';
  period: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  progress: number;
  steps: WorkflowStep[];
}

const processInstances: ProcessInstance[] = [
  {
    id: 1,
    name: '2026年3月合并报表流程',
    type: 'consolidation',
    period: '2026-03',
    status: 'in_progress',
    startTime: '2026-03-25 09:00',
    progress: 65,
    steps: [
      { id: 1, name: '数据采集', assignee: '张三', status: 'completed', dueDate: '2026-03-26', actualDate: '2026-03-26' },
      { id: 2, name: '数据验证', assignee: '李四', status: 'completed', dueDate: '2026-03-27', actualDate: '2026-03-27' },
      { id: 3, name: '外币折算', assignee: '王五', status: 'in_progress', dueDate: '2026-03-28' },
      { id: 4, name: '抵销分录', assignee: '赵六', status: 'pending', dueDate: '2026-03-29' },
      { id: 5, name: '合并生成', assignee: '钱七', status: 'pending', dueDate: '2026-03-30' },
      { id: 6, name: '审核发布', assignee: '孙八', status: 'pending', dueDate: '2026-03-31' },
    ],
  },
  {
    id: 2,
    name: '2026年2月合并报表流程',
    type: 'consolidation',
    period: '2026-02',
    status: 'completed',
    startTime: '2026-02-25 09:00',
    endTime: '2026-02-28 18:30',
    progress: 100,
    steps: [
      { id: 1, name: '数据采集', assignee: '张三', status: 'completed', dueDate: '2026-02-26', actualDate: '2026-02-26' },
      { id: 2, name: '数据验证', assignee: '李四', status: 'completed', dueDate: '2026-02-27', actualDate: '2026-02-27' },
      { id: 3, name: '外币折算', assignee: '王五', status: 'completed', dueDate: '2026-02-28', actualDate: '2026-02-28' },
      { id: 4, name: '抵销分录', assignee: '赵六', status: 'completed', dueDate: '2026-02-28', actualDate: '2026-02-28' },
      { id: 5, name: '合并生成', assignee: '钱七', status: 'completed', dueDate: '2026-02-28', actualDate: '2026-02-28' },
      { id: 6, name: '审核发布', assignee: '孙八', status: 'completed', dueDate: '2026-02-28', actualDate: '2026-02-28' },
    ],
  },
  {
    id: 3,
    name: '2026年3月数据采集流程',
    type: 'collection',
    period: '2026-03',
    status: 'completed',
    startTime: '2026-03-25 09:00',
    endTime: '2026-03-26 16:00',
    progress: 100,
    steps: [
      { id: 1, name: '发送采集通知', assignee: '张三', status: 'completed', dueDate: '2026-03-25', actualDate: '2026-03-25' },
      { id: 2, name: '子公司上报', assignee: '各子公司', status: 'completed', dueDate: '2026-03-26', actualDate: '2026-03-26' },
      { id: 3, name: '数据汇总', assignee: '李四', status: 'completed', dueDate: '2026-03-26', actualDate: '2026-03-26' },
    ],
  },
];

const workflowTemplates = [
  { id: 1, name: '月度合并报表流程', type: 'consolidation', steps: 6, status: 'active' },
  { id: 2, name: '季度合并报表流程', type: 'consolidation', steps: 8, status: 'active' },
  { id: 3, name: '年度合并报表流程', type: 'consolidation', steps: 10, status: 'active' },
  { id: 4, name: '数据采集流程', type: 'collection', steps: 3, status: 'active' },
  { id: 5, name: '报表审核流程', type: 'review', steps: 4, status: 'draft' },
];

export default function WorkflowManage() {
  const [activeTab, setActiveTab] = useState<'instances' | 'templates'>('instances');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<ProcessInstance | null>(null);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: '待开始',
      in_progress: '进行中',
      completed: '已完成',
      failed: '失败',
      blocked: '已阻塞',
      active: '启用',
      draft: '草稿',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-600',
      in_progress: 'bg-blue-100 text-blue-600',
      completed: 'bg-green-100 text-green-600',
      failed: 'bg-red-100 text-red-600',
      blocked: 'bg-yellow-100 text-yellow-600',
      active: 'bg-green-100 text-green-600',
      draft: 'bg-gray-100 text-gray-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      consolidation: '合并流程',
      collection: '采集流程',
      review: '审核流程',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      consolidation: 'bg-blue-50 text-blue-700',
      collection: 'bg-green-50 text-green-700',
      review: 'bg-purple-50 text-purple-700',
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const filteredInstances = processInstances.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">流程管理</h1>
          <p className="text-gray-500 mt-1">管理合并报表相关的工作流程和审批流程</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Play className="w-4 h-4" />
            启动流程
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">进行中流程</p>
              <p className="text-lg font-bold text-gray-900">
                {processInstances.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已完成流程</p>
              <p className="text-lg font-bold text-gray-900">
                {processInstances.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">待处理任务</p>
              <p className="text-lg font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">流程模板</p>
              <p className="text-lg font-bold text-gray-900">{workflowTemplates.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('instances')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'instances' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            流程实例
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'templates' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            流程模板
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'instances' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索流程..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">全部</button>
                  <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg">进行中</button>
                  <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">已完成</button>
                </div>
              </div>
              <div className="space-y-4">
                {filteredInstances.map((process) => (
                  <div
                    key={process.id}
                    onClick={() => setSelectedProcess(process)}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-medium text-gray-900">{process.name}</h3>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(process.type)}`}>
                            {getTypeLabel(process.type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {process.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {process.startTime}
                          </span>
                          {process.endTime && (
                            <span>结束: {process.endTime}</span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(process.status)}`}>
                        {getStatusLabel(process.status)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">流程进度</span>
                        <span className="text-gray-900 font-medium">{process.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${process.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {workflowTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-medium text-gray-900">{template.name}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                          {getTypeLabel(template.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>步骤数: {template.steps}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(template.status)}`}>
                      {getStatusLabel(template.status)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      <Play className="w-3.5 h-3.5" />
                      启动
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      编辑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProcess && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedProcess.name}</h2>
              <p className="text-sm text-gray-500 mt-1">流程步骤详情</p>
            </div>
            <button onClick={() => setSelectedProcess(null)} className="text-gray-400 hover:text-gray-600">
              关闭
            </button>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {selectedProcess.steps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-4">
                  <div className="relative z-10">
                    {getStepIcon(step.status)}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{step.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">负责人: {step.assignee}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                        {getStatusLabel(step.status)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>截止日期: {step.dueDate}</span>
                      {step.actualDate && (
                        <span className="text-green-600">完成日期: {step.actualDate}</span>
                      )}
                    </div>
                  </div>
                  {index < selectedProcess.steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              <RotateCcw className="w-4 h-4" />
              重置流程
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Play className="w-4 h-4" />
              继续流程
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Download, BarChart3, Table2, FileText } from 'lucide-react';

interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date';
}

interface CustomReport {
  id: number;
  name: string;
  description: string;
  type: 'chart' | 'table';
  fields: string[];
  createdAt: string;
  updatedAt: string;
}

const customReports: CustomReport[] = [
  { id: 1, name: '应收账款分析表', description: '按客户和账龄分析应收账款', type: 'table', fields: ['customer', 'amount', 'age', 'status'], createdAt: '2026-03-20', updatedAt: '2026-03-25' },
  { id: 2, name: '存货周转分析', description: '分析存货周转情况', type: 'chart', fields: ['category', 'turnover', 'days'], createdAt: '2026-03-18', updatedAt: '2026-03-28' },
  { id: 3, name: '费用对比报表', description: '各部门费用对比分析', type: 'table', fields: ['department', 'expense', 'budget', 'variance'], createdAt: '2026-03-15', updatedAt: '2026-03-22' },
];

const availableFields: ReportField[] = [
  { id: 'customer', name: '客户名称', type: 'text' },
  { id: 'amount', name: '金额', type: 'number' },
  { id: 'age', name: '账龄', type: 'text' },
  { id: 'status', name: '状态', type: 'text' },
  { id: 'category', name: '类别', type: 'text' },
  { id: 'turnover', name: '周转率', type: 'number' },
  { id: 'days', name: '周转天数', type: 'number' },
  { id: 'department', name: '部门', type: 'text' },
  { id: 'expense', name: '费用', type: 'number' },
  { id: 'budget', name: '预算', type: 'number' },
  { id: 'variance', name: '差异', type: 'number' },
];

export default function CustomReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'chart' | 'table'>('table');

  const filteredReports = customReports.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: CustomReport['type']) => {
    return type === 'chart' ? <BarChart3 className="w-4 h-4" /> : <Table2 className="w-4 h-4" />;
  };

  const getTypeLabel = (type: CustomReport['type']) => {
    return type === 'chart' ? '图表报表' : '表格报表';
  };

  const getTypeColor = (type: CustomReport['type']) => {
    return type === 'chart' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">自定义报表</h1>
          <p className="text-gray-500 mt-1">创建和管理自定义报表</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          新建报表
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索报表..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedType('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedType === 'table' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Table2 className="w-4 h-4" />
                表格
              </button>
              <button 
                onClick={() => setSelectedType('chart')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedType === 'chart' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                图表
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {filteredReports
              .filter(r => r.type === selectedType)
              .map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(report.type)}`}>
                      {getTypeIcon(report.type)}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{report.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{report.description}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                    {getTypeLabel(report.type)}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <span>字段数: {report.fields.length}</span>
                  <span>更新: {report.updatedAt}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                    <Edit className="w-3.5 h-3.5" />
                    编辑
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Download className="w-3.5 h-3.5" />
                    生成
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">可用字段</h2>
        <div className="grid grid-cols-3 gap-3">
          {availableFields.map((field) => (
            <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{field.name}</p>
                <p className="text-xs text-gray-500">{field.id}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                field.type === 'number' ? 'bg-blue-100 text-blue-600' :
                field.type === 'date' ? 'bg-green-100 text-green-600' :
                'bg-gray-200 text-gray-600'
              }`}>
                {field.type === 'number' ? '数值' : field.type === 'date' ? '日期' : '文本'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

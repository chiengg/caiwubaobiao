import { useState } from 'react';
import { Search, Download, Filter, Clock, User, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Log {
  id: number;
  time: string;
  user: string;
  action: string;
  module: string;
  result: 'success' | 'fail' | 'warning';
  detail: string;
  ip: string;
}

const logs: Log[] = [
  { id: 1, time: '2026-03-28 14:30:25', user: 'admin', action: '登录系统', module: '系统', result: 'success', detail: '用户admin成功登录系统', ip: '192.168.1.100' },
  { id: 2, time: '2026-03-28 14:28:15', user: 'zhangsan', action: '导出报表', module: '报表', result: 'success', detail: '导出2026年3月合并资产负债表', ip: '192.168.1.101' },
  { id: 3, time: '2026-03-28 14:25:42', user: 'lisi', action: '执行合并', module: '合并处理', result: 'success', detail: '成功执行2026年3月合并流程', ip: '192.168.1.102' },
  { id: 4, time: '2026-03-28 14:20:18', user: 'wangwu', action: '审核报表', module: '报表', result: 'success', detail: '审核通过2026年3月合并利润表', ip: '192.168.1.103' },
  { id: 5, time: '2026-03-28 14:15:33', user: 'zhangsan', action: '导入数据', module: '数据采集', result: 'warning', detail: '导入数据时发现3条警告', ip: '192.168.1.101' },
  { id: 6, time: '2026-03-28 14:10:05', user: 'zhaoliu', action: '登录系统', module: '系统', result: 'fail', detail: '用户zhaoliu登录失败，密码错误', ip: '192.168.1.104' },
  { id: 7, time: '2026-03-28 14:05:22', user: 'admin', action: '修改权限', module: '系统管理', result: 'success', detail: '修改合并专员角色权限', ip: '192.168.1.100' },
  { id: 8, time: '2026-03-28 13:58:47', user: 'lisi', action: '创建抵销分录', module: '合并处理', result: 'success', detail: '创建权益抵销分录，金额5000000', ip: '192.168.1.102' },
  { id: 9, time: '2026-03-28 13:50:12', user: 'zhangsan', action: '配置合并范围', module: '合并设置', result: 'success', detail: '更新2026年Q1合并范围配置', ip: '192.168.1.101' },
  { id: 10, time: '2026-03-28 13:45:30', user: 'wangwu', action: '查看分析', module: '财务分析', result: 'success', detail: '查看2026年3月财务分析报表', ip: '192.168.1.103' },
];

export default function LogManage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResult = filterResult === 'all' || log.result === filterResult;
    return matchesSearch && matchesResult;
  });

  const getResultIcon = (result: Log['result']) => {
    switch (result) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getResultColor = (result: Log['result']) => {
    switch (result) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'fail':
        return 'bg-red-100 text-red-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getResultLabel = (result: Log['result']) => {
    switch (result) {
      case 'success':
        return '成功';
      case 'fail':
        return '失败';
      case 'warning':
        return '警告';
      default:
        return result;
    }
  };

  const getModuleColor = (module: string) => {
    const colors: Record<string, string> = {
      '系统': 'bg-blue-50 text-blue-700',
      '报表': 'bg-purple-50 text-purple-700',
      '合并处理': 'bg-green-50 text-green-700',
      '数据采集': 'bg-orange-50 text-orange-700',
      '系统管理': 'bg-gray-50 text-gray-700',
      '合并设置': 'bg-cyan-50 text-cyan-700',
      '财务分析': 'bg-pink-50 text-pink-700',
    };
    return colors[module] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统日志</h1>
          <p className="text-gray-500 mt-1">查看系统操作日志和审计记录</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          导出日志
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">今日日志</p>
              <p className="text-lg font-bold text-gray-900">10</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">成功操作</p>
              <p className="text-lg font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">警告记录</p>
              <p className="text-lg font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">失败操作</p>
              <p className="text-lg font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索日志..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部结果</option>
                <option value="success">成功</option>
                <option value="fail">失败</option>
                <option value="warning">警告</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">今日</button>
            <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">本周</button>
            <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">本月</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">模块</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">结果</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">详情</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {log.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {log.user}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getModuleColor(log.module)}`}>
                      {log.module}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{log.action}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getResultIcon(log.result)}
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getResultColor(log.result)}`}>
                        {getResultLabel(log.result)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {log.detail}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">共 {filteredLogs.length} 条记录</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">上一页</button>
            <span className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">1</span>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}

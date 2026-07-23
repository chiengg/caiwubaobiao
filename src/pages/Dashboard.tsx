import ReactECharts from 'echarts-for-react';
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { kpiData, tasks, workflowTasks, trendData } from '../data/mockData';
export default function Dashboard() {
 const revenueTrendOption = {
 tooltip: {
 trigger: 'axis',
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 borderColor: '#e5e7eb',
 borderWidth: 1,
 textStyle: { color: '#374151' },
 },
 grid: { top: 20, right: 20, bottom: 30, left: 50 },
 xAxis: {
 type: 'category',
 data: trendData.revenue.map((d) => d.period),
 axisLine: { lineStyle: { color: '#e5e7eb' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 yAxis: {
 type: 'value',
 axisLine: { show: false },
 axisTick: { show: false },
 splitLine: { lineStyle: { color: '#f3f4f6' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 series: [
 {
 name: '收入',
 type: 'line',
 data: trendData.revenue.map((d) => d.value),
 smooth: true,
 lineStyle: { color: '#1e40af', width: 3 },
 itemStyle: { color: '#1e40af' },
 areaStyle: {
 color: {
 type: 'linear',
 x: 0,
 y: 0,
 x2: 0,
 y2: 1,
 colorStops: [
 { offset: 0, color: 'rgba(30, 64, 175, 0.2)' },
 { offset: 1, color: 'rgba(30, 64, 175, 0.02)' },
 ],
 },
 },
 },
 ],
 };
 const profitTrendOption = {
 tooltip: {
 trigger: 'axis',
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 borderColor: '#e5e7eb',
 borderWidth: 1,
 textStyle: { color: '#374151' },
 },
 grid: { top: 20, right: 20, bottom: 30, left: 50 },
 xAxis: {
 type: 'category',
 data: trendData.profit.map((d) => d.period),
 axisLine: { lineStyle: { color: '#e5e7eb' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 yAxis: {
 type: 'value',
 axisLine: { show: false },
 axisTick: { show: false },
 splitLine: { lineStyle: { color: '#f3f4f6' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 series: [
 {
 name: '利润',
 type: 'line',
 data: trendData.profit.map((d) => d.value),
 smooth: true,
 lineStyle: { color: '#059669', width: 3 },
 itemStyle: { color: '#059669' },
 areaStyle: {
 color: {
 type: 'linear',
 x: 0,
 y: 0,
 x2: 0,
 y2: 1,
 colorStops: [
 { offset: 0, color: 'rgba(5, 150, 105, 0.2)' },
 { offset: 1, color: 'rgba(5, 150, 105, 0.02)' },
 ],
 },
 },
 },
 ],
 };
 const assetStructureOption = {
 tooltip: {
 trigger: 'item',
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 borderColor: '#e5e7eb',
 borderWidth: 1,
 textStyle: { color: '#374151' },
 formatter: '{b}: {c}%',
 },
 legend: {
 orient: 'vertical',
 right: 10,
 top: 'center',
 textStyle: { color: '#6b7280', fontSize: 12 },
 },
 series: [
 {
 type: 'pie',
 radius: ['45%', '70%'],
 center: ['40%', '50%'],
 avoidLabelOverlap: false,
 itemStyle: {
 borderRadius: 8,
 borderColor: '#fff',
 borderWidth: 2,
 },
 label: { show: false },
 emphasis: {
 label: { show: true, fontSize: 14, fontWeight: 'bold' },
 },
 data: trendData.assets.map((d, i) => ({
 name: d.name,
 value: d.value,
 itemStyle: {
 color: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'][i],
 },
 })),
 },
 ],
 };
 const orgComparisonOption = {
 tooltip: {
 trigger: 'axis',
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 borderColor: '#e5e7eb',
 borderWidth: 1,
 textStyle: { color: '#374151' },
 axisPointer: { type: 'shadow' },
 },
 grid: { top: 20, right: 20, bottom: 30, left: 60 },
 xAxis: {
 type: 'category',
 data: trendData.organizationComparison.map((d) => d.name),
 axisLine: { lineStyle: { color: '#e5e7eb' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 yAxis: {
 type: 'value',
 axisLine: { show: false },
 axisTick: { show: false },
 splitLine: { lineStyle: { color: '#f3f4f6' } },
 axisLabel: { color: '#6b7280', fontSize: 12 },
 },
 series: [
 {
 name: '收入',
 type: 'bar',
 data: trendData.organizationComparison.map((d) => d.revenue),
 barWidth: '35%',
 itemStyle: { color: '#1e40af', borderRadius: [4, 4, 0, 0] },
 },
 {
 name: '利润',
 type: 'bar',
 data: trendData.organizationComparison.map((d) => d.profit),
 barWidth: '35%',
 itemStyle: { color: '#059669', borderRadius: [4, 4, 0, 0] },
 },
 ],
 };
 const getStatusColor = (status: string) => {
 switch (status) {
 case 'completed':
 return 'bg-green-500';
 case 'in_progress':
 return 'bg-blue-500';
 case 'pending':
 return 'bg-gray-400';
 case 'overdue':
 return 'bg-red-500';
 default:
 return 'bg-gray-400';
 }
 };
 const getStatusTextColor = (status: string) => {
 switch (status) {
 case 'completed':
 return 'text-green-600';
 case 'in_progress':
 return 'text-blue-600';
 case 'pending':
 return 'text-gray-500';
 case 'overdue':
 return 'text-red-600';
 default:
 return 'text-gray-500';
 }
 };
 const getStatusBgColor = (status: string) => {
 switch (status) {
 case 'completed':
 return 'bg-green-100';
 case 'in_progress':
 return 'bg-blue-100';
 case 'pending':
 return 'bg-gray-100';
 case 'overdue':
 return 'bg-red-100';
 default:
 return 'bg-gray-100';
 }
 };
 const getPriorityColor = (priority: string) => {
 switch (priority) {
 case 'high':
 return 'text-red-600 bg-red-100';
 case 'medium':
 return 'text-yellow-600 bg-yellow-100';
 case 'low':
 return 'text-green-600 bg-green-100';
 default:
 return 'text-gray-600 bg-gray-100';
 }
 };
 return (<div className="p-6">
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-gray-900">首页仪表盘</h1>
 <p className="text-gray-500 mt-1">实时监控集团财务状况与合并进度</p>
 </div>
 <div className="grid grid-cols-4 gap-6 mb-6">
 {kpiData.map((kpi, index) => (<div key={index} className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
 <div className="flex items-center justify-between mb-4">
 <span className="text-blue-100 text-sm">{kpi.title}</span>
 {kpi.trend === 'up' ? (<TrendingUp className="w-5 h-5 text-green-400"/>) : (<TrendingDown className="w-5 h-5 text-red-400"/>)}
 </div>
 <div className="flex items-baseline gap-1">
 <span className="text-3xl font-bold">{kpi.value}</span>
 <span className="text-blue-100">{kpi.unit}</span>
 </div>
 <div className={`flex items-center gap-1 mt-3 text-sm ${kpi.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
 {kpi.change >= 0 ? '+' : ''}
 {kpi.change}%
 <span className="text-blue-100">较上期</span>
 </div>
 </div>))}
 </div>
 <div className="grid grid-cols-3 gap-6 mb-6">
 <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">收入利润趋势</h3>
 <div className="grid grid-cols-2 gap-6">
 <ReactECharts option={revenueTrendOption} style={{ height: '250px' }}/>
 <ReactECharts option={profitTrendOption} style={{ height: '250px' }}/>
 </div>
 </div>
 <div className="bg-white rounded-xl border border-gray-200 p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">资产结构</h3>
 <ReactECharts option={assetStructureOption} style={{ height: '280px' }}/>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-6">
 <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">合并流程进度</h3>
 <div className="space-y-4">
 {workflowTasks.map((task) => (<div key={task.id}>
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-3">
 <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}/>
 <span className="text-sm font-medium text-gray-700">{task.name}</span>
 <span className="text-xs text-gray-500">{task.assignee}</span>
 </div>
 <span className="text-sm font-medium text-gray-700">{task.progress}%</span>
 </div>
 <div className="w-full bg-gray-200 rounded-full h-2">
 <div className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(task.status)}`} style={{ width: `${task.progress}%` }}/>
 </div>
 </div>))}
 </div>
 </div>
 <div className="bg-white rounded-xl border border-gray-200 p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">待办任务</h3>
 <div className="space-y-3">
 {tasks.map((task) => (<div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm font-medium text-gray-900">{task.title}</p>
 <p className="text-xs text-gray-500 mt-1">{task.description}</p>
 <div className="flex items-center gap-2 mt-2">
 <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
 {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
 </span>
 <span className="text-xs text-gray-500">{task.assignee}</span>
 </div>
 </div>
 <div className="flex flex-col items-end gap-1">
 {task.status === 'completed' ? (<CheckCircle2 className="w-5 h-5 text-green-500"/>) : task.status === 'overdue' ? (<AlertCircle className="w-5 h-5 text-red-500"/>) : (<Clock className="w-5 h-5 text-gray-400"/>)}
 <span className={`text-xs ${getStatusTextColor(task.status)}`}>
 {task.status === 'completed' ? '已完成' : task.status === 'in_progress' ? '进行中' : task.status === 'overdue' ? '已逾期' : '待处理'}
 </span>
 </div>
 </div>
 </div>))}
 </div>
 </div>
 </div>
 <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">组织业绩对比</h3>
 <ReactECharts option={orgComparisonOption} style={{ height: '300px' }}/>
 </div>
 </div>);
}


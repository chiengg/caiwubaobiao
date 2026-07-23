import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, PieChart, BarChart3, LineChart, Activity, Calendar, RefreshCw } from 'lucide-react';
import * as echarts from 'echarts';
import { periods } from '../data/mockData';

const kpiData = [
  { label: '营业收入', value: 328500000, lastPeriod: 300000000, unit: '元' },
  { label: '净利润', value: 15600000, lastPeriod: 13200000, unit: '元' },
  { label: '总资产', value: 1131490000, lastPeriod: 1074000000, unit: '元' },
  { label: '净资产', value: 231627000, lastPeriod: 214500000, unit: '元' },
];

const trendData = {
  months: ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'],
  revenue: [25000, 27500, 32000, 28000, 31000, 32850],
  profit: [1050, 1180, 1420, 1200, 1350, 1560],
  cost: [18000, 19800, 23200, 20300, 22400, 23890],
};

const ratioData = [
  { label: '资产负债率', value: 62.64, benchmark: 60, unit: '%' },
  { label: '毛利率', value: 27.28, benchmark: 25, unit: '%' },
  { label: '净利率', value: 4.75, benchmark: 4, unit: '%' },
  { label: '流动比率', value: 3.30, benchmark: 2, unit: '' },
  { label: '速动比率', value: 2.70, benchmark: 1, unit: '' },
  { label: '应收账款周转天数', value: 68, benchmark: 60, unit: '天' },
];

const assetStructure = [
  { name: '货币资金', value: 357900000, color: '#3B82F6' },
  { name: '应收账款', value: 157337500, color: '#10B981' },
  { name: '存货', value: 126225000, color: '#F59E0B' },
  { name: '固定资产', value: 267450000, color: '#EF4444' },
  { name: '无形资产', value: 62490000, color: '#8B5CF6' },
  { name: '其他', value: 150080000, color: '#6B7280' },
];

const cashFlowData = [
  { name: '经营活动现金流', value: 45000000, type: 'positive' },
  { name: '投资活动现金流', value: -28000000, type: 'negative' },
  { name: '筹资活动现金流', value: 15000000, type: 'positive' },
];

const organizationComparison = [
  { name: '母公司', revenue: 180000000, profit: 8500000, assets: 520000000 },
  { name: '子公司A', revenue: 85000000, profit: 4200000, assets: 320000000 },
  { name: '子公司B', revenue: 42000000, profit: 2100000, assets: 180000000 },
  { name: '子公司C', revenue: 21500000, profit: 800000, assets: 111490000 },
];

export default function FinancialAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const revenueChartRef = useRef<HTMLDivElement>(null);
  const assetChartRef = useRef<HTMLDivElement>(null);
  const ratioChartRef = useRef<HTMLDivElement>(null);
  const comparisonChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (revenueChartRef.current) {
      const chart = echarts.init(revenueChartRef.current);
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: { data: ['营业收入', '净利润', '成本'], top: 0 },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: trendData.months },
        yAxis: [{ type: 'value', name: '万元' }],
        series: [
          { name: '营业收入', type: 'line', data: trendData.revenue, smooth: true, lineStyle: { width: 3 }, itemStyle: { color: '#3B82F6' } },
          { name: '净利润', type: 'line', data: trendData.profit, smooth: true, lineStyle: { width: 3 }, itemStyle: { color: '#10B981' } },
          { name: '成本', type: 'bar', data: trendData.cost, itemStyle: { color: '#F3F4F6' } },
        ],
      });
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    if (assetChartRef.current) {
      const chart = echarts.init(assetChartRef.current);
      chart.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', right: 10, top: 'center' },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
          data: assetStructure.map(item => ({ name: item.name, value: item.value, itemStyle: { color: item.color } })),
        }],
      });
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    if (ratioChartRef.current) {
      const chart = echarts.init(ratioChartRef.current);
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['实际值', '基准值'], top: 0 },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ratioData.map(r => r.label) },
        yAxis: { type: 'value' },
        series: [
          { name: '实际值', type: 'bar', data: ratioData.map(r => r.value), itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] } },
          { name: '基准值', type: 'line', data: ratioData.map(r => r.benchmark), lineStyle: { width: 2, type: 'dashed', color: '#9CA3AF' } },
        ],
      });
      return () => chart.dispose();
    }
  }, []);

  useEffect(() => {
    if (comparisonChartRef.current) {
      const chart = echarts.init(comparisonChartRef.current);
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['营业收入', '净利润', '资产规模'], top: 0 },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: organizationComparison.map(o => o.name) },
        yAxis: [{ type: 'value', name: '万元' }],
        series: [
          { name: '营业收入', type: 'bar', data: organizationComparison.map(o => o.revenue / 10000), itemStyle: { color: '#3B82F6' } },
          { name: '净利润', type: 'bar', data: organizationComparison.map(o => o.profit / 10000), itemStyle: { color: '#10B981' } },
          { name: '资产规模', type: 'line', data: organizationComparison.map(o => o.assets / 10000), lineStyle: { width: 3 }, itemStyle: { color: '#F59E0B' } },
        ],
      });
      return () => chart.dispose();
    }
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toLocaleString();
  };

  const getChangePercent = (current: number, last: number) => {
    if (last === 0) return '0.00';
    return (((current - last) / last) * 100).toFixed(2);
  };

  const getChangeIcon = (current: number, last: number) => {
    const change = ((current - last) / last) * 100;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getChangeColor = (current: number, last: number) => {
    const change = ((current - last) / last) * 100;
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">财务分析</h1>
          <p className="text-gray-500 mt-1">分析合并财务数据，识别业务趋势和风险</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periods.filter(p => p.status === 'opened' || p.status === 'closed').map(p => (
              <option key={p.id} value={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            刷新数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{formatNumber(kpi.value)}</p>
              <div className="flex items-center gap-1 text-sm">
                {getChangeIcon(kpi.value, kpi.lastPeriod)}
                <span className={getChangeColor(kpi.value, kpi.lastPeriod)}>
                  {getChangePercent(kpi.value, kpi.lastPeriod)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">较上期变动</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              收入利润趋势
            </h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">近6期</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">近12期</button>
            </div>
          </div>
          <div ref={revenueChartRef} className="h-80" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              资产结构分析
            </h2>
            <span className="text-xs text-gray-500">单位: 元</span>
          </div>
          <div ref={assetChartRef} className="h-80" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              财务比率分析
            </h2>
            <span className="text-xs text-gray-500">虚线为基准值</span>
          </div>
          <div ref={ratioChartRef} className="h-80" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              现金流分析
            </h2>
            <span className="text-xs text-gray-500">2026年3月</span>
          </div>
          <div className="space-y-4">
            {cashFlowData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  item.type === 'positive' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {item.type === 'positive' 
                    ? <TrendingUp className="w-6 h-6 text-green-600" />
                    : <TrendingDown className="w-6 h-6 text-red-600" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className={`text-sm font-semibold ${item.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {formatNumber(item.value)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${item.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.abs(item.value) / 50000000 * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            子公司对比分析
          </h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">收入</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">利润</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">资产</button>
          </div>
        </div>
        <div ref={comparisonChartRef} className="h-80" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">关键指标预警</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">应收账款周转天数</p>
                <p className="text-xs text-gray-500">超过基准值13%</p>
              </div>
              <span className="text-red-600 font-bold">68天</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">资产负债率</p>
                <p className="text-xs text-gray-500">接近预警阈值</p>
              </div>
              <span className="text-yellow-600 font-bold">62.6%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">毛利率</p>
                <p className="text-xs text-gray-500">优于基准值</p>
              </div>
              <span className="text-green-600 font-bold">27.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">同比分析</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">营业收入</span>
              <span className="text-sm font-medium text-green-600">+9.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">净利润</span>
              <span className="text-sm font-medium text-green-600">+18.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">总资产</span>
              <span className="text-sm font-medium text-green-600">+5.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">净资产</span>
              <span className="text-sm font-medium text-green-600">+8.0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">经营现金流</span>
              <span className="text-sm font-medium text-green-600">+15.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">环比分析</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">营业收入</span>
              <span className="text-sm font-medium text-green-600">+6.0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">净利润</span>
              <span className="text-sm font-medium text-green-600">+15.6%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">总资产</span>
              <span className="text-sm font-medium text-green-600">+2.4%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">净资产</span>
              <span className="text-sm font-medium text-green-600">+3.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">经营现金流</span>
              <span className="text-sm font-medium text-red-600">-8.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

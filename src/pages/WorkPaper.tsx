import { useState } from 'react';
import { Download, Search, ChevronRight, FileSpreadsheet, X, Calculator, FileText, Info } from 'lucide-react';
import { workPaperData, periods, calculationDetails } from '../data/mockData';
import { CalculationDetail } from '../types';

export default function WorkPaper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const [showModal, setShowModal] = useState(false);
  const [detailData, setDetailData] = useState<CalculationDetail | null>(null);

  const filteredData = workPaperData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num === 0) return '-';
    return num.toLocaleString();
  };

  const isTotalRow = (item: string) => item.includes('合计') || item.includes('总计');

  const getDetail = (itemName: string, fieldType: 'debit' | 'credit' | 'minorityInterest') => {
    const detail = calculationDetails.find(
      d => d.itemName === itemName && d.fieldType === fieldType
    );
    if (detail) {
      setDetailData(detail);
      setShowModal(true);
    }
  };

  const getFieldLabel = (fieldType: 'debit' | 'credit' | 'minorityInterest') => {
    const labels: Record<string, string> = {
      debit: '抵销借方',
      credit: '抵销贷方',
      minorityInterest: '少数股东权益'
    };
    return labels[fieldType];
  };

  const getFieldColor = (fieldType: 'debit' | 'credit' | 'minorityInterest') => {
    const colors: Record<string, string> = {
      debit: 'text-red-600 hover:text-red-800',
      credit: 'text-green-600 hover:text-green-800',
      minorityInterest: 'text-orange-600 hover:text-orange-800'
    };
    return colors[fieldType];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">合并工作底稿</h1>
          <p className="text-gray-500 mt-1">查看合并报表编制过程中的明细数据和抵销分录</p>
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
            <Download className="w-4 h-4" />
            导出Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-sm text-blue-700">母公司</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm text-green-700">子公司A</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-purple-600 rounded-full" />
                <span className="text-sm text-purple-700">子公司B</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-orange-600 rounded-full" />
                <span className="text-sm text-orange-700">子公司C(USD)</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索科目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10">报表项目</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">母公司</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">子公司A</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">子公司B</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">子公司C</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">汇总数</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">抵销借方</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">抵销贷方</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">少数股东权益</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">合并数</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${isTotalRow(item.item) ? 'bg-gray-50 font-medium' : ''}`}>
                  <td className="px-4 py-3 text-sm text-gray-900 sticky left-0 bg-white z-10 flex items-center gap-2">
                    {item.item}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">{formatNumber(item.parent)}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">{formatNumber(item.subsidiaryA)}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">{formatNumber(item.subsidiaryB)}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">{formatNumber(item.subsidiaryC)}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900 font-medium">{formatNumber(item.total)}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    {item.debit !== 0 ? (
                      <button 
                        onClick={() => getDetail(item.item, 'debit')}
                        className={`${getFieldColor('debit')} font-medium cursor-pointer underline underline-offset-2`}
                        title="点击查看计算详情"
                      >
                        {formatNumber(item.debit)}
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {item.credit !== 0 ? (
                      <button 
                        onClick={() => getDetail(item.item, 'credit')}
                        className={`${getFieldColor('credit')} font-medium cursor-pointer underline underline-offset-2`}
                        title="点击查看计算详情"
                      >
                        {formatNumber(item.credit)}
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {item.minorityInterest !== 0 ? (
                      <button 
                        onClick={() => getDetail(item.item, 'minorityInterest')}
                        className={`${getFieldColor('minorityInterest')} font-medium cursor-pointer underline underline-offset-2`}
                        title="点击查看计算详情"
                      >
                        {formatNumber(item.minorityInterest)}
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900 font-bold">{formatNumber(item.consolidated)}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-gray-400 hover:text-blue-600">
                      <FileSpreadsheet className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="text-gray-500">数据来源: 各子公司2026年3月单体报表</span>
              <span className="text-gray-500">折算汇率: USD/CNY = 7.2450</span>
              <span className="text-gray-500">编制日期: 2026-03-28</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">编制人: 合并专员</span>
              <span className="text-gray-500">审核人: 财务总监</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && detailData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {detailData.itemName} - {getFieldLabel(detailData.fieldType)}计算详情
                </h2>
                <p className="text-blue-100 text-sm mt-0.5">总金额: {detailData.totalAmount.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[70vh] p-6 space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800">抵销说明</h3>
                    <p className="text-sm text-blue-700 mt-1">{detailData.explanation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-gray-500" />
                  计算步骤
                </h3>
                <div className="space-y-3">
                  {detailData.calculationSteps.map((step, index) => (
                    <div key={step.step} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{step.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">金额: <span className={`font-semibold ${step.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{step.amount.toLocaleString()}</span></p>
                          {step.formula && (
                            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">{step.formula}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  相关凭证
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">凭证编号</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">凭证类型</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">日期</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">对方单位</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">金额</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">摘要</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {detailData.vouchers.map((voucher, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900 font-mono">{voucher.id}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{voucher.type}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{voucher.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{voucher.counterparty || '-'}</td>
                          <td className="px-4 py-2 text-sm text-right font-medium text-gray-900">{voucher.amount.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{voucher.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                关闭
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                查看完整凭证
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

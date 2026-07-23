import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Download, Send, RefreshCw, Search, X, Eye } from 'lucide-react';
import { organizations, periods, accounts } from '../data/mockData';

interface CollectionTask {
  id: number;
  org_id: number;
  org_name: string;
  accounting_standard: string;
  period_id: number;
  period_name: string;
  report_type: string;
  status: 'pending' | 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';
  submit_time?: string;
  assignee: string;
  due_date: string;
}

interface ReportItem {
  rowNo: number;
  name: string;
  current: number;
  previous: number;
}

interface ReportSection {
  title: string;
  items: ReportItem[];
  totalRowNo?: number;
  totalName?: string;
}

interface BalanceSheetReportData {
  title: string;
  reportNo: string;
  leftSections: ReportSection[];
  rightSections: ReportSection[];
}

interface SimpleReportData {
  title: string;
  reportNo: string;
  columns: string[];
  rows: { rowNo?: number; name: string; values: (number | string)[] }[];
}

type ReportData = BalanceSheetReportData | SimpleReportData;

const isBalanceSheet = (data: ReportData): data is BalanceSheetReportData => {
  return 'leftSections' in data;
};

const balanceSheetData: BalanceSheetReportData = {
  title: '资产负债表',
  reportNo: '会企01表',
  leftSections: [
    {
      title: '流动资产:',
      items: [
        { rowNo: 1, name: '货币资金', current: 915380530, previous: 842150000 },
        { rowNo: 2, name: '应收账款', current: 522500000, previous: 498000000 },
        { rowNo: 3, name: '预付账款', current: 103900000, previous: 95200000 },
        { rowNo: 4, name: '其他应收款', current: 56800000, previous: 52400000 },
        { rowNo: 5, name: '存货', current: 881500000, previous: 852300000 },
        { rowNo: 6, name: '其他流动资产', current: 42500000, previous: 38800000 },
      ],
      totalRowNo: 10,
      totalName: '流动资产合计'
    },
    {
      title: '非流动资产:',
      items: [
        { rowNo: 15, name: '长期股权投资', current: 0, previous: 0 },
        { rowNo: 16, name: '固定资产', current: 2447500000, previous: 2310000000 },
        { rowNo: 17, name: '在建工程', current: 380000000, previous: 245000000 },
        { rowNo: 18, name: '无形资产', current: 128500000, previous: 132000000 },
        { rowNo: 19, name: '商誉', current: 65000000, previous: 65000000 },
        { rowNo: 20, name: '递延所得税资产', current: 52380530, previous: 48200000 },
      ],
      totalRowNo: 25,
      totalName: '非流动资产合计'
    },
  ],
  rightSections: [
    {
      title: '流动负债:',
      items: [
        { rowNo: 36, name: '短期借款', current: 450000000, previous: 520000000 },
        { rowNo: 37, name: '应付账款', current: 385000000, previous: 360000000 },
        { rowNo: 38, name: '预收账款', current: 88500000, previous: 82000000 },
        { rowNo: 39, name: '应付职工薪酬', current: 95200000, previous: 88000000 },
        { rowNo: 40, name: '应交税费', current: 62300000, previous: 58500000 },
        { rowNo: 41, name: '其他应付款', current: 38000000, previous: 35000000 },
      ],
      totalRowNo: 45,
      totalName: '流动负债合计'
    },
    {
      title: '非流动负债:',
      items: [
        { rowNo: 50, name: '长期借款', current: 820000000, previous: 750000000 },
        { rowNo: 51, name: '应付债券', current: 200000000, previous: 200000000 },
        { rowNo: 52, name: '长期应付款', current: 35000000, previous: 42000000 },
        { rowNo: 53, name: '递延所得税负债', current: 48500000, previous: 45200000 },
      ],
      totalRowNo: 60,
      totalName: '非流动负债合计'
    },
    {
      title: '负债合计',
      items: [],
      totalRowNo: 65,
      totalName: '负债合计'
    },
    {
      title: '所有者权益:',
      items: [
        { rowNo: 70, name: '实收资本', current: 1200000000, previous: 1200000000 },
        { rowNo: 71, name: '资本公积', current: 680000000, previous: 680000000 },
        { rowNo: 72, name: '盈余公积', current: 420000000, previous: 395000000 },
        { rowNo: 73, name: '未分配利润', current: 673461060, previous: 568850000 },
        { rowNo: 74, name: '归属于母公司权益合计', current: 2973461060, previous: 2843850000 },
        { rowNo: 75, name: '少数股东权益', current: 400000000, previous: 154000000 },
      ],
      totalRowNo: 80,
      totalName: '所有者权益合计'
    },
  ],
};

const profitStatementData: SimpleReportData = {
  title: '利润表',
  reportNo: '会企02表',
  columns: ['项目', '本期金额', '上期金额'],
  rows: [
    { name: '一、营业收入', values: [520000000, 480000000] },
    { name: '减：营业成本', values: [385000000, 360000000] },
    { name: '税金及附加', values: [5200000, 4800000] },
    { name: '销售费用', values: [28000000, 25000000] },
    { name: '管理费用', values: [45000000, 42000000] },
    { name: '财务费用', values: [12000000, 11000000] },
    { name: '资产减值损失', values: [3000000, 2500000] },
    { name: '加：公允价值变动收益（损失以“-”号填列）', values: [0, 0] },
    { name: '投资收益（损失以“-”号填列）', values: [8500000, 7000000] },
    { name: '二、营业利润（亏损以“-”号填列）', values: [58300000, 41700000] },
    { name: '加：营业外收入', values: [5000000, 4500000] },
    { name: '减：营业外支出', values: [3400000, 3200000] },
    { name: '三、利润总额（亏损总额以“-”号填列）', values: [59900000, 43000000] },
    { name: '减：所得税费用', values: [15000000, 10750000] },
    { name: '四、净利润（净亏损以“-”号填列）', values: [44900000, 32250000] },
    { name: '归属于母公司所有者的净利润', values: [35000000, 29500000] },
    { name: '少数股东损益', values: [9900000, 2750000] },
    { name: '五、其他综合收益的税后净额', values: [0, 0] },
    { name: '六、综合收益总额', values: [44900000, 32250000] },
    { name: '归属于母公司所有者的综合收益总额', values: [35000000, 29500000] },
    { name: '归属于少数股东的综合收益总额', values: [9900000, 2750000] },
  ],
};

const reportDataMap: Record<string, ReportData> = {
  '资产负债表': balanceSheetData,
  '利润表': profitStatementData,
};

const collectionTasks: CollectionTask[] = [
  { id: 1, org_id: 2, org_name: '子公司A', accounting_standard: '企业会计准则', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'approved', submit_time: '2026-03-20 14:30', assignee: '张三', due_date: '2026-03-20' },
  { id: 2, org_id: 2, org_name: '子公司A', accounting_standard: '企业会计准则', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'approved', submit_time: '2026-03-20 14:35', assignee: '张三', due_date: '2026-03-20' },
  { id: 3, org_id: 3, org_name: '子公司B', accounting_standard: '小企业会计准则', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'reviewing', submit_time: '2026-03-21 10:15', assignee: '李四', due_date: '2026-03-21' },
  { id: 4, org_id: 3, org_name: '子公司B', accounting_standard: '小企业会计准则', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'submitted', submit_time: '2026-03-21 10:20', assignee: '李四', due_date: '2026-03-21' },
  { id: 5, org_id: 4, org_name: '子公司C', accounting_standard: '企业会计准则', period_id: 3, period_name: '2026-03', report_type: '资产负债表', status: 'draft', assignee: '王五', due_date: '2026-03-22' },
  { id: 6, org_id: 4, org_name: '子公司C', accounting_standard: '企业会计准则', period_id: 3, period_name: '2026-03', report_type: '利润表', status: 'pending', assignee: '王五', due_date: '2026-03-22' },
];

export default function DataCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'validation'>('tasks');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewReportData, setPreviewReportData] = useState<ReportData | null>(null);
  const [previewOrgName, setPreviewOrgName] = useState('');

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

  const formatNumber = (num: number | string) => {
    if (typeof num === 'string') return num;
    if (typeof num !== 'number' || isNaN(num)) return '';
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handlePreview = (task: CollectionTask) => {
    const data = reportDataMap[task.report_type];
    if (data) {
      setPreviewReportData(data);
      setPreviewOrgName(task.org_name);
      setShowPreviewModal(true);
    }
  };

  const renderBalanceSheet = (data: BalanceSheetReportData) => {
    interface RowData {
      rowNo: number | string;
      name: string;
      current: number;
      previous: number;
      isTitle: boolean;
      isTotal: boolean;
      isGrandTotal: boolean;
    }

    const buildRowData = (sections: ReportSection[]): RowData[] => {
      const rows: RowData[] = [];
      sections.forEach((section) => {
        rows.push({
          rowNo: '',
          name: section.title,
          current: 0,
          previous: 0,
          isTitle: true,
          isTotal: false,
          isGrandTotal: false,
        });
        section.items.forEach((item) => {
          rows.push({
            rowNo: item.rowNo,
            name: item.name,
            current: item.current,
            previous: item.previous,
            isTitle: false,
            isTotal: false,
            isGrandTotal: false,
          });
        });
        rows.push({
          rowNo: section.totalRowNo || '',
          name: section.totalName || '',
          current: section.items.reduce((sum, item) => sum + item.current, 0),
          previous: section.items.reduce((sum, item) => sum + item.previous, 0),
          isTitle: false,
          isTotal: true,
          isGrandTotal: false,
        });
      });
      return rows;
    };

    const leftRowData = buildRowData(data.leftSections);
    const leftTotal = leftRowData.reduce((sum, row) => {
      if (row.isTotal && !row.isTitle) return sum + row.current;
      return sum;
    }, 0);
    const leftPreviousTotal = leftRowData.reduce((sum, row) => {
      if (row.isTotal && !row.isTitle) return sum + row.previous;
      return sum;
    }, 0);

    let cumulativeCurrent = 0;
    let cumulativePrevious = 0;
    const rightRowData: RowData[] = [];

    data.rightSections.forEach((section) => {
      if (section.title !== '负债合计') {
        rightRowData.push({
          rowNo: '',
          name: section.title,
          current: 0,
          previous: 0,
          isTitle: true,
          isTotal: false,
          isGrandTotal: false,
        });
      }
      section.items.forEach((item) => {
        rightRowData.push({
          rowNo: item.rowNo,
          name: item.name,
          current: item.current,
          previous: item.previous,
          isTitle: false,
          isTotal: false,
          isGrandTotal: false,
        });
      });

      if (section.title === '负债合计') {
        rightRowData.push({
          rowNo: section.totalRowNo || '',
          name: section.totalName || '',
          current: cumulativeCurrent,
          previous: cumulativePrevious,
          isTitle: false,
          isTotal: true,
          isGrandTotal: false,
        });
      } else {
        const sectionCurrent = section.items.reduce((sum, item) => sum + item.current, 0);
        const sectionPrevious = section.items.reduce((sum, item) => sum + item.previous, 0);
        cumulativeCurrent += sectionCurrent;
        cumulativePrevious += sectionPrevious;

        rightRowData.push({
          rowNo: section.totalRowNo || '',
          name: section.totalName || '',
          current: sectionCurrent,
          previous: sectionPrevious,
          isTitle: false,
          isTotal: true,
          isGrandTotal: false,
        });
      }
    });

    const rightTotal = rightRowData.reduce((sum, row) => {
      if (row.isTotal && !row.isTitle) return sum + row.current;
      return sum;
    }, 0);
    const rightPreviousTotal = rightRowData.reduce((sum, row) => {
      if (row.isTotal && !row.isTitle) return sum + row.previous;
      return sum;
    }, 0);

    const maxRows = Math.max(leftRowData.length, rightRowData.length);

    const renderCell = (row: RowData | null, side: 'left' | 'right') => {
      if (!row) {
        return (
          <>
            <td className="border border-gray-400 px-3 py-2" style={{ borderLeft: side === 'left' ? '1px solid #000' : '2px solid #000' }}></td>
            <td className="border border-gray-400 px-3 py-2"></td>
            <td className="border border-gray-400 px-3 py-2"></td>
            <td className="border border-gray-400 px-3 py-2" style={{ borderRight: side === 'left' ? '2px solid #000' : '1px solid #000' }}></td>
          </>
        );
      }

      const bgClass = row.isTotal || row.isGrandTotal ? 'bg-gray-100' : '';
      const fontClass = row.isTitle || row.isTotal || row.isGrandTotal ? 'font-bold text-gray-900' : 'text-gray-900';

      return (
        <>
          <td className={`border border-gray-400 px-3 py-2 text-sm text-center ${bgClass}`} style={{ borderLeft: side === 'left' ? '1px solid #000' : '2px solid #000' }}>
            {row.isTitle ? '' : row.rowNo}
          </td>
          <td className={`border border-gray-400 px-3 py-2 text-sm ${fontClass}`}>
            {row.name}
          </td>
          <td className={`border border-gray-400 px-3 py-2 text-sm text-right font-mono ${fontClass} ${bgClass}`}>
            {row.isTitle ? '' : formatNumber(row.current)}
          </td>
          <td className={`border border-gray-400 px-3 py-2 text-sm text-right font-mono ${bgClass}`} style={{ borderRight: side === 'left' ? '2px solid #000' : '1px solid #000' }}>
            {row.isTitle ? '' : formatNumber(row.previous)}
          </td>
        </>
      );
    };

    return (
      <table className="min-w-full border-collapse" style={{ tableLayout: 'fixed', border: '2px solid #000' }}>
        <thead>
          <tr>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '45px', borderTop: '1px solid #000', borderLeft: '1px solid #000' }}>行次</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '280px', borderTop: '1px solid #000' }}>资 产</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '160px', borderTop: '1px solid #000' }}>期末余额</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '160px', borderTop: '1px solid #000', borderRight: '2px solid #000' }}>年初余额</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '45px', borderTop: '1px solid #000', borderLeft: '2px solid #000' }}>行次</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '280px', borderTop: '1px solid #000' }}>负债和所有者权益(或股东权益)</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '160px', borderTop: '1px solid #000' }}>期末余额</th>
            <th className="border border-gray-400 px-3 py-2 text-center text-sm font-bold text-gray-900 bg-gray-50" style={{ width: '160px', borderTop: '1px solid #000', borderRight: '1px solid #000' }}>年初余额</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxRows }).map((_, idx) => {
            const leftRow = leftRowData[idx];
            const rightRow = rightRowData[idx];
            return (
              <tr key={idx}>
                {renderCell(leftRow, 'left')}
                {renderCell(rightRow, 'right')}
              </tr>
            );
          })}
          <tr className="bg-gray-100" style={{ borderTop: '2px solid #000' }}>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-center" style={{ borderLeft: '1px solid #000', borderTop: '2px solid #000' }}>30</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900" style={{ borderTop: '2px solid #000' }}>资产总计</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-right font-mono" style={{ borderTop: '2px solid #000' }}>{formatNumber(leftTotal)}</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-right font-mono" style={{ borderTop: '2px solid #000', borderRight: '2px solid #000' }}>{formatNumber(leftPreviousTotal)}</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-center" style={{ borderLeft: '2px solid #000', borderTop: '2px solid #000' }}>90</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900" style={{ borderTop: '2px solid #000' }}>负债和所有者权益(或股东权益)总计</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-right font-mono" style={{ borderTop: '2px solid #000' }}>{formatNumber(rightTotal)}</td>
            <td className="border border-gray-400 px-3 py-3 text-sm font-bold text-gray-900 text-right font-mono" style={{ borderTop: '2px solid #000', borderRight: '1px solid #000' }}>{formatNumber(rightPreviousTotal)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderSimpleReport = (data: SimpleReportData) => {
    const hasNotes = data.columns.includes('备注说明');
    const isEquityReport = data.title.includes('所有者权益变动');
    
    return (
      <table className="min-w-full border-collapse" style={{ tableLayout: 'auto', border: '2px solid #000' }}>
        <thead>
          <tr>
            {data.columns.map((col, idx) => (
              <th 
                key={idx} 
                className="border border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-gray-50"
                style={{ 
                  width: idx === 0 ? (isEquityReport ? '220px' : '400px') : hasNotes && idx === 1 ? '60%' : '140px',
                  borderTop: '1px solid #000',
                  borderLeft: idx === 0 ? '1px solid #000' : '1px solid #ccc',
                  borderRight: idx === data.columns.length - 1 ? '1px solid #000' : '1px solid #ccc'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx) => {
            const isTotalRow = row.name.includes('合计') || row.name.includes('总计') || row.name.includes('净额') || 
                              row.name.includes('净利润') || row.name.includes('综合收益总额');
            const isSectionHeader = row.name.startsWith('一、') || row.name.startsWith('二、') || 
                                   row.name.startsWith('三、') || row.name.startsWith('四、') || 
                                   row.name.startsWith('五、') || row.name.startsWith('六、') ||
                                   row.name.startsWith('七、') || row.name.includes('（一）') || 
                                   row.name.includes('（二）') || row.name.includes('（三）');
            return (
              <tr key={idx} className={isTotalRow ? 'bg-gray-100' : ''}>
                <td 
                  className={`border border-gray-400 px-4 py-2 text-sm ${isSectionHeader ? 'font-bold text-gray-900' : 'text-gray-900'}`}
                  style={{ borderLeft: '1px solid #000' }}
                >
                  {row.name}
                </td>
                {row.values.map((val, valIdx) => (
                  <td 
                    key={valIdx} 
                    className={`border border-gray-400 px-4 py-2 text-sm font-mono ${isTotalRow ? 'font-bold text-gray-900' : 'text-gray-900'}`}
                    style={{ 
                      textAlign: hasNotes && valIdx === 1 ? 'left' : 'right',
                      borderRight: valIdx === row.values.length - 1 ? '1px solid #000' : '1px solid #ccc'
                    }}
                  >
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">企业准则</th>
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
                        <td className="px-4 py-3 text-sm text-gray-600">{task.accounting_standard}</td>
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
                            {(task.status === 'approved' || task.status === 'reviewing' || task.status === 'submitted') && (
                              <button 
                                onClick={() => handlePreview(task)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                预览
                              </button>
                            )}
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

      {showPreviewModal && previewReportData && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto pt-8 pb-8" onClick={(e) => e.target === e.currentTarget && setShowPreviewModal(false)}>
          <div className="bg-white shadow-xl border-2 border-gray-800 mx-4 rounded-lg" style={{ maxWidth: '85vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between py-3 px-6 bg-gray-50" style={{ borderBottom: '2px solid #000', flexShrink: 0 }}>
              <div className="text-center flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontWeight: 'bold' }}>{previewReportData.title}</h1>
                {previewReportData.reportNo && (
                  <p className="text-xs text-gray-700" style={{ fontFamily: 'serif' }}>{previewReportData.reportNo}</p>
                )}
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700 px-8 py-3 bg-white" style={{ flexShrink: 0 }}>
              <div>
                <span>编制单位:</span>
                <span className="ml-1">{previewOrgName}</span>
              </div>
              <div className="flex items-center gap-6">
                <span>2026年3月31日</span>
                <span>单位: 元</span>
              </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
              {isBalanceSheet(previewReportData) ? renderBalanceSheet(previewReportData) : renderSimpleReport(previewReportData)}
            </div>
            <div className="flex items-center justify-between py-4 px-8 bg-white border-t border-gray-200" style={{ flexShrink: 0 }}>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">单位负责人:</span>
                  <span className="w-20 h-px bg-gray-400 mt-1"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">财务负责人:</span>
                  <span className="w-20 h-px bg-gray-400 mt-1"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">复核:</span>
                  <span className="w-20 h-px bg-gray-400 mt-1"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">制表:</span>
                  <span className="w-20 h-px bg-gray-400 mt-1"></span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  导出PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  导出Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

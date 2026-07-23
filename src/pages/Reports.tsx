import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Search, Calendar } from 'lucide-react';
import { periods } from '../data/mockData';

interface ReportTemplate {
  id: number;
  name: string;
  type: 'legal' | 'management' | 'custom';
  category: string;
  period: string;
  status: 'draft' | 'review' | 'final';
  lastUpdated: string;
}

const reportTemplates: ReportTemplate[] = [
  { id: 1, name: '合并资产负债表', type: 'legal', category: '法定报表', period: '2026-03', status: 'final', lastUpdated: '2026-03-28 14:30' },
  { id: 2, name: '合并利润表', type: 'legal', category: '法定报表', period: '2026-03', status: 'final', lastUpdated: '2026-03-28 14:35' },
  { id: 3, name: '合并现金流量表', type: 'legal', category: '法定报表', period: '2026-03', status: 'review', lastUpdated: '2026-03-28 15:00' },
  { id: 4, name: '合并所有者权益变动表', type: 'legal', category: '法定报表', period: '2026-03', status: 'draft', lastUpdated: '2026-03-28 15:30' },
  { id: 5, name: '合并报表附注', type: 'legal', category: '附注', period: '2026-03', status: 'draft', lastUpdated: '2026-03-28 16:00' },
  { id: 6, name: '管理用合并资产负债表', type: 'management', category: '管理报表', period: '2026-03', status: 'final', lastUpdated: '2026-03-28 14:40' },
  { id: 7, name: '管理用合并利润表', type: 'management', category: '管理报表', period: '2026-03', status: 'final', lastUpdated: '2026-03-28 14:45' },
];

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
  title: '合并资产负债表',
  reportNo: '会合01表',
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
      totalRowNo: 55,
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
        { rowNo: 75, name: '少数股东权益', current: 400000000, previous: 340000000 },
      ],
      totalRowNo: 80,
      totalName: '所有者权益合计'
    },
  ],
};

const profitStatementData: SimpleReportData = {
  title: '合并利润表',
  reportNo: '会合02表',
  columns: ['项目', '本期金额', '上期金额'],
  rows: [
    { name: '一、营业收入', values: [520000000, 480000000] },
    { name: '减：营业成本', values: [385000000, 360000000] },
    { name: '税金及附加', values: [5200000, 4800000] },
    { name: '销售费用', values: [28000000, 26000000] },
    { name: '管理费用', values: [35000000, 32000000] },
    { name: '研发费用', values: [10000000, 8000000] },
    { name: '财务费用', values: [12000000, 11000000] },
    { name: '其中：利息费用', values: [12000000, 11000000] },
    { name: '利息收入', values: [0, 0] },
    { name: '资产减值损失', values: [3000000, 2500000] },
    { name: '信用减值损失', values: [0, 0] },
    { name: '加：其他收益', values: [0, 0] },
    { name: '投资收益（损失以“-”号填列）', values: [8500000, 7000000] },
    { name: '其中：对联营企业和合营企业的投资收益', values: [0, 0] },
    { name: '净敞口套期收益（损失以“-”号填列）', values: [0, 0] },
    { name: '公允价值变动收益（损失以“-”号填列）', values: [0, 0] },
    { name: '资产处置收益（损失以“-”号填列）', values: [0, 0] },
    { name: '二、营业利润（亏损以“-”号填列）', values: [51800000, 43700000] },
    { name: '加：营业外收入', values: [2500000, 2000000] },
    { name: '减：营业外支出', values: [1800000, 1500000] },
    { name: '三、利润总额（亏损总额以“-”号填列）', values: [52500000, 44200000] },
    { name: '减：所得税费用', values: [12600000, 10608000] },
    { name: '四、净利润（净亏损以“-”号填列）', values: [39900000, 33592000] },
    { name: '（一）按经营持续性分类：', values: ['', ''] },
    { name: '持续经营净利润（净亏损以“-”号填列）', values: [39900000, 33592000] },
    { name: '终止经营净利润（净亏损以“-”号填列）', values: [0, 0] },
    { name: '（二）按所有权归属分类：', values: ['', ''] },
    { name: '归属于母公司所有者的净利润', values: [35000000, 29500000] },
    { name: '少数股东损益', values: [4900000, 4092000] },
    { name: '五、其他综合收益的税后净额', values: [0, 0] },
    { name: '（一）不能重分类进损益的其他综合收益', values: [0, 0] },
    { name: '1.重新计量设定受益计划变动额', values: [0, 0] },
    { name: '2.权益法下不能转损益的其他综合收益', values: [0, 0] },
    { name: '（二）将重分类进损益的其他综合收益', values: [0, 0] },
    { name: '1.权益法下可转损益的其他综合收益', values: [0, 0] },
    { name: '2.可供出售金融资产公允价值变动损益', values: [0, 0] },
    { name: '3.持有至到期投资重分类为可供出售金融资产损益', values: [0, 0] },
    { name: '4.现金流量套期损益的有效部分', values: [0, 0] },
    { name: '5.外币财务报表折算差额', values: [0, 0] },
    { name: '六、综合收益总额', values: [39900000, 33592000] },
    { name: '归属于母公司所有者的综合收益总额', values: [35000000, 29500000] },
    { name: '归属于少数股东的综合收益总额', values: [4900000, 4092000] },
    { name: '七、每股收益：', values: ['', ''] },
    { name: '（一）基本每股收益（元/股）', values: [0.52, 0.44] },
    { name: '（二）稀释每股收益（元/股）', values: [0.51, 0.43] },
  ],
};

const cashFlowData: SimpleReportData = {
  title: '合并现金流量表',
  reportNo: '会合03表',
  columns: ['项目', '本期金额', '上期金额'],
  rows: [
    { name: '一、经营活动产生的现金流量：', values: ['', ''] },
    { name: '销售商品、提供劳务收到的现金', values: [545000000, 505000000] },
    { name: '收到的税费返还', values: [3500000, 3000000] },
    { name: '收到其他与经营活动有关的现金', values: [8500000, 7500000] },
    { name: '经营活动现金流入小计', values: [557000000, 515500000] },
    { name: '购买商品、接受劳务支付的现金', values: [378000000, 355000000] },
    { name: '支付给职工以及为职工支付的现金', values: [45000000, 42000000] },
    { name: '支付的各项税费', values: [28000000, 26000000] },
    { name: '支付其他与经营活动有关的现金', values: [32000000, 30000000] },
    { name: '经营活动现金流出小计', values: [483000000, 453000000] },
    { name: '经营活动产生的现金流量净额', values: [74000000, 62500000] },
    { name: '二、投资活动产生的现金流量：', values: ['', ''] },
    { name: '收回投资收到的现金', values: [15000000, 12000000] },
    { name: '取得投资收益收到的现金', values: [8500000, 7000000] },
    { name: '处置固定资产、无形资产和其他长期资产收回的现金净额', values: [3000000, 2500000] },
    { name: '处置子公司及其他营业单位收到的现金净额', values: [0, 0] },
    { name: '收到其他与投资活动有关的现金', values: [0, 0] },
    { name: '投资活动现金流入小计', values: [26500000, 21500000] },
    { name: '购建固定资产、无形资产和其他长期资产支付的现金', values: [35000000, 30000000] },
    { name: '投资支付的现金', values: [20000000, 18000000] },
    { name: '取得子公司及其他营业单位支付的现金净额', values: [0, 0] },
    { name: '支付其他与投资活动有关的现金', values: [0, 0] },
    { name: '投资活动现金流出小计', values: [55000000, 48000000] },
    { name: '投资活动产生的现金流量净额', values: [-28500000, -26500000] },
    { name: '三、筹资活动产生的现金流量：', values: ['', ''] },
    { name: '吸收投资收到的现金', values: [50000000, 45000000] },
    { name: '其中：子公司吸收少数股东投资收到的现金', values: [0, 0] },
    { name: '取得借款收到的现金', values: [85000000, 80000000] },
    { name: '收到其他与筹资活动有关的现金', values: [0, 0] },
    { name: '筹资活动现金流入小计', values: [135000000, 125000000] },
    { name: '偿还债务支付的现金', values: [70000000, 65000000] },
    { name: '分配股利、利润或偿付利息支付的现金', values: [18000000, 16000000] },
    { name: '其中：子公司支付给少数股东的股利、利润', values: [0, 0] },
    { name: '支付其他与筹资活动有关的现金', values: [0, 0] },
    { name: '筹资活动现金流出小计', values: [88000000, 81000000] },
    { name: '筹资活动产生的现金流量净额', values: [47000000, 44000000] },
    { name: '四、汇率变动对现金及现金等价物的影响', values: [-500000, -300000] },
    { name: '五、现金及现金等价物净增加额', values: [92000000, 79700000] },
    { name: '加：期初现金及现金等价物余额', values: [265900000, 186200000] },
    { name: '六、期末现金及现金等价物余额', values: [357900000, 265900000] },
  ],
};

const equityChangeData: SimpleReportData = {
  title: '合并所有者权益变动表',
  reportNo: '会合04表',
  columns: ['项目', '实收资本', '资本公积', '其他综合收益', '盈余公积', '未分配利润', '归属于母公司所有者权益合计', '少数股东权益', '所有者权益合计'],
  rows: [
    { name: '一、上年年末余额', values: [128000000, 50000000, 0, 28000000, -52000000, 154000000, 60500000, 214500000] },
    { name: '加：会计政策变更', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '前期差错更正', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '其他', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '二、本年年初余额', values: [128000000, 50000000, 0, 28000000, -52000000, 154000000, 60500000, 214500000] },
    { name: '三、本年增减变动金额（减少以“-”号填列）', values: [0, 0, 0, 2000000, 10570000, 12570000, 4557000, 17127000] },
    { name: '（一）综合收益总额', values: [0, 0, 0, 0, 10570000, 10570000, 4557000, 15127000] },
    { name: '（二）所有者投入和减少资本', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '1.所有者投入的普通股', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '2.其他权益工具持有者投入资本', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '3.股份支付计入所有者权益的金额', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '4.其他', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '（三）利润分配', values: [0, 0, 0, 2000000, -2000000, 0, 0, 0] },
    { name: '1.提取盈余公积', values: [0, 0, 0, 2000000, -2000000, 0, 0, 0] },
    { name: '2.提取一般风险准备', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '3.对所有者（或股东）的分配', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '4.其他', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '（四）所有者权益内部结转', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '1.资本公积转增资本（或股本）', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '2.盈余公积转增资本（或股本）', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '3.盈余公积弥补亏损', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '4.设定受益计划变动额结转留存收益', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '5.其他综合收益结转留存收益', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '6.其他', values: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '四、本年年末余额', values: [128000000, 50000000, 0, 30000000, -41430000, 166570000, 65057000, 231627000] },
  ],
};

const notesData: SimpleReportData = {
  title: '合并报表附注',
  reportNo: '',
  columns: ['项目', '备注说明'],
  rows: [
    { name: '一、企业基本情况', values: ['', ''] },
    { name: '企业名称', values: ['', '集团总部'] },
    { name: '注册地址', values: ['', '北京市朝阳区建国路88号'] },
    { name: '法定代表人', values: ['', '张三'] },
    { name: '注册资本', values: ['', '12800万元'] },
    { name: '主营业务', values: ['', '投资管理、资产管理'] },
    { name: '二、财务报表的编制基础', values: ['', ''] },
    { name: '编制基础', values: ['', '本财务报表按照企业会计准则的规定编制'] },
    { name: '持续经营', values: ['', '本公司自报告期末起12个月内具备持续经营能力'] },
    { name: '三、重要会计政策和会计估计', values: ['', ''] },
    { name: '会计期间', values: ['', '公历1月1日至12月31日'] },
    { name: '记账本位币', values: ['', '人民币'] },
    { name: '合并财务报表的编制方法', values: ['', '以控制为基础确定合并范围'] },
    { name: '现金等价物的确定标准', values: ['', '期限短、流动性强、易于转换为已知金额现金'] },
    { name: '四、税项', values: ['', ''] },
    { name: '企业所得税', values: ['', '税率25%'] },
    { name: '增值税', values: ['', '一般纳税人，税率13%/9%/6%'] },
    { name: '城市维护建设税', values: ['', '税率7%'] },
    { name: '教育费附加', values: ['', '费率3%'] },
  ],
};

const managementBalanceSheetData: SimpleReportData = {
  title: '管理用合并资产负债表',
  reportNo: '',
  columns: ['项目', '期末余额', '上年同期'],
  rows: [
    { name: '经营性资产:', values: ['', ''] },
    { name: '经营性流动资产', values: [535000000, 505000000] },
    { name: '经营性长期资产', values: [400000000, 380000000] },
    { name: '经营性资产合计', values: [935000000, 885000000] },
    { name: '金融性资产:', values: ['', ''] },
    { name: '货币资金', values: [357900000, 340000000] },
    { name: '交易性金融资产', values: [0, 0] },
    { name: '金融性资产合计', values: [357900000, 340000000] },
    { name: '资产总计', values: [1131490000, 1074000000] },
    { name: '经营性负债:', values: ['', ''] },
    { name: '经营性流动负债', values: [187960000, 173500000] },
    { name: '经营性长期负债', values: [15000000, 14000000] },
    { name: '经营性负债合计', values: [202960000, 187500000] },
    { name: '金融性负债:', values: ['', ''] },
    { name: '短期借款', values: [0, 0] },
    { name: '长期借款', values: [405960000, 390000000] },
    { name: '应付债券', values: [80000000, 80000000] },
    { name: '金融性负债合计', values: [485960000, 470000000] },
    { name: '负债合计', values: [708920000, 675500000] },
    { name: '净负债', values: [280060000, 265000000] },
    { name: '所有者权益', values: [231627000, 214500000] },
    { name: '净负债及所有者权益', values: [511687000, 479500000] },
  ],
};

const managementProfitData: SimpleReportData = {
  title: '管理用合并利润表',
  reportNo: '',
  columns: ['项目', '本期金额', '上期金额'],
  rows: [
    { name: '一、营业收入', values: [520000000, 480000000] },
    { name: '减：营业成本', values: [385000000, 360000000] },
    { name: '毛利', values: [135000000, 120000000] },
    { name: '减：经营性费用', values: [93200000, 85300000] },
    { name: '二、税前经营利润', values: [41800000, 34700000] },
    { name: '减：经营所得税', values: [10450000, 8675000] },
    { name: '三、税后经营净利润', values: [31350000, 26025000] },
    { name: '四、利息费用', values: ['', ''] },
    { name: '减：利息费用', values: [12000000, 11000000] },
    { name: '加：利息抵税', values: [3000000, 2750000] },
    { name: '五、税后利息费用', values: [-9000000, -8250000] },
    { name: '六、净利润', values: [39900000, 33592000] },
    { name: '归属于母公司所有者的净利润', values: [35000000, 29500000] },
    { name: '少数股东损益', values: [4900000, 4092000] },
  ],
};

const reportDataMap: Record<string, ReportData> = {
  '合并资产负债表': balanceSheetData,
  '合并利润表': profitStatementData,
  '合并现金流量表': cashFlowData,
  '合并所有者权益变动表': equityChangeData,
  '合并报表附注': notesData,
  '管理用合并资产负债表': managementBalanceSheetData,
  '管理用合并利润表': managementProfitData,
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'list' | 'preview'>('list');
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<number>(3);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusLabel = (status: ReportTemplate['status']) => {
    const labels: Record<string, string> = {
      draft: '草稿',
      review: '审核中',
      final: '已定稿'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: ReportTemplate['status']) => {
    const colors: Record<string, string> = {
      draft: 'bg-yellow-100 text-yellow-600',
      review: 'bg-blue-100 text-blue-600',
      final: 'bg-green-100 text-green-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      '法定报表': 'bg-blue-50 text-blue-700',
      '附注': 'bg-purple-50 text-purple-700',
      '管理报表': 'bg-green-50 text-green-700'
    };
    return labels[category] || 'bg-gray-50 text-gray-700';
  };

  const filteredReports = reportTemplates.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatNumber = (num: number | string) => {
    if (typeof num === 'string') return num;
    if (typeof num !== 'number' || isNaN(num)) return '';
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
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

  const currentReportData = selectedReport ? reportDataMap[selectedReport.name] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">合并报表</h1>
          <p className="text-gray-500 mt-1">查看和导出合并财务报表</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periods.map(p => (
              <option key={p.id} value={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Calendar className="w-4 h-4" />
            批量生成
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'list' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            报表列表
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            报表预览
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'list' ? (
            <>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">会计区间:</label>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0">全部期间</option>
                      {periods.filter(p => p.status === 'opened' || p.status === 'closed').map(p => (
                        <option key={p.id} value={p.id}>{p.year}-{String(p.month).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">状态:</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">全部状态</option>
                      <option value="draft">草稿</option>
                      <option value="review">审核中</option>
                      <option value="final">已定稿</option>
                    </select>
                  </div>
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索报表..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">报表名称</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类别</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">期间</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后更新</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <button 
                            onClick={() => {
                              setSelectedReport(report);
                              setActiveTab('preview');
                            }}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            {report.name}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryLabel(report.category)}`}>
                            {report.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{report.period}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {getStatusLabel(report.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{report.lastUpdated}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm">
                              <Download className="w-4 h-4" />
                              导出
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-500">共 {filteredReports.length} 条记录</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">上一页</button>
                    <span className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">1</span>
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="min-h-[500px] flex items-center justify-center bg-gray-100 p-8">
              {currentReportData ? (
                <div className="bg-white shadow-lg border-2 border-gray-800" style={{ minWidth: '900px', maxWidth: '100%' }}>
                  <div className="text-center py-8" style={{ borderBottom: '2px solid #000' }}>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontWeight: 'bold' }}>{currentReportData.title}</h1>
                    {currentReportData.reportNo && (
                      <p className="text-sm text-gray-700 mb-4" style={{ fontFamily: 'serif' }}>{currentReportData.reportNo}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-700 px-12">
                      <div>
                        <span>编制单位:</span>
                        <span className="ml-1">集团总部（合并）</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span>2026年3月31日</span>
                        <span>单位: 元</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    {isBalanceSheet(currentReportData) ? renderBalanceSheet(currentReportData) : renderSimpleReport(currentReportData)}
                  </div>
                  <div className="flex items-center justify-between py-6 px-12" style={{ borderTop: '2px solid #000' }}>
                    <div className="flex items-center gap-12">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">单位负责人:</span>
                        <span className="w-24 h-px bg-gray-400 mt-1"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">财务负责人:</span>
                        <span className="w-24 h-px bg-gray-400 mt-1"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">复核:</span>
                        <span className="w-24 h-px bg-gray-400 mt-1"></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">制表:</span>
                        <span className="w-24 h-px bg-gray-400 mt-1"></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm">
                        <FileText className="w-4 h-4" />
                        导出PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        导出Excel
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                        <FileSpreadsheet className="w-4 h-4" />
                        导出CSV
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">请选择一个报表进行预览</p>
                  <button 
                    onClick={() => setActiveTab('list')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    返回报表列表
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
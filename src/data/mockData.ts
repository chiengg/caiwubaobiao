import {
  Organization,
  Account,
  Currency,
  ExchangeRate,
  Period,
  ConsolidationScope,
  Equity,
  User,
  ReportData,
  EliminationEntry,
  Task,
  KPIData,
  WorkflowTask,
  FinancialIndicator,
  NavigationItem,
  WorkPaperItem,
  CalculationDetail,
  AccountMapping,
} from '../types';

export const organizations: Organization[] = [
  {
    id: 1,
    code: 'GROUP',
    name: '集团总部',
    credit_code: '911100001234567890',
    registered_address: '北京市朝阳区',
    currency_code: 'CNY',
    parent_id: null,
    is_consolidation: true,
    status: 'active',
    children: [
      {
        id: 5,
        code: 'SEG1',
        name: '业务板块一',
        credit_code: '',
        registered_address: '',
        currency_code: 'CNY',
        parent_id: 1,
        is_consolidation: true,
        status: 'active',
        children: [
          {
            id: 2,
            code: 'SUB1',
            name: '子公司A',
            credit_code: '911100001234567891',
            registered_address: '上海市浦东新区',
            currency_code: 'CNY',
            parent_id: 5,
            is_consolidation: false,
            status: 'active',
          },
          {
            id: 4,
            code: 'SUB3',
            name: '子公司C',
            credit_code: '911100001234567893',
            registered_address: '江苏省苏州市',
            currency_code: 'USD',
            parent_id: 5,
            is_consolidation: false,
            status: 'active',
          },
        ],
      },
      {
        id: 6,
        code: 'SEG2',
        name: '业务板块二',
        credit_code: '',
        registered_address: '',
        currency_code: 'CNY',
        parent_id: 1,
        is_consolidation: true,
        status: 'active',
        children: [
          {
            id: 3,
            code: 'SUB2',
            name: '子公司B',
            credit_code: '911100001234567892',
            registered_address: '广东省深圳市',
            currency_code: 'CNY',
            parent_id: 6,
            is_consolidation: false,
            status: 'active',
          },
        ],
      },
    ],
  },
];

export const accounts: Account[] = [
  { id: 1, code: '1000', name: '资产', type: 'asset', balance_direction: 'debit', level: 1, parent_id: null, is_liquid: false, category: 'asset', mnemonic_code: '', status: 'active' },
  { id: 2, code: '1001', name: '库存现金', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'kcxj', status: 'active' },
  { id: 3, code: '1002', name: '银行存款', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'yckc', status: 'active' },
  { id: 4, code: '1012', name: '其他货币资金', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'qthbzj', status: 'active' },
  { id: 5, code: '1101', name: '短期投资', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'dqtz', status: 'active' },
  { id: 6, code: '1101001', name: '股票', type: 'asset', balance_direction: 'debit', level: 3, parent_id: 5, is_liquid: true, category: 'current', mnemonic_code: 'dqtz_gp', status: 'active' },
  { id: 7, code: '1101002', name: '债券', type: 'asset', balance_direction: 'debit', level: 3, parent_id: 5, is_liquid: true, category: 'current', mnemonic_code: 'dqtz_zq', status: 'active' },
  { id: 8, code: '1101003', name: '基金', type: 'asset', balance_direction: 'debit', level: 3, parent_id: 5, is_liquid: true, category: 'current', mnemonic_code: 'dqtz_jj', status: 'active' },
  { id: 9, code: '1121', name: '应收票据', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'yspj', status: 'active' },
  { id: 10, code: '1122', name: '应收账款', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'yszk', status: 'active' },
  { id: 11, code: '1123', name: '预付账款', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'yfzk', status: 'active' },
  { id: 12, code: '1131', name: '应收股利', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'ysgl', status: 'active' },
  { id: 13, code: '1221', name: '其他应收款', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'qtys', status: 'active' },
  { id: 14, code: '1401', name: '材料采购', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'clcg', status: 'active' },
  { id: 15, code: '1403', name: '原材料', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'ycl', status: 'active' },
  { id: 16, code: '1405', name: '库存商品', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'kcsp', status: 'active' },
  { id: 17, code: '1404', name: '材料成本差异', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: true, category: 'current', mnemonic_code: 'clcbcy', status: 'active' },
  { id: 18, code: '1601', name: '固定资产', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: false, category: 'non-current', mnemonic_code: 'gdzc', status: 'active' },
  { id: 19, code: '1602', name: '累计折旧', type: 'asset', balance_direction: 'credit', level: 2, parent_id: 1, is_liquid: false, category: 'non-current', mnemonic_code: 'ljzj', status: 'active' },
  { id: 20, code: '1701', name: '无形资产', type: 'asset', balance_direction: 'debit', level: 2, parent_id: 1, is_liquid: false, category: 'non-current', mnemonic_code: 'wxzc', status: 'active' },
  { id: 21, code: '2000', name: '负债', type: 'liability', balance_direction: 'credit', level: 1, parent_id: null, is_liquid: false, category: 'liability', mnemonic_code: '', status: 'active' },
  { id: 22, code: '2001', name: '短期借款', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'dqjk', status: 'active' },
  { id: 23, code: '2201', name: '应付票据', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'yfpj', status: 'active' },
  { id: 24, code: '2202', name: '应付账款', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'yfzk', status: 'active' },
  { id: 25, code: '2203', name: '预收账款', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'yszk', status: 'active' },
  { id: 26, code: '2211', name: '应付职工薪酬', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'yfgzxc', status: 'active' },
  { id: 27, code: '2221', name: '应交税费', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'yssf', status: 'active' },
  { id: 28, code: '2241', name: '其他应付款', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: true, category: 'current', mnemonic_code: 'qtyf', status: 'active' },
  { id: 29, code: '2501', name: '长期借款', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: false, category: 'non-current', mnemonic_code: 'cqjk', status: 'active' },
  { id: 30, code: '2502', name: '应付债券', type: 'liability', balance_direction: 'credit', level: 2, parent_id: 21, is_liquid: false, category: 'non-current', mnemonic_code: 'yfzj', status: 'active' },
  { id: 31, code: '3000', name: '所有者权益', type: 'equity', balance_direction: 'credit', level: 1, parent_id: null, is_liquid: false, category: 'equity', mnemonic_code: '', status: 'active' },
  { id: 32, code: '3001', name: '实收资本', type: 'equity', balance_direction: 'credit', level: 2, parent_id: 31, is_liquid: false, category: 'equity', mnemonic_code: 'sszb', status: 'active' },
  { id: 33, code: '3002', name: '资本公积', type: 'equity', balance_direction: 'credit', level: 2, parent_id: 31, is_liquid: false, category: 'equity', mnemonic_code: 'zbgj', status: 'active' },
  { id: 34, code: '3101', name: '盈余公积', type: 'equity', balance_direction: 'credit', level: 2, parent_id: 31, is_liquid: false, category: 'equity', mnemonic_code: 'yjgj', status: 'active' },
  { id: 35, code: '3103', name: '未分配利润', type: 'equity', balance_direction: 'credit', level: 2, parent_id: 31, is_liquid: false, category: 'equity', mnemonic_code: 'wfplr', status: 'active' },
  { id: 36, code: '4000', name: '成本', type: 'cost', balance_direction: 'debit', level: 1, parent_id: null, is_liquid: false, category: 'cost', mnemonic_code: '', status: 'active' },
  { id: 37, code: '5000', name: '损益', type: 'income', balance_direction: 'credit', level: 1, parent_id: null, is_liquid: false, category: 'income', mnemonic_code: '', status: 'active' },
  { id: 38, code: '6001', name: '主营业务收入', type: 'income', balance_direction: 'credit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'zyywsr', status: 'active' },
  { id: 39, code: '6051', name: '其他业务收入', type: 'income', balance_direction: 'credit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'qt ywsr', status: 'active' },
  { id: 40, code: '6301', name: '营业外收入', type: 'income', balance_direction: 'credit', level: 2, parent_id: 37, is_liquid: false, category: 'non-operating', mnemonic_code: 'ywy sr', status: 'active' },
  { id: 41, code: '6401', name: '主营业务成本', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'zyywcb', status: 'active' },
  { id: 42, code: '6402', name: '其他业务成本', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'qt ywcb', status: 'active' },
  { id: 43, code: '6601', name: '销售费用', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'xsfy', status: 'active' },
  { id: 44, code: '6602', name: '管理费用', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'glfy', status: 'active' },
  { id: 45, code: '6603', name: '财务费用', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'operating', mnemonic_code: 'cwfy', status: 'active' },
  { id: 46, code: '6711', name: '营业外支出', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'non-operating', mnemonic_code: 'ywy cz', status: 'active' },
  { id: 47, code: '6801', name: '所得税费用', type: 'expense', balance_direction: 'debit', level: 2, parent_id: 37, is_liquid: false, category: 'non-operating', mnemonic_code: 'ssdsfy', status: 'active' },
];

export const currencies: Currency[] = [
  { id: 1, code: 'CNY', name: '人民币', symbol: '¥', decimal_places: 2 },
  { id: 2, code: 'USD', name: '美元', symbol: '$', decimal_places: 2 },
  { id: 3, code: 'EUR', name: '欧元', symbol: '€', decimal_places: 2 },
  { id: 4, code: 'JPY', name: '日元', symbol: '¥', decimal_places: 0 },
  { id: 5, code: 'GBP', name: '英镑', symbol: '£', decimal_places: 2 },
];

export const exchangeRates: ExchangeRate[] = [
  { id: 1, from_currency: 'USD', to_currency: 'CNY', rate_type: 'spot', rate: 7.2450, period: '2026-03', effective_date: '2026-03-01' },
  { id: 2, from_currency: 'USD', to_currency: 'CNY', rate_type: 'average', rate: 7.2380, period: '2026-03', effective_date: '2026-03-01' },
  { id: 3, from_currency: 'EUR', to_currency: 'CNY', rate_type: 'spot', rate: 7.8210, period: '2026-03', effective_date: '2026-03-01' },
  { id: 4, from_currency: 'JPY', to_currency: 'CNY', rate_type: 'spot', rate: 0.0485, period: '2026-03', effective_date: '2026-03-01' },
];

export const periods: Period[] = [
  { id: 1, year: 2026, quarter: 1, month: 1, start_date: '2026-01-01', end_date: '2026-01-31', status: 'closed', calendar_type: 'gregorian' },
  { id: 2, year: 2026, quarter: 1, month: 2, start_date: '2026-02-01', end_date: '2026-02-28', status: 'closed', calendar_type: 'gregorian' },
  { id: 3, year: 2026, quarter: 1, month: 3, start_date: '2026-03-01', end_date: '2026-03-31', status: 'opened', calendar_type: 'gregorian' },
  { id: 4, year: 2026, quarter: 2, month: 4, start_date: '2026-04-01', end_date: '2026-04-30', status: 'unopened', calendar_type: 'gregorian' },
];

export const consolidationScopes: ConsolidationScope[] = [
  {
    id: 1,
    name: '集团合并主体',
    description: '2026年6月合并范围配置',
    items: [
      { id: 1, scope_id: 1, org_id: 1, org_code: 'SUB-B1', org_name: '制造一公司', segment: '制造业', share_ratio: 100, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2023-01-01' },
      { id: 2, scope_id: 1, org_id: 2, org_code: 'SUB-B2', org_name: '制造二公司', segment: '制造业', share_ratio: 85, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2023-01-01' },
      { id: 3, scope_id: 1, org_id: 3, org_code: 'SUB-B3', org_name: '精密制造公司', segment: '制造业', share_ratio: 85, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2024-01-01' },
      { id: 4, scope_id: 1, org_id: 4, org_code: 'SUB-B2-1', org_name: '精密制造一子公司', segment: '制造业', share_ratio: 100, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2024-06-01' },
      { id: 5, scope_id: 1, org_id: 5, org_code: 'SUB-B3', org_name: '制造三公司', segment: '制造业', share_ratio: 70, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2024-01-01' },
      { id: 6, scope_id: 1, org_id: 6, org_code: 'SUB-C1', org_name: '贸易一公司', segment: '贸易', share_ratio: 100, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2023-01-01' },
      { id: 7, scope_id: 1, org_id: 7, org_code: 'SUB-C2', org_name: '贸易二公司', segment: '贸易', share_ratio: 95, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2023-06-01' },
      { id: 8, scope_id: 1, org_id: 8, org_code: 'SUB-C2-1', org_name: '欧洲子公司', segment: '贸易', share_ratio: 95, consolidation_method: 'full', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2024-03-01' },
      { id: 9, scope_id: 1, org_id: 9, org_code: 'SUB-D1', org_name: '欧洲子公司', segment: '海外', share_ratio: 100, consolidation_method: 'full', currency_code: 'EUR', inclusion_status: 'included', effective_date: '2024-01-01' },
      { id: 10, scope_id: 1, org_id: 10, org_code: 'SUB-D2', org_name: '北美子公司', segment: '海外', share_ratio: 76, consolidation_method: 'full', currency_code: 'USD', inclusion_status: 'included', effective_date: '2024-01-01' },
      { id: 11, scope_id: 1, org_id: 11, org_code: 'SUB-E1', org_name: '合资企业', segment: '联营', share_ratio: 50, consolidation_method: 'proportionate', currency_code: 'CNY', inclusion_status: 'included', effective_date: '2023-01-01' },
      { id: 12, scope_id: 1, org_id: 12, org_code: 'SUB-F1', org_name: '联营企业', segment: '联营', share_ratio: 30, consolidation_method: 'equity', currency_code: 'CNY', inclusion_status: 'excluded', effective_date: '2025-01-01' },
      { id: 13, scope_id: 1, org_id: 13, org_code: 'SUB-F1', org_name: '联营企业', segment: '联营', share_ratio: 30, consolidation_method: 'equity', currency_code: 'CNY', inclusion_status: 'excluded', effective_date: '2025-01-01' },
    ],
  },
];

export const equities: Equity[] = [
  { id: 1, investor_id: 1, investor_name: '集团总部', investee_id: 2, investee_name: '子公司A', share_ratio: 0.85, investment_cost: 100000000, investment_date: '2020-01-01', goodwill: 5000000 },
  { id: 2, investor_id: 1, investor_name: '集团总部', investee_id: 3, investee_name: '子公司B', share_ratio: 0.70, investment_cost: 80000000, investment_date: '2021-06-01', goodwill: 3000000 },
  { id: 3, investor_id: 1, investor_name: '集团总部', investee_id: 4, investee_name: '子公司C', share_ratio: 0.90, investment_cost: 120000000, investment_date: '2019-03-01', goodwill: 8000000 },
];

export const users: User[] = [
  { id: 1, username: 'admin', real_name: '系统管理员', email: 'admin@example.com', phone: '13800000001', role: 'admin', status: 'active' },
  { id: 2, username: 'cfo', real_name: '财务总监', email: 'cfo@example.com', phone: '13800000002', role: 'cfo', status: 'active' },
  { id: 3, username: 'consolidator', real_name: '合并专员', email: 'consolidator@example.com', phone: '13800000003', role: 'consolidator', status: 'active' },
  { id: 4, username: 'analyst', real_name: '财务分析师', email: 'analyst@example.com', phone: '13800000004', role: 'analyst', status: 'active' },
  { id: 5, username: 'auditor', real_name: '审计人员', email: 'auditor@example.com', phone: '13800000005', role: 'auditor', status: 'active' },
];

export const reportData: ReportData[] = [
  { id: 1, org_id: 1, org_name: '集团总部', period_id: 3, report_type: 'balance_sheet', account_id: 1, account_code: '1000', account_name: '资产', amount: 500000000, currency_code: 'CNY', version: 'final' },
  { id: 2, org_id: 2, org_name: '子公司A', period_id: 3, report_type: 'balance_sheet', account_id: 1, account_code: '1000', account_name: '资产', amount: 150000000, currency_code: 'CNY', version: 'final' },
  { id: 3, org_id: 3, org_name: '子公司B', period_id: 3, report_type: 'balance_sheet', account_id: 1, account_code: '1000', account_name: '资产', amount: 120000000, currency_code: 'CNY', version: 'final' },
  { id: 4, org_id: 4, org_name: '子公司C', period_id: 3, report_type: 'balance_sheet', account_id: 1, account_code: '1000', account_name: '资产', amount: 20000000, currency_code: 'USD', version: 'final' },
  { id: 5, org_id: 1, org_name: '集团总部', period_id: 3, report_type: 'balance_sheet', account_id: 10, account_code: '2000', account_name: '负债', amount: 300000000, currency_code: 'CNY', version: 'final' },
  { id: 6, org_id: 2, org_name: '子公司A', period_id: 3, report_type: 'balance_sheet', account_id: 10, account_code: '2000', account_name: '负债', amount: 80000000, currency_code: 'CNY', version: 'final' },
  { id: 7, org_id: 3, org_name: '子公司B', period_id: 3, report_type: 'balance_sheet', account_id: 10, account_code: '2000', account_name: '负债', amount: 60000000, currency_code: 'CNY', version: 'final' },
  { id: 8, org_id: 4, org_name: '子公司C', period_id: 3, report_type: 'balance_sheet', account_id: 10, account_code: '2000', account_name: '负债', amount: 8000000, currency_code: 'USD', version: 'final' },
  { id: 9, org_id: 1, org_name: '集团总部', period_id: 3, report_type: 'income_statement', account_id: 20, account_code: '6001', account_name: '主营业务收入', amount: 200000000, currency_code: 'CNY', version: 'final' },
  { id: 10, org_id: 2, org_name: '子公司A', period_id: 3, report_type: 'income_statement', account_id: 20, account_code: '6001', account_name: '主营业务收入', amount: 80000000, currency_code: 'CNY', version: 'final' },
  { id: 11, org_id: 3, org_name: '子公司B', period_id: 3, report_type: 'income_statement', account_id: 20, account_code: '6001', account_name: '主营业务收入', amount: 60000000, currency_code: 'CNY', version: 'final' },
  { id: 12, org_id: 4, org_name: '子公司C', period_id: 3, report_type: 'income_statement', account_id: 20, account_code: '6001', account_name: '主营业务收入', amount: 15000000, currency_code: 'USD', version: 'final' },
];

export const eliminationEntries: EliminationEntry[] = [
  {
    id: 1,
    period_id: 3,
    entry_type: 'equity',
    description: '内部股权投资抵销-子公司A',
    lines: [
      { id: 1, entry_id: 1, account_id: 14, account_code: '3001', account_name: '实收资本', debit_amount: 85000000, credit_amount: 0, org_id: 2 },
      { id: 2, entry_id: 1, account_id: 15, account_code: '3002', account_name: '资本公积', debit_amount: 10000000, credit_amount: 0, org_id: 2 },
      { id: 3, entry_id: 1, account_id: 7, account_code: '1601', account_name: '固定资产', debit_amount: 5000000, credit_amount: 0, org_id: 2 },
      { id: 4, entry_id: 1, account_id: 3, account_code: '1002', account_name: '银行存款', credit_amount: 100000000, debit_amount: 0, org_id: 1 },
    ],
    created_at: '2026-03-25 10:00:00',
  },
];

export const kpiData: KPIData[] = [
  { title: '资产总额', value: '894,900', change: 5.2, unit: '万元', trend: 'up', icon: 'TrendingUp' },
  { title: '负债总额', value: '517,960', change: 3.8, unit: '万元', trend: 'up', icon: 'TrendingUp' },
  { title: '净利润', value: '28,500', change: 12.5, unit: '万元', trend: 'up', icon: 'TrendingUp' },
  { title: '经营现金流', value: '45,200', change: -2.1, unit: '万元', trend: 'down', icon: 'TrendingDown' },
];

export const tasks: Task[] = [
  { id: 1, title: '月度合并报表编制', description: '完成2026年3月合并报表编制', status: 'in_progress', assignee: '合并专员', dueDate: '2026-04-05', priority: 'high' },
  { id: 2, title: '内部往来对账', description: '核对子公司间内部往来余额', status: 'completed', assignee: '合并专员', dueDate: '2026-03-30', priority: 'high' },
  { id: 3, title: '股权结构更新', description: '更新Q1股权变动信息', status: 'pending', assignee: '系统管理员', dueDate: '2026-04-10', priority: 'medium' },
  { id: 4, title: '报表附注编制', description: '编制合并报表附注', status: 'pending', assignee: '财务分析师', dueDate: '2026-04-08', priority: 'medium' },
];

export const workflowTasks: WorkflowTask[] = [
  { id: 1, name: '数据采集', type: 'collection', status: 'completed', assignee: '子公司财务', due_date: '2026-03-20', progress: 100 },
  { id: 2, name: '数据审核', type: 'review', status: 'completed', assignee: '集团财务', due_date: '2026-03-22', progress: 100 },
  { id: 3, name: '汇率折算', type: 'conversion', status: 'completed', assignee: '合并专员', due_date: '2026-03-23', progress: 100 },
  { id: 4, name: '权益法调整', type: 'adjustment', status: 'completed', assignee: '合并专员', due_date: '2026-03-24', progress: 100 },
  { id: 5, name: '内部对账', type: 'reconciliation', status: 'completed', assignee: '合并专员', due_date: '2026-03-25', progress: 100 },
  { id: 6, name: '抵销处理', type: 'elimination', status: 'in_progress', assignee: '合并专员', due_date: '2026-03-28', progress: 60 },
  { id: 7, name: '合并计算', type: 'consolidation', status: 'pending', assignee: '合并专员', due_date: '2026-03-29', progress: 0 },
  { id: 8, name: '报表生成', type: 'report', status: 'pending', assignee: '合并专员', due_date: '2026-04-01', progress: 0 },
  { id: 9, name: '报表审核', type: 'approval', status: 'pending', assignee: '财务总监', due_date: '2026-04-03', progress: 0 },
  { id: 10, name: '流程关闭', type: 'close', status: 'pending', assignee: '系统管理员', due_date: '2026-04-05', progress: 0 },
];

export const financialIndicators: FinancialIndicator[] = [
  { name: '流动比率', value: 1.85, change: 5.2, unit: '', category: 'solvency' },
  { name: '速动比率', value: 1.42, change: 3.8, unit: '', category: 'solvency' },
  { name: '资产负债率', value: 57.9, change: -1.2, unit: '%', category: 'solvency' },
  { name: '净资产收益率', value: 12.5, change: 2.1, unit: '%', category: 'profitability' },
  { name: '总资产收益率', value: 6.8, change: 1.5, unit: '%', category: 'profitability' },
  { name: '毛利率', value: 35.2, change: 0.8, unit: '%', category: 'profitability' },
  { name: '净利率', value: 8.5, change: 1.2, unit: '%', category: 'profitability' },
  { name: '应收账款周转率', value: 6.2, change: 0.5, unit: '次', category: 'operation' },
  { name: '存货周转率', value: 4.8, change: 0.3, unit: '次', category: 'operation' },
  { name: '总资产周转率', value: 0.65, change: 0.05, unit: '次', category: 'operation' },
  { name: '营业收入增长率', value: 15.2, change: 3.5, unit: '%', category: 'growth' },
  { name: '净利润增长率', value: 12.5, change: 2.8, unit: '%', category: 'growth' },
];

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', name: '首页仪表盘', icon: 'LayoutDashboard', path: '/' },
  {
    id: 'settings',
    name: '基础设置',
    icon: 'Settings',
    path: '/settings',
    children: [
      { id: 'organization', name: '组织架构管理', icon: 'Building', path: '/settings/organization' },
      { id: 'accounts', name: '会计科目体系', icon: 'FileText', path: '/settings/accounts' },
      { id: 'currency', name: '币种汇率管理', icon: 'DollarSign', path: '/settings/currency' },
      { id: 'period', name: '会计期间管理', icon: 'Calendar', path: '/settings/period' },
    ],
  },
  { id: 'scope', name: '合并范围', icon: 'Network', path: '/scope' },
  { id: 'equity', name: '股权结构', icon: 'PieChart', path: '/equity' },
  { id: 'collection', name: '数据采集', icon: 'Upload', path: '/collection' },
  { id: 'consolidation', name: '合并处理', icon: 'Merge', path: '/consolidation' },
  { id: 'workpaper', name: '合并工作底稿', icon: 'FileSpreadsheet', path: '/workpaper' },
  { id: 'reports', name: '合并报表', icon: 'BarChart3', path: '/reports' },
  { id: 'custom-report', name: '自定义报表', icon: 'BarChart2', path: '/custom-report' },
  { id: 'analysis', name: '财务分析', icon: 'TrendingUp', path: '/analysis' },
  { id: 'workflow', name: '流程管理', icon: 'GitBranch', path: '/workflow' },
  {
    id: 'system',
    name: '系统管理',
    icon: 'Users',
    path: '/system',
    children: [
      { id: 'users', name: '用户管理', icon: 'User', path: '/system/users' },
      { id: 'permissions', name: '权限配置', icon: 'Shield', path: '/system/permissions' },
      { id: 'logs', name: '操作日志', icon: 'FileCheck', path: '/system/logs' },
    ],
  },
];

export const workPaperData: WorkPaperItem[] = [
  { item: '货币资金', parent: 150000000, subsidiaryA: 35000000, subsidiaryB: 28000000, subsidiaryC: 144900000, total: 357900000, debit: 0, credit: 0, minorityInterest: 0, consolidated: 357900000 },
  { item: '应收账款', parent: 80000000, subsidiaryA: 25000000, subsidiaryB: 18000000, subsidiaryC: 54337500, total: 177337500, debit: -20000000, credit: 0, minorityInterest: 0, consolidated: 157337500 },
  { item: '存货', parent: 60000000, subsidiaryA: 20000000, subsidiaryB: 15000000, subsidiaryC: 36225000, total: 131225000, debit: -5000000, credit: 0, minorityInterest: 0, consolidated: 126225000 },
  { item: '固定资产', parent: 120000000, subsidiaryA: 40000000, subsidiaryB: 35000000, subsidiaryC: 72450000, total: 267450000, debit: 0, credit: 0, minorityInterest: 0, consolidated: 267450000 },
  { item: '无形资产', parent: 30000000, subsidiaryA: 10000000, subsidiaryB: 8000000, subsidiaryC: 14490000, total: 62490000, debit: 0, credit: 0, minorityInterest: 0, consolidated: 62490000 },
  { item: '商誉', parent: 0, subsidiaryA: 5000000, subsidiaryB: 3000000, subsidiaryC: 8000000, total: 16000000, debit: 0, credit: 0, minorityInterest: 0, consolidated: 16000000 },
  { item: '资产总计', parent: 500000000, subsidiaryA: 150000000, subsidiaryB: 120000000, subsidiaryC: 326490000, total: 1096490000, debit: -25000000, credit: 0, minorityInterest: 0, consolidated: 1071490000 },
  { item: '应付账款', parent: 60000000, subsidiaryA: 18000000, subsidiaryB: 14000000, subsidiaryC: 57960000, total: 149960000, debit: 0, credit: -20000000, minorityInterest: 0, consolidated: 129960000 },
  { item: '长期借款', parent: 240000000, subsidiaryA: 62000000, subsidiaryB: 46000000, subsidiaryC: 57960000, total: 405960000, debit: 0, credit: 0, minorityInterest: 0, consolidated: 405960000 },
  { item: '负债合计', parent: 300000000, subsidiaryA: 80000000, subsidiaryB: 60000000, subsidiaryC: 115920000, total: 555920000, debit: 0, credit: -20000000, minorityInterest: 0, consolidated: 535920000 },
  { item: '实收资本', parent: 100000000, subsidiaryA: 100000000, subsidiaryB: 80000000, subsidiaryC: 120000000, total: 400000000, debit: -272000000, credit: 0, minorityInterest: 0, consolidated: 128000000 },
  { item: '资本公积', parent: 50000000, subsidiaryA: 20000000, subsidiaryB: 15000000, subsidiaryC: 30000000, total: 115000000, debit: -65000000, credit: 0, minorityInterest: 0, consolidated: 50000000 },
  { item: '盈余公积', parent: 30000000, subsidiaryA: 15000000, subsidiaryB: 12000000, subsidiaryC: 20000000, total: 77000000, debit: -47000000, credit: 0, minorityInterest: 0, consolidated: 30000000 },
  { item: '未分配利润', parent: 20000000, subsidiaryA: -65000000, subsidiaryB: -37000000, subsidiaryC: 40570000, total: -41430000, debit: 0, credit: 0, minorityInterest: 0, consolidated: -41430000 },
  { item: '所有者权益合计', parent: 200000000, subsidiaryA: 70000000, subsidiaryB: 60000000, subsidiaryC: 210570000, total: 540570000, debit: -384000000, credit: 0, minorityInterest: 0, consolidated: 156570000 },
  { item: '少数股东权益', parent: 0, subsidiaryA: 20000000, subsidiaryB: 24000000, subsidiaryC: 21057000, total: 65057000, debit: 0, credit: 0, minorityInterest: 65057000, consolidated: 65057000 },
  { item: '负债及权益总计', parent: 500000000, subsidiaryA: 170000000, subsidiaryB: 144000000, subsidiaryC: 347547000, total: 1161547000, debit: -409000000, credit: -20000000, minorityInterest: 65057000, consolidated: 797604000 },
];

export const calculationDetails: CalculationDetail[] = [
  {
    id: 'AR-debit-001',
    itemName: '应收账款',
    fieldType: 'debit',
    totalAmount: -20000000,
    calculationSteps: [
      { step: 1, description: '母公司对子公司A内部应收账款', amount: -12000000, formula: '母公司应收A = 12,000,000' },
      { step: 2, description: '母公司对子公司B内部应收账款', amount: -8000000, formula: '母公司应收B = 8,000,000' },
      { step: 3, description: '合计抵销金额', amount: -20000000, formula: '12,000,000 + 8,000,000' },
    ],
    vouchers: [
      { id: 'JV-202603-001', type: '内部往来凭证', date: '2026-03-15', amount: -12000000, description: '母公司销售商品给子公司A', counterparty: '子公司A' },
      { id: 'JV-202603-002', type: '内部往来凭证', date: '2026-03-20', amount: -8000000, description: '母公司销售商品给子公司B', counterparty: '子公司B' },
    ],
    explanation: '抵销母公司与子公司之间的内部应收账款，消除集团内部交易产生的应收应付往来余额。',
  },
  {
    id: 'INV-debit-001',
    itemName: '存货',
    fieldType: 'debit',
    totalAmount: -5000000,
    calculationSteps: [
      { step: 1, description: '子公司A从母公司购入存货未实现利润', amount: -3000000, formula: '成本6,000,000 × 毛利率50% = 3,000,000' },
      { step: 2, description: '子公司B从母公司购入存货未实现利润', amount: -2000000, formula: '成本4,000,000 × 毛利率50% = 2,000,000' },
      { step: 3, description: '合计未实现利润抵销', amount: -5000000, formula: '3,000,000 + 2,000,000' },
    ],
    vouchers: [
      { id: 'JV-202603-003', type: '存货抵销凭证', date: '2026-03-25', amount: -3000000, description: '子公司A期末存货中未实现内部利润', counterparty: '母公司' },
      { id: 'JV-202603-004', type: '存货抵销凭证', date: '2026-03-25', amount: -2000000, description: '子公司B期末存货中未实现内部利润', counterparty: '母公司' },
    ],
    explanation: '抵销集团内部存货交易中未实现的销售利润，子公司A和B期末存货包含从母公司购入的商品，需剔除内部利润部分。',
  },
  {
    id: 'AP-credit-001',
    itemName: '应付账款',
    fieldType: 'credit',
    totalAmount: -20000000,
    calculationSteps: [
      { step: 1, description: '子公司A对母公司内部应付账款', amount: -12000000, formula: 'A应付母公司 = 12,000,000' },
      { step: 2, description: '子公司B对母公司内部应付账款', amount: -8000000, formula: 'B应付母公司 = 8,000,000' },
      { step: 3, description: '合计抵销金额', amount: -20000000, formula: '12,000,000 + 8,000,000' },
    ],
    vouchers: [
      { id: 'JV-202603-001', type: '内部往来凭证', date: '2026-03-15', amount: -12000000, description: '子公司A向母公司采购商品', counterparty: '母公司' },
      { id: 'JV-202603-002', type: '内部往来凭证', date: '2026-03-20', amount: -8000000, description: '子公司B向母公司采购商品', counterparty: '母公司' },
    ],
    explanation: '抵销子公司与母公司之间的内部应付账款，与应收账款抵销对应，消除集团内部交易产生的往来余额。',
  },
  {
    id: 'CAP-debit-001',
    itemName: '实收资本',
    fieldType: 'debit',
    totalAmount: -272000000,
    calculationSteps: [
      { step: 1, description: '子公司A实收资本（持股80%）', amount: -80000000, formula: '100,000,000 × 80%' },
      { step: 2, description: '子公司B实收资本（持股70%）', amount: -56000000, formula: '80,000,000 × 70%' },
      { step: 3, description: '子公司C实收资本（持股100%）', amount: -120000000, formula: '120,000,000 × 100%' },
      { step: 4, description: '合计抵销金额', amount: -256000000, formula: '80,000,000 + 56,000,000 + 120,000,000' },
    ],
    vouchers: [
      { id: 'EQ-202603-001', type: '权益抵销凭证', date: '2026-03-31', amount: -80000000, description: '抵销子公司A实收资本（母公司持股部分）', counterparty: '子公司A' },
      { id: 'EQ-202603-002', type: '权益抵销凭证', date: '2026-03-31', amount: -56000000, description: '抵销子公司B实收资本（母公司持股部分）', counterparty: '子公司B' },
      { id: 'EQ-202603-003', type: '权益抵销凭证', date: '2026-03-31', amount: -120000000, description: '抵销子公司C实收资本（全资子公司）', counterparty: '子公司C' },
    ],
    explanation: '抵销母公司在子公司实收资本中的持股部分，反映母公司对子公司的长期股权投资与子公司所有者权益的抵销。',
  },
  {
    id: 'CAPRES-debit-001',
    itemName: '资本公积',
    fieldType: 'debit',
    totalAmount: -65000000,
    calculationSteps: [
      { step: 1, description: '子公司A资本公积（持股80%）', amount: -16000000, formula: '20,000,000 × 80%' },
      { step: 2, description: '子公司B资本公积（持股70%）', amount: -10500000, formula: '15,000,000 × 70%' },
      { step: 3, description: '子公司C资本公积（持股100%）', amount: -30000000, formula: '30,000,000 × 100%' },
      { step: 4, description: '收购溢价调整', amount: -8500000, formula: '合并价差调整' },
    ],
    vouchers: [
      { id: 'EQ-202603-004', type: '权益抵销凭证', date: '2026-03-31', amount: -16000000, description: '抵销子公司A资本公积', counterparty: '子公司A' },
      { id: 'EQ-202603-005', type: '权益抵销凭证', date: '2026-03-31', amount: -10500000, description: '抵销子公司B资本公积', counterparty: '子公司B' },
      { id: 'EQ-202603-006', type: '权益抵销凭证', date: '2026-03-31', amount: -38500000, description: '抵销子公司C资本公积及收购溢价', counterparty: '子公司C' },
    ],
    explanation: '抵销子公司资本公积中归属于母公司的部分，以及收购时产生的合并价差调整。',
  },
  {
    id: 'SURPLUS-debit-001',
    itemName: '盈余公积',
    fieldType: 'debit',
    totalAmount: -47000000,
    calculationSteps: [
      { step: 1, description: '子公司A盈余公积（持股80%）', amount: -12000000, formula: '15,000,000 × 80%' },
      { step: 2, description: '子公司B盈余公积（持股70%）', amount: -8400000, formula: '12,000,000 × 70%' },
      { step: 3, description: '子公司C盈余公积（持股100%）', amount: -20000000, formula: '20,000,000 × 100%' },
      { step: 4, description: '年初未分配利润调整', amount: -6600000, formula: '上年结转调整' },
    ],
    vouchers: [
      { id: 'EQ-202603-007', type: '权益抵销凭证', date: '2026-03-31', amount: -12000000, description: '抵销子公司A盈余公积', counterparty: '子公司A' },
      { id: 'EQ-202603-008', type: '权益抵销凭证', date: '2026-03-31', amount: -8400000, description: '抵销子公司B盈余公积', counterparty: '子公司B' },
      { id: 'EQ-202603-009', type: '权益抵销凭证', date: '2026-03-31', amount: -26600000, description: '抵销子公司C盈余公积及期初调整', counterparty: '子公司C' },
    ],
    explanation: '抵销子公司盈余公积中归属于母公司的部分，以及年初未分配利润的调整事项。',
  },
  {
    id: 'MI-001',
    itemName: '少数股东权益',
    fieldType: 'minorityInterest',
    totalAmount: 65057000,
    calculationSteps: [
      { step: 1, description: '子公司A少数股东权益（20%）', amount: 20000000, formula: '子公司A净资产100,000,000 × 20%' },
      { step: 2, description: '子公司B少数股东权益（30%）', amount: 24000000, formula: '子公司B净资产80,000,000 × 30%' },
      { step: 3, description: '子公司C少数股东权益（0%，全资子公司）', amount: 21057000, formula: '当期新增少数股东权益' },
      { step: 4, description: '少数股东损益调整', amount: 0, formula: '当期损益按持股比例分配' },
    ],
    vouchers: [
      { id: 'MI-202603-001', type: '少数股东权益凭证', date: '2026-03-31', amount: 20000000, description: '子公司A少数股东权益', counterparty: '子公司A外部股东' },
      { id: 'MI-202603-002', type: '少数股东权益凭证', date: '2026-03-31', amount: 24000000, description: '子公司B少数股东权益', counterparty: '子公司B外部股东' },
      { id: 'MI-202603-003', type: '少数股东权益凭证', date: '2026-03-31', amount: 21057000, description: '子公司C少数股东权益变动', counterparty: '子公司C外部股东' },
    ],
    explanation: '计算非全资子公司中归属于外部少数股东的权益部分，子公司A持股80%、子公司B持股70%，剩余部分为少数股东权益。',
  },
];

export const accountMappings: AccountMapping[] = [
  { id: 1, parent_account_id: 2, parent_account_code: '1001', parent_account_name: '库存现金', org_id: 2, org_name: '子公司A', subsidiary_account_code: '1001', subsidiary_account_name: '库存现金', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 2, parent_account_id: 3, parent_account_code: '1002', parent_account_name: '银行存款', org_id: 2, org_name: '子公司A', subsidiary_account_code: '1002', subsidiary_account_name: '银行存款', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 3, parent_account_id: 3, parent_account_code: '1002', parent_account_name: '银行存款', org_id: 2, org_name: '子公司A', subsidiary_account_code: '100201', subsidiary_account_name: '基本存款账户', mapping_type: 'split', status: 'active', effective_date: '2026-01-01' },
  { id: 4, parent_account_id: 3, parent_account_code: '1002', parent_account_name: '银行存款', org_id: 2, org_name: '子公司A', subsidiary_account_code: '100202', subsidiary_account_name: '一般存款账户', mapping_type: 'split', status: 'active', effective_date: '2026-01-01' },
  { id: 5, parent_account_id: 10, parent_account_code: '1122', parent_account_name: '应收账款', org_id: 3, org_name: '子公司B', subsidiary_account_code: '1122', subsidiary_account_name: '应收款', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 6, parent_account_id: 16, parent_account_code: '1405', parent_account_name: '库存商品', org_id: 3, org_name: '子公司B', subsidiary_account_code: '1403', subsidiary_account_name: '原材料', mapping_type: 'summary', status: 'active', effective_date: '2026-01-01' },
  { id: 7, parent_account_id: 16, parent_account_code: '1405', parent_account_name: '库存商品', org_id: 3, org_name: '子公司B', subsidiary_account_code: '1405', subsidiary_account_name: '库存商品', mapping_type: 'summary', status: 'active', effective_date: '2026-01-01' },
  { id: 8, parent_account_id: 18, parent_account_code: '1601', parent_account_name: '固定资产', org_id: 4, org_name: '子公司C', subsidiary_account_code: '1501', subsidiary_account_name: '固定资产原值', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 9, parent_account_id: 19, parent_account_code: '1602', parent_account_name: '累计折旧', org_id: 4, org_name: '子公司C', subsidiary_account_code: '1502', subsidiary_account_name: '累计折旧', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 10, parent_account_id: 22, parent_account_code: '2001', parent_account_name: '短期借款', org_id: 2, org_name: '子公司A', subsidiary_account_code: '2001', subsidiary_account_name: '短期贷款', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 11, parent_account_id: 24, parent_account_code: '2202', parent_account_name: '应付账款', org_id: 3, org_name: '子公司B', subsidiary_account_code: '2202', subsidiary_account_name: '应付款', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 12, parent_account_id: 32, parent_account_code: '3001', parent_account_name: '实收资本', org_id: 2, org_name: '子公司A', subsidiary_account_code: '3001', subsidiary_account_name: '股本', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 13, parent_account_id: 38, parent_account_code: '6001', parent_account_name: '主营业务收入', org_id: 4, org_name: '子公司C', subsidiary_account_code: '6001', subsidiary_account_name: '销售收入', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
  { id: 14, parent_account_id: 41, parent_account_code: '6401', parent_account_name: '主营业务成本', org_id: 4, org_name: '子公司C', subsidiary_account_code: '6401', subsidiary_account_name: '销售成本', mapping_type: 'direct', status: 'active', effective_date: '2026-01-01' },
];

export const trendData = {
  revenue: [
    { period: '2026-01', value: 28000 },
    { period: '2026-02', value: 31000 },
    { period: '2026-03', value: 38000 },
    { period: '2026-04', value: 42000 },
    { period: '2026-05', value: 45000 },
    { period: '2026-06', value: 52000 },
  ],
  profit: [
    { period: '2026-01', value: 3200 },
    { period: '2026-02', value: 3800 },
    { period: '2026-03', value: 4500 },
    { period: '2026-04', value: 5200 },
    { period: '2026-05', value: 5800 },
    { period: '2026-06', value: 6500 },
  ],
  assets: [
    { name: '货币资金', value: 35.8 },
    { name: '应收账款', value: 15.7 },
    { name: '存货', value: 12.6 },
    { name: '固定资产', value: 26.7 },
    { name: '无形资产', value: 6.2 },
    { name: '商誉', value: 1.6 },
  ],
  liability: [
    { name: '应付账款', value: 24.2 },
    { name: '长期借款', value: 75.8 },
  ],
  organizationComparison: [
    { name: '集团总部', revenue: 20000, profit: 8500 },
    { name: '子公司A', revenue: 8000, profit: 2800 },
    { name: '子公司B', revenue: 6000, profit: 2100 },
    { name: '子公司C', revenue: 10900, profit: 3800 },
  ],
};
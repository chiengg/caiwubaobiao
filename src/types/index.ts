export interface Organization {
  id: number;
  code: string;
  name: string;
  credit_code: string;
  registered_address: string;
  currency_code: string;
  parent_id: number | null;
  is_consolidation: boolean;
  status: 'active' | 'inactive';
  children?: Organization[];
}

export interface Account {
  id: number;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'cost' | 'income' | 'expense';
  balance_direction: 'debit' | 'credit';
  level: number;
  parent_id: number | null;
  is_liquid: boolean;
  category: string;
  children?: Account[];
  mnemonic_code: string;
  status: 'active' | 'inactive';
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
}

export interface ExchangeRate {
  id: number;
  from_currency: string;
  to_currency: string;
  rate_type: 'spot' | 'average' | 'history' | 'period_end';
  rate: number;
  period: string;
  effective_date: string;
}

export interface Period {
  id: number;
  year: number;
  quarter: number;
  month: number;
  start_date: string;
  end_date: string;
  status: 'unopened' | 'opened' | 'closed' | 'locked';
  calendar_type: string;
}

export interface ConsolidationScope {
  id: number;
  name: string;
  description: string;
  items?: ScopeItem[];
}

export interface ScopeItem {
  id: number;
  scope_id: number;
  org_id: number;
  org_code: string;
  org_name: string;
  segment: string;
  share_ratio: number;
  consolidation_method: 'full' | 'proportionate' | 'equity';
  currency_code: string;
  inclusion_status: 'included' | 'excluded';
  effective_date: string;
}

export interface Equity {
  id: number;
  investor_id: number;
  investor_name: string;
  investee_id: number;
  investee_name: string;
  share_ratio: number;
  investment_cost: number;
  investment_date: string;
  goodwill: number;
}

export interface ReportData {
  id: number;
  org_id: number;
  org_name: string;
  period_id: number;
  report_type: 'balance_sheet' | 'income_statement' | 'cash_flow';
  account_id: number;
  account_code: string;
  account_name: string;
  amount: number;
  currency_code: string;
  version: 'draft' | 'review' | 'final';
}

export interface EliminationEntry {
  id: number;
  period_id: number;
  entry_type: 'equity' | 'intercompany' | 'inventory' | 'fixed_asset' | 'cash_flow';
  description: string;
  lines: EliminationLine[];
  created_at: string;
}

export interface EliminationLine {
  id: number;
  entry_id: number;
  account_id: number;
  account_code: string;
  account_name: string;
  debit_amount: number;
  credit_amount: number;
  org_id: number;
}

export interface User {
  id: number;
  username: string;
  real_name: string;
  email: string;
  phone: string;
  role: 'admin' | 'cfo' | 'consolidator' | 'analyst' | 'auditor' | 'subsidiary';
  status: 'active' | 'inactive';
}

export interface Permission {
  id: number;
  name: string;
  code: string;
  type: string;
  description: string;
}

export interface OperationLog {
  id: number;
  user_id: number;
  user_name: string;
  operation: string;
  module: string;
  content: string;
  ip_address: string;
  created_at: string;
}

export interface WorkflowTask {
  id: number;
  name: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignee: string;
  due_date: string;
  progress: number;
}

export interface FinancialIndicator {
  name: string;
  value: number;
  change: number;
  unit: string;
  category: 'solvency' | 'profitability' | 'operation' | 'growth';
}

export interface TrendData {
  period: string;
  value: number;
}

export interface ReportTemplate {
  id: number;
  name: string;
  type: 'legal' | 'management' | 'custom';
  category: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'overdue' | 'in_progress';
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface KPIData {
  title: string;
  value: string;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  children?: NavigationItem[];
}

export interface WorkPaperItem {
  item: string;
  parent: number;
  subsidiaryA: number;
  subsidiaryB: number;
  subsidiaryC: number;
  total: number;
  debit: number;
  credit: number;
  minorityInterest: number;
  consolidated: number;
}

export interface CalculationDetail {
  id: string;
  itemName: string;
  fieldType: 'debit' | 'credit' | 'minorityInterest';
  totalAmount: number;
  calculationSteps: {
    step: number;
    description: string;
    amount: number;
    formula?: string;
  }[];
  vouchers: {
    id: string;
    type: string;
    date: string;
    amount: number;
    description: string;
    counterparty?: string;
  }[];
  explanation: string;
}

export interface AccountMapping {
  id: number;
  parent_account_id: number;
  parent_account_code: string;
  parent_account_name: string;
  org_id: number;
  org_name: string;
  subsidiary_account_code: string;
  subsidiary_account_name: string;
  mapping_type: 'direct' | 'summary' | 'split';
  status: 'active' | 'inactive';
  effective_date: string;
}
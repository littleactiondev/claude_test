export interface SavingsProduct {
  id: string
  bankName: string
  productName: string
  interestRate: number // 기본 금리 (연 %)
  maxInterestRate: number // 최대 우대 금리 (연 %)
  minDeposit: number // 최소 납입 금액
  maxDeposit: number // 최대 납입 금액
  term: number // 기간 (개월)
  preferentialConditions: string[] // 우대 조건
  url?: string // 제휴 링크
}

export interface WindmillPlan {
  id: string
  startDate: Date
  monthlyDeposit: number
  product: SavingsProduct
  accounts: WindmillAccount[]
}

export interface WindmillAccount {
  accountNumber: number // 1번째, 2번째, ... 적금
  startDate: Date
  endDate: Date
  monthlyDeposit: number
  totalDeposit: number
  expectedInterest: number
  totalAmount: number
  status: 'active' | 'completed' | 'planned'
}

export interface SimulationResult {
  totalPrincipal: number // 총 원금
  totalInterest: number // 총 이자
  totalAmount: number // 원금 + 이자
  accounts: WindmillAccount[]
  monthlyMaturity: {
    month: number
    amount: number
  }[]
}

export interface UserPortfolio {
  userId?: string // 비회원은 undefined
  plans: WindmillPlan[]
  createdAt: Date
  updatedAt: Date
}

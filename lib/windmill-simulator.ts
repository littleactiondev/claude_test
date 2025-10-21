import { addMonths, format } from 'date-fns'
import type { SavingsProduct, WindmillAccount, SimulationResult } from '@/types'
import { calculateInterest } from './interest-calculator'

export interface WindmillSimulationParams {
  monthlyDeposit: number
  product: SavingsProduct
  startDate: Date
  numberOfAccounts: number // 12개 (일반적으로)
}

/**
 * 풍차돌리기 시뮬레이션
 * 매월 새로운 적금을 개설하고, 12개월 후부터 매월 만기가 도래
 */
export function simulateWindmill(params: WindmillSimulationParams): SimulationResult {
  const { monthlyDeposit, product, startDate, numberOfAccounts } = params
  const accounts: WindmillAccount[] = []

  // 각 적금 계좌 생성
  for (let i = 0; i < numberOfAccounts; i++) {
    const accountStartDate = addMonths(startDate, i)
    const accountEndDate = addMonths(accountStartDate, product.term)

    // 이자 계산
    const interestResult = calculateInterest({
      monthlyDeposit,
      annualRate: product.maxInterestRate, // 우대 금리 적용
      months: product.term,
    })

    accounts.push({
      accountNumber: i + 1,
      startDate: accountStartDate,
      endDate: accountEndDate,
      monthlyDeposit,
      totalDeposit: interestResult.totalDeposit,
      expectedInterest: interestResult.interest,
      totalAmount: interestResult.totalAmount,
      status: i === 0 ? 'active' : 'planned',
    })
  }

  // 총계 계산
  const totalPrincipal = accounts.reduce((sum, acc) => sum + acc.totalDeposit, 0)
  const totalInterest = accounts.reduce((sum, acc) => sum + acc.expectedInterest, 0)
  const totalAmount = totalPrincipal + totalInterest

  // 월별 만기 금액 (12개월 후부터)
  const monthlyMaturity = accounts.map((acc, index) => ({
    month: index + product.term,
    amount: acc.totalAmount,
  }))

  return {
    totalPrincipal,
    totalInterest,
    totalAmount,
    accounts,
    monthlyMaturity,
  }
}

/**
 * 풍차돌리기 vs 일반 적금 비교
 */
export function compareWindmillVsRegular(params: WindmillSimulationParams) {
  const windmill = simulateWindmill(params)

  // 일반 적금 (한 번에 12개월 납입)
  const regularInterest = calculateInterest({
    monthlyDeposit: params.monthlyDeposit * params.numberOfAccounts,
    annualRate: params.product.maxInterestRate,
    months: params.product.term,
  })

  return {
    windmill,
    regular: regularInterest,
    windmillAdvantages: {
      monthlyLiquidity: true, // 매월 현금 유동성
      continuousInterest: true, // 지속적인 이자 수익
      riskDiversification: true, // 중도 해지 리스크 분산
    },
    interestDifference: windmill.totalInterest - regularInterest.interest,
  }
}

/**
 * 특정 월의 상태 계산
 */
export function getAccountStatusAtMonth(
  accounts: WindmillAccount[],
  monthsFromStart: number,
  startDate: Date
): {
  activeAccounts: WindmillAccount[]
  maturedAccounts: WindmillAccount[]
  plannedAccounts: WindmillAccount[]
  monthlyMaturityAmount: number
} {
  const currentDate = addMonths(startDate, monthsFromStart)

  const activeAccounts: WindmillAccount[] = []
  const maturedAccounts: WindmillAccount[] = []
  const plannedAccounts: WindmillAccount[] = []
  let monthlyMaturityAmount = 0

  accounts.forEach(account => {
    if (currentDate < account.startDate) {
      plannedAccounts.push(account)
    } else if (currentDate >= account.endDate) {
      maturedAccounts.push(account)
      // 이번 달에 만기되었는지 확인
      const monthDiff =
        account.endDate.getFullYear() * 12 + account.endDate.getMonth() -
        (currentDate.getFullYear() * 12 + currentDate.getMonth())
      if (monthDiff === 0) {
        monthlyMaturityAmount += account.totalAmount
      }
    } else {
      activeAccounts.push(account)
    }
  })

  return {
    activeAccounts,
    maturedAccounts,
    plannedAccounts,
    monthlyMaturityAmount,
  }
}

/**
 * 연간 이자 수익 계산
 */
export function calculateAnnualReturn(simulation: SimulationResult, year: number): number {
  const startMonth = (year - 1) * 12
  const endMonth = year * 12

  return simulation.monthlyMaturity
    .filter(m => m.month >= startMonth && m.month < endMonth)
    .reduce((sum, m) => sum + m.amount, 0)
}

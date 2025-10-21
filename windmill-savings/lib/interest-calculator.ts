/**
 * 적금 이자 계산기
 * 월 복리 방식으로 계산
 */

export interface InterestCalculationParams {
  monthlyDeposit: number // 월 납입액
  annualRate: number // 연 이자율 (%)
  months: number // 납입 개월 수
}

export interface InterestResult {
  totalDeposit: number // 총 납입액
  interest: number // 이자
  totalAmount: number // 총 수령액
  effectiveRate: number // 실효 이자율
}

/**
 * 적금 이자 계산 (월 복리)
 * 공식: 원금 × (1 + 월이율)^납입횟수 + 원금 × (1 + 월이율)^(납입횟수-1) + ...
 */
export function calculateInterest(params: InterestCalculationParams): InterestResult {
  const { monthlyDeposit, annualRate, months } = params
  const monthlyRate = annualRate / 100 / 12 // 월 이율

  let totalAmount = 0

  // 각 월별 납입금에 대한 이자 계산
  for (let i = 0; i < months; i++) {
    const remainingMonths = months - i
    totalAmount += monthlyDeposit * Math.pow(1 + monthlyRate, remainingMonths)
  }

  const totalDeposit = monthlyDeposit * months
  const interest = totalAmount - totalDeposit
  const effectiveRate = (interest / totalDeposit) * 100

  return {
    totalDeposit,
    interest,
    totalAmount,
    effectiveRate,
  }
}

/**
 * 단리 방식 이자 계산 (비교용)
 */
export function calculateSimpleInterest(params: InterestCalculationParams): InterestResult {
  const { monthlyDeposit, annualRate, months } = params
  const totalDeposit = monthlyDeposit * months

  // 단리 공식: 원금 × 이율 × 기간
  // 적금의 경우 평균 예치 기간을 고려
  const averageMonths = (months + 1) / 2
  const interest = totalDeposit * (annualRate / 100) * (averageMonths / 12)

  const totalAmount = totalDeposit + interest
  const effectiveRate = (interest / totalDeposit) * 100

  return {
    totalDeposit,
    interest,
    totalAmount,
    effectiveRate,
  }
}

/**
 * 복리와 단리 비교
 */
export function compareInterestMethods(params: InterestCalculationParams) {
  const compound = calculateInterest(params)
  const simple = calculateSimpleInterest(params)

  return {
    compound,
    simple,
    difference: compound.interest - simple.interest,
    percentDifference: ((compound.interest - simple.interest) / simple.interest) * 100,
  }
}

/**
 * 목표 금액을 위한 월 납입액 계산
 */
export function calculateMonthlyDepositForTarget(
  targetAmount: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 100 / 12

  let sum = 0
  for (let i = 0; i < months; i++) {
    const remainingMonths = months - i
    sum += Math.pow(1 + monthlyRate, remainingMonths)
  }

  return targetAmount / sum
}

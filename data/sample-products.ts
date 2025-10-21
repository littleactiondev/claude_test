import type { SavingsProduct } from '@/types'

/**
 * 샘플 적금 상품 데이터
 * 실제 은행 API 연동 전까지 사용
 */
export const sampleProducts: SavingsProduct[] = [
  {
    id: '1',
    bankName: '카카오뱅크',
    productName: '플러스 박스 정기적금',
    interestRate: 3.0,
    maxInterestRate: 4.5,
    minDeposit: 10000,
    maxDeposit: 1000000,
    term: 12,
    preferentialConditions: [
      '카카오페이 월 5회 이상 이용',
      '이체 월 3회 이상',
      '자동이체 등록'
    ],
    url: 'https://www.kakaobank.com',
  },
  {
    id: '2',
    bankName: '토스뱅크',
    productName: '먼저 이자 받는 적금',
    interestRate: 3.5,
    maxInterestRate: 5.0,
    minDeposit: 10000,
    maxDeposit: 1000000,
    term: 12,
    preferentialConditions: [
      '토스 앱 로그인',
      '계좌 개설',
      '급여 이체'
    ],
    url: 'https://www.tossbank.com',
  },
  {
    id: '3',
    bankName: 'KB국민은행',
    productName: 'KB Star 정기적금',
    interestRate: 2.8,
    maxInterestRate: 4.2,
    minDeposit: 10000,
    maxDeposit: 2000000,
    term: 12,
    preferentialConditions: [
      'KB Star Banking 이용',
      '급여이체',
      '카드 실적'
    ],
    url: 'https://www.kbstar.com',
  },
  {
    id: '4',
    bankName: '신한은행',
    productName: '쏠편한 정기적금',
    interestRate: 3.2,
    maxInterestRate: 4.6,
    minDeposit: 10000,
    maxDeposit: 1500000,
    term: 12,
    preferentialConditions: [
      '신한 쏠(SOL) 가입',
      '체크카드 월 30만원 이상 사용',
      '자동이체 3건 이상'
    ],
    url: 'https://www.shinhan.com',
  },
  {
    id: '5',
    bankName: '하나은행',
    productName: '하나 원큐 적금',
    interestRate: 3.1,
    maxInterestRate: 4.4,
    minDeposit: 10000,
    maxDeposit: 1000000,
    term: 12,
    preferentialConditions: [
      '하나원큐 앱 이용',
      '급여이체',
      '카드 실적 월 50만원'
    ],
    url: 'https://www.hanabank.com',
  },
  {
    id: '6',
    bankName: '우리은행',
    productName: '우리 SUPER적금',
    interestRate: 2.9,
    maxInterestRate: 4.3,
    minDeposit: 10000,
    maxDeposit: 2000000,
    term: 12,
    preferentialConditions: [
      '우리WON뱅킹',
      '급여이체',
      '우리카드 실적'
    ],
    url: 'https://www.wooribank.com',
  },
  {
    id: '7',
    bankName: 'NH농협은행',
    productName: 'NH올원e적금',
    interestRate: 3.0,
    maxInterestRate: 4.5,
    minDeposit: 10000,
    maxDeposit: 1500000,
    term: 12,
    preferentialConditions: [
      '올원뱅크 이용',
      '농협카드 사용',
      '자동이체 등록'
    ],
    url: 'https://www.nonghyup.com',
  },
  {
    id: '8',
    bankName: 'IBK기업은행',
    productName: 'i-ONE 적금',
    interestRate: 2.7,
    maxInterestRate: 4.0,
    minDeposit: 10000,
    maxDeposit: 2000000,
    term: 12,
    preferentialConditions: [
      'i-ONE뱅크 가입',
      '급여이체',
      '체크카드 실적'
    ],
    url: 'https://www.ibk.co.kr',
  },
]

/**
 * 금리 높은 순으로 정렬
 */
export function getProductsSortedByRate(): SavingsProduct[] {
  return [...sampleProducts].sort((a, b) => b.maxInterestRate - a.maxInterestRate)
}

/**
 * 특정 은행의 상품 찾기
 */
export function getProductByBank(bankName: string): SavingsProduct[] {
  return sampleProducts.filter(p => p.bankName.includes(bankName))
}

/**
 * ID로 상품 찾기
 */
export function getProductById(id: string): SavingsProduct | undefined {
  return sampleProducts.find(p => p.id === id)
}

/**
 * 최소 납입액 기준으로 필터링
 */
export function filterByMinDeposit(maxBudget: number): SavingsProduct[] {
  return sampleProducts.filter(p => p.minDeposit <= maxBudget)
}

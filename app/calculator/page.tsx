'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateInterest, compareInterestMethods } from '@/lib/interest-calculator'
import { formatCurrency, formatPercent } from '@/lib/utils'

export default function CalculatorPage() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(300000)
  const [annualRate, setAnnualRate] = useState(4.5)
  const [months, setMonths] = useState(12)
  const [showComparison, setShowComparison] = useState(false)

  const compoundResult = calculateInterest({ monthlyDeposit, annualRate, months })
  const comparison = compareInterestMethods({ monthlyDeposit, annualRate, months })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">이자 계산기</h1>
          <p className="mt-4 text-lg text-gray-600">
            적금 이자를 정확하게 계산하고 복리 vs 단리를 비교해보세요
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>계산 조건</CardTitle>
                <CardDescription>
                  적금 조건을 입력하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly">월 납입액 (원)</Label>
                  <Input
                    id="monthly"
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">
                    {formatCurrency(monthlyDeposit)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">연 이자율 (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">
                    {formatPercent(annualRate)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="months">기간 (개월)</Label>
                  <Input
                    id="months"
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">
                    {months}개월
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowComparison(!showComparison)}
                    className="w-full"
                  >
                    {showComparison ? '복리만 보기' : '복리 vs 단리 비교'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>빠른 계산 예시</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMonthlyDeposit(100000)
                    setAnnualRate(4.0)
                    setMonths(12)
                  }}
                >
                  월 10만원 × 12개월 @ 4%
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMonthlyDeposit(300000)
                    setAnnualRate(4.5)
                    setMonths(12)
                  }}
                >
                  월 30만원 × 12개월 @ 4.5%
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMonthlyDeposit(500000)
                    setAnnualRate(5.0)
                    setMonths(12)
                  }}
                >
                  월 50만원 × 12개월 @ 5%
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>월복리 계산 결과</CardTitle>
                <CardDescription>
                  일반적인 적금 이자 계산 방식입니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">총 납입액</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {formatCurrency(compoundResult.totalDeposit)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-green-800">이자</p>
                    <p className="mt-1 text-2xl font-bold text-green-600">
                      {formatCurrency(compoundResult.interest)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-6">
                  <p className="text-sm text-blue-800">최종 수령액</p>
                  <p className="mt-2 text-4xl font-bold text-blue-600">
                    {formatCurrency(compoundResult.totalAmount)}
                  </p>
                  <p className="mt-2 text-sm text-blue-700">
                    실효 이자율: {formatPercent(compoundResult.effectiveRate)}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">월 이율</span>
                    <span className="font-medium">
                      {formatPercent(annualRate / 12)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 납입 횟수</span>
                    <span className="font-medium">{months}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">수익률</span>
                    <span className="font-medium text-green-600">
                      {formatPercent((compoundResult.interest / compoundResult.totalDeposit) * 100)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showComparison && (
              <Card>
                <CardHeader>
                  <CardTitle>복리 vs 단리 비교</CardTitle>
                  <CardDescription>
                    복리와 단리의 차이를 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-semibold">구분</div>
                      <div className="font-semibold text-center">복리</div>
                      <div className="font-semibold text-center">단리</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t pt-4">
                      <div className="text-sm text-gray-600">이자</div>
                      <div className="text-center font-medium text-blue-600">
                        {formatCurrency(comparison.compound.interest)}
                      </div>
                      <div className="text-center font-medium">
                        {formatCurrency(comparison.simple.interest)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t pt-4">
                      <div className="text-sm text-gray-600">수령액</div>
                      <div className="text-center font-medium text-blue-600">
                        {formatCurrency(comparison.compound.totalAmount)}
                      </div>
                      <div className="text-center font-medium">
                        {formatCurrency(comparison.simple.totalAmount)}
                      </div>
                    </div>

                    <div className="rounded-lg bg-green-50 p-4 mt-4">
                      <p className="text-sm font-semibold text-green-900">
                        복리가 단리보다 유리!
                      </p>
                      <p className="mt-1 text-2xl font-bold text-green-600">
                        +{formatCurrency(comparison.difference)}
                      </p>
                      <p className="mt-1 text-sm text-green-700">
                        약 {comparison.percentDifference.toFixed(2)}% 더 많음
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>💡 이자 계산 팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>복리 적금:</strong> 매월 납입하는 금액에 대해 각각 이자가 붙고, 그 이자에도 다시 이자가 붙는 방식입니다.
                </p>
                <p>
                  <strong>단리 적금:</strong> 원금에만 이자가 붙는 방식으로, 일반적으로 복리보다 불리합니다.
                </p>
                <p>
                  <strong>실효 이자율:</strong> 실제로 받는 이자를 원금으로 나눈 비율로, 연 이자율과 다릅니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>이자 계산 공식</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">월복리 계산</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      매월 납입하는 적금의 경우, 각 납입금에 대해 남은 기간만큼 이자가 붙습니다.
                    </p>
                    <div className="mt-2 rounded bg-gray-100 p-3 font-mono text-xs">
                      총액 = Σ(월납입액 × (1 + 월이율)^남은개월)
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">단리 계산</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      적금의 단리는 평균 예치 기간을 고려하여 계산합니다.
                    </p>
                    <div className="mt-2 rounded bg-gray-100 p-3 font-mono text-xs">
                      이자 = 총납입액 × 연이율 × (평균기간/12)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

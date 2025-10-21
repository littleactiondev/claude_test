'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sampleProducts } from '@/data/sample-products'
import { simulateWindmill } from '@/lib/windmill-simulator'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { format } from 'date-fns'
import type { SimulationResult } from '@/types'

export default function SimulatorPage() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(300000)
  const [selectedProductId, setSelectedProductId] = useState(sampleProducts[0].id)
  const [numberOfAccounts, setNumberOfAccounts] = useState(12)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const selectedProduct = sampleProducts.find(p => p.id === selectedProductId) || sampleProducts[0]

  const handleSimulate = () => {
    const simulation = simulateWindmill({
      monthlyDeposit,
      product: selectedProduct,
      startDate: new Date(),
      numberOfAccounts,
    })
    setResult(simulation)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">풍차돌리기 시뮬레이터</h1>
          <p className="mt-4 text-lg text-gray-600">
            적금 풍차돌리기로 얼마를 모을 수 있을까요? 지금 바로 시뮬레이션해보세요!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>시뮬레이션 설정</CardTitle>
                <CardDescription>
                  월 납입액과 적금 상품을 선택하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyDeposit">월 납입액</Label>
                  <Input
                    id="monthlyDeposit"
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    placeholder="300000"
                  />
                  <p className="text-sm text-gray-500">
                    {formatCurrency(monthlyDeposit)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfAccounts">적금 개수</Label>
                  <Input
                    id="numberOfAccounts"
                    type="number"
                    value={numberOfAccounts}
                    onChange={(e) => setNumberOfAccounts(Number(e.target.value))}
                    min="1"
                    max="24"
                  />
                  <p className="text-sm text-gray-500">
                    {numberOfAccounts}개의 적금을 운영합니다
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product">적금 상품</Label>
                  <select
                    id="product"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {sampleProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.bankName} - {product.productName} ({formatPercent(product.maxInterestRate)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900">선택한 상품 정보</h3>
                  <div className="mt-2 space-y-1 text-sm text-blue-800">
                    <p>은행: {selectedProduct.bankName}</p>
                    <p>상품명: {selectedProduct.productName}</p>
                    <p>기본금리: {formatPercent(selectedProduct.interestRate)}</p>
                    <p>최대금리: {formatPercent(selectedProduct.maxInterestRate)}</p>
                    <p>기간: {selectedProduct.term}개월</p>
                  </div>
                </div>

                <Button onClick={handleSimulate} className="w-full" size="lg">
                  시뮬레이션 시작
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>시뮬레이션 결과</CardTitle>
                    <CardDescription>
                      {numberOfAccounts}개월 후부터 매월 만기금을 받을 수 있습니다
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">총 납입액</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          {formatCurrency(result.totalPrincipal)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <p className="text-sm text-green-800">총 이자</p>
                        <p className="mt-1 text-2xl font-bold text-green-600">
                          {formatCurrency(result.totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-6">
                      <p className="text-sm text-blue-800">최종 수령액</p>
                      <p className="mt-2 text-4xl font-bold text-blue-600">
                        {formatCurrency(result.totalAmount)}
                      </p>
                      <p className="mt-2 text-sm text-blue-700">
                        실효 이자율:{' '}
                        {formatPercent((result.totalInterest / result.totalPrincipal) * 100)}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">월별 만기 금액</h3>
                      <p className="text-sm text-gray-600">
                        {numberOfAccounts}개월 후부터 매월 약{' '}
                        {formatCurrency(
                          result.accounts.length > 0 ? result.accounts[0].totalAmount : 0
                        )}
                        씩 만기
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>적금 계좌 상세</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.accounts.slice(0, 6).map((account) => (
                        <div
                          key={account.accountNumber}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div>
                            <p className="font-medium">
                              {account.accountNumber}번 적금
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(account.startDate, 'yyyy-MM-dd')} ~{' '}
                              {format(account.endDate, 'yyyy-MM-dd')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">
                              {formatCurrency(account.totalAmount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              이자 {formatCurrency(account.expectedInterest)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {result.accounts.length > 6 && (
                        <p className="text-center text-sm text-gray-500">
                          외 {result.accounts.length - 6}개 적금...
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-24 text-center">
                  <div className="text-6xl mb-4">🎡</div>
                  <p className="text-gray-500">
                    왼쪽에서 설정을 입력하고 시뮬레이션 버튼을 눌러주세요
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>풍차돌리기란?</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-gray-900">💡 개념</h3>
                  <p className="text-gray-600">
                    매월 새로운 12개월 적금을 개설하여, 12개월 후부터는 매월 한 개씩 적금이 만기되도록 하는 전략입니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">✅ 장점</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>매월 현금 유동성 확보</li>
                    <li>중도 해지 리스크 분산</li>
                    <li>지속적인 이자 수익</li>
                    <li>복리 효과 극대화</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

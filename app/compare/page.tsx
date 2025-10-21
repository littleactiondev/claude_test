'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { sampleProducts, getProductsSortedByRate } from '@/data/sample-products'
import { formatCurrency, formatPercent } from '@/lib/utils'
import Link from 'next/link'

export default function ComparePage() {
  const [sortBy, setSortBy] = useState<'rate' | 'bank'>('rate')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const products = sortBy === 'rate' ? getProductsSortedByRate() : sampleProducts

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const selectedProductDetails = selectedProducts.map(id =>
    sampleProducts.find(p => p.id === id)
  ).filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">적금 상품 비교</h1>
          <p className="mt-4 text-lg text-gray-600">
            최고 금리 12개월 적금 상품을 한눈에 비교하세요
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'rate' ? 'default' : 'outline'}
              onClick={() => setSortBy('rate')}
            >
              금리순
            </Button>
            <Button
              variant={sortBy === 'bank' ? 'default' : 'outline'}
              onClick={() => setSortBy('bank')}
            >
              은행순
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {selectedProducts.length > 0 && (
              <span>{selectedProducts.length}개 선택됨</span>
            )}
          </div>
        </div>

        {/* Selected Products Comparison */}
        {selectedProductDetails.length > 0 && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>선택한 상품 비교</CardTitle>
                <CardDescription>
                  최대 3개까지 선택하여 비교할 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 text-left">항목</th>
                        {selectedProductDetails.map(product => (
                          <th key={product!.id} className="py-3 text-left">
                            {product!.bankName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-medium">상품명</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3">
                            {product!.productName}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b bg-blue-50">
                        <td className="py-3 font-medium">최대 우대금리</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3 font-bold text-blue-600">
                            {formatPercent(product!.maxInterestRate)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-medium">기본금리</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3">
                            {formatPercent(product!.interestRate)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-medium">최소 납입액</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3">
                            {formatCurrency(product!.minDeposit)}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-medium">최대 납입액</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3">
                            {formatCurrency(product!.maxDeposit)}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">우대 조건</td>
                        {selectedProductDetails.map(product => (
                          <td key={product!.id} className="py-3">
                            <ul className="list-disc list-inside text-sm">
                              {product!.preferentialConditions.slice(0, 3).map((condition, idx) => (
                                <li key={idx}>{condition}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const isSelected = selectedProducts.includes(product.id)
            const rank = sortBy === 'rate' ? index + 1 : null

            return (
              <Card
                key={product.id}
                className={`relative transition-all ${
                  isSelected ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {rank && rank <= 3 && (
                  <div className="absolute -top-3 -right-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
                      rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {rank}위
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{product.bankName}</CardTitle>
                      <CardDescription>{product.productName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="text-sm text-blue-800">최대 우대금리</div>
                    <div className="mt-1 text-3xl font-bold text-blue-600">
                      {formatPercent(product.maxInterestRate)}
                    </div>
                    <div className="mt-1 text-sm text-blue-700">
                      기본 {formatPercent(product.interestRate)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">납입 한도</span>
                      <span className="font-medium">
                        {(product.minDeposit / 10000).toFixed(0)}만원 ~{' '}
                        {(product.maxDeposit / 10000).toFixed(0)}만원
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">기간</span>
                      <span className="font-medium">{product.term}개월</span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">우대 조건</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {product.preferentialConditions.slice(0, 2).map((condition, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{condition}</span>
                        </li>
                      ))}
                      {product.preferentialConditions.length > 2 && (
                        <li className="text-gray-400">
                          +{product.preferentialConditions.length - 2}개 더
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={() => toggleProductSelection(product.id)}
                      className="flex-1"
                      disabled={!isSelected && selectedProducts.length >= 3}
                    >
                      {isSelected ? '선택됨' : '비교하기'}
                    </Button>
                    <Link href={`/simulator?product=${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        시뮬레이션
                      </Button>
                    </Link>
                  </div>

                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm text-blue-600 hover:underline"
                    >
                      상품 가입하기 →
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>📌 적금 선택 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-gray-900">우대금리 확인</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    우대 조건을 충족할 수 있는지 먼저 확인하세요. 기본금리보다 우대금리가 중요합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">납입 한도</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    월 납입 가능 금액이 적금 한도 내에 있는지 확인하세요.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">은행 편의성</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    주거래 은행을 활용하면 우대금리 혜택을 더 쉽게 받을 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

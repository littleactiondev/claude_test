import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProductsSortedByRate } from '@/data/sample-products'
import { formatPercent } from '@/lib/utils'

export default function HomePage() {
  const topProducts = getProductsSortedByRate().slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              적금 풍차돌리기로
              <br />
              <span className="text-blue-600">이자소득을 극대화</span>하세요
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              매월 적금을 개설하고 만기를 분산시켜 유동성과 수익을 동시에! <br />
              실시간 적금 비교와 시뮬레이션으로 똑똑한 자산관리를 시작하세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/simulator">
                <Button size="lg" className="text-base">
                  무료로 시뮬레이션 시작하기
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline" size="lg" className="text-base">
                  적금 상품 비교하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              풍차만의 특별한 기능
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              복잡한 계산은 저희가, 현명한 선택은 당신이
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🎡</div>
                <CardTitle>풍차돌리기 시뮬레이터</CardTitle>
                <CardDescription>
                  12개 적금을 돌리면 얼마의 이자를 받을 수 있을까요? 실시간으로 확인하세요.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🧮</div>
                <CardTitle>정교한 이자 계산</CardTitle>
                <CardDescription>
                  복리 vs 단리, 정확한 이자 계산으로 최적의 전략을 찾아드립니다.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle>실시간 상품 비교</CardTitle>
                <CardDescription>
                  8개 주요 은행의 12개월 적금 상품을 한눈에 비교하세요.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">📅</div>
                <CardTitle>만기일 관리</CardTitle>
                <CardDescription>
                  내 적금 포트폴리오를 한눈에! 언제 얼마가 만기되는지 확인하세요.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              이달의 추천 적금 상품
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              최고 금리 적금 상품을 확인하고 바로 가입하세요
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {topProducts.map((product, index) => (
              <Card key={product.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                      🏆 1위
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{product.bankName}</CardTitle>
                  <CardDescription>{product.productName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPercent(product.maxInterestRate)}
                    </div>
                    <div className="text-sm text-gray-500">최대 우대금리</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">
                      기본금리: {formatPercent(product.interestRate)}
                    </div>
                    <div className="text-gray-600">
                      월 {(product.minDeposit / 10000).toFixed(0)}만원 ~{' '}
                      {(product.maxDeposit / 10000).toFixed(0)}만원
                    </div>
                  </div>
                  <Link href={`/compare?product=${product.id}`}>
                    <Button className="mt-4 w-full" variant="outline">
                      자세히 보기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/compare">
              <Button variant="outline" size="lg">
                모든 상품 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              풍차돌리기, 이렇게 시작하세요
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">시뮬레이션</h3>
                <p className="mt-2 text-gray-600">
                  월 납입액과 목표 금액을 입력하고 예상 수익을 확인하세요
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">상품 선택</h3>
                <p className="mt-2 text-gray-600">
                  최고 금리 적금 상품을 비교하고 본인에게 맞는 상품을 선택하세요
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">가입 & 관리</h3>
                <p className="mt-2 text-gray-600">
                  매월 적금을 개설하고 포트폴리오 대시보드로 관리하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              회원가입 없이도 모든 기능을 무료로 이용할 수 있습니다
            </p>
            <div className="mt-8">
              <Link href="/simulator">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

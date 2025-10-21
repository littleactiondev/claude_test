export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <span className="text-xl font-bold text-blue-600">💨 풍차</span>
            <p className="mt-2 text-sm text-gray-600">
              적금 풍차돌리기로 이자소득을 극대화하세요
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">서비스</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/simulator" className="text-sm text-gray-600 hover:text-gray-900">
                  풍차돌리기 시뮬레이터
                </a>
              </li>
              <li>
                <a href="/calculator" className="text-sm text-gray-600 hover:text-gray-900">
                  이자 계산기
                </a>
              </li>
              <li>
                <a href="/compare" className="text-sm text-gray-600 hover:text-gray-900">
                  적금 비교
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">제휴 은행</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600">카카오뱅크</li>
              <li className="text-sm text-gray-600">토스뱅크</li>
              <li className="text-sm text-gray-600">KB국민은행</li>
              <li className="text-sm text-gray-600">신한은행</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">회사</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  이용약관
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400">
            © 2025 풍차. All rights reserved. | 금융상품 가입 시 예금자보호법에 따라 예금보험공사가 보호합니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

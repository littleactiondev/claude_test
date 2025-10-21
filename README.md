# 💨 풍차 - 적금 풍차돌리기 플랫폼

적금 풍차돌리기로 이자소득을 극대화하세요! 실시간 적금 비교와 시뮬레이션으로 똑똑한 자산관리를 시작할 수 있는 웹 플랫폼입니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/littleactiondev/claude_test/tree/claude/placeholder-branch-011CUL972rzgAPUmHGxetEbF/windmill-savings)

## ✨ 주요 기능

### 🎡 풍차돌리기 시뮬레이터
- 월 납입액과 적금 상품을 선택하여 예상 수익 계산
- 12개 적금 계좌의 만기 일정 및 수령액 확인
- 실시간 이자 계산 (월복리 방식)

### 🧮 이자 계산기
- 정교한 복리 이자 계산
- 복리 vs 단리 비교 분석
- 실효 이자율 자동 계산

### 📊 적금 상품 비교
- 8개 주요 은행의 12개월 적금 상품 한눈에 비교
- 최고 금리순 정렬
- 최대 3개 상품 선택하여 상세 비교
- 우대 조건 및 납입 한도 표시

### 📅 포트폴리오 관리 (개발 예정)
- 내 적금 포트폴리오 대시보드
- 만기일 알림
- 자산 증식 리포트

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: 커스텀 컴포넌트 (Button, Card, Input 등)
- **State Management**: React Hooks

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
windmill-savings/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 홈페이지
│   ├── simulator/         # 풍차돌리기 시뮬레이터
│   ├── compare/           # 적금 상품 비교
│   └── calculator/        # 이자 계산기
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── navigation.tsx    # 네비게이션 바
│   └── footer.tsx        # 푸터
├── lib/                   # 비즈니스 로직
│   ├── interest-calculator.ts    # 이자 계산 엔진
│   ├── windmill-simulator.ts     # 풍차돌리기 시뮬레이션
│   └── utils.ts                  # 유틸리티 함수
├── data/                  # 데이터
│   └── sample-products.ts        # 샘플 적금 상품 (추후 API 연동)
└── types/                 # TypeScript 타입 정의
    └── index.ts
```

## 💡 풍차돌리기란?

매월 새로운 12개월 적금을 개설하여, 12개월 후부터는 매월 한 개씩 적금이 만기되도록 하는 자산관리 전략입니다.

**장점:**
- ✅ 매월 현금 유동성 확보
- ✅ 중도 해지 리스크 분산
- ✅ 지속적인 이자 수익
- ✅ 복리 효과 극대화

## 💰 비즈니스 모델

1. **제휴 마케팅**: 은행 적금 가입 시 제휴 수수료 (CPA)
2. **프리미엄 구독**: 고급 분석, 알림, 무제한 포트폴리오 (개발 예정)
3. **광고**: 금융 관련 배너 광고
4. **데이터 리포트**: 월간 자산 증식 리포트 PDF (개발 예정)

## 🔮 향후 계획

- [ ] NextAuth.js 인증 시스템 구현
- [ ] Prisma + PostgreSQL 데이터베이스 연동
- [ ] 사용자 포트폴리오 관리 대시보드
- [ ] 금융감독원 API 연동 (실시간 적금 상품 데이터)
- [ ] 만기일 푸시 알림
- [ ] Recharts 차트 시각화
- [ ] PDF 리포트 생성 기능
- [ ] 모바일 앱 (React Native)

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

---

**Made with ❤️ by Claude Code**

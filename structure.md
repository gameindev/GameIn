src/
├── app/
│   ├── providers/            # Contexts, global stores (e.g., Redux, Zustand, Recoil)
│   ├── router/               # Routing config and guards
│   ├── hooks/                # Global React hooks (auth, theme, etc.)
│   ├── store/                # Global state slices (if using Redux Toolkit)
│   ├── services/             # Global API clients or utilities (Axios, fetch interceptors)
│   ├── config/               # Environment configs, constants
│   ├── App.tsx
│   └── index.tsx
│
├── features/                 # 🔥 Core: feature (domain)-based separation
│   ├── auth/
│   │   ├── api/              # API services (e.g., login, register)
│   │   ├── components/       # UI components
│   │   ├── hooks/            # Feature-specific custom hooks
│   │   ├── store/            # Local feature store (Redux slice/Zustand atom)
│   │   ├── pages/            # Route-level views (LoginPage, RegisterPage)
│   │   ├── types/            # DTOs, interfaces
│   │   └── index.ts
│   │
│   ├── profile/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── pages/
│   │   └── types/
│   │
│   └── leaderboard/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       ├── pages/
│       └── types/
│
├── shared/                   # ♻️ Cross-feature reusable code
│   ├── components/           # UI atoms/molecules (Buttons, Inputs, Modals)
│   ├── hooks/                # Shared hooks (useFetch, useDebounce)
│   ├── utils/                # Helpers and formatters
│   ├── constants/            # Shared constants/enums
│   ├── types/                # Global types/interfaces
│   └── styles/               # Theme, typography, global styles
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/

/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        // NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string
        REACT_APP_FIREBASE_API_KEY: string
        REACT_APP_AUTH_DOMAIN: string
        REACT_APP_DATABASE_URL: string
        REACT_APP_PROJECT_ID: string
        REACT_APP_STORAGE_BUCKET: string
        REACT_APP_MESSAGING_SENDER_ID: string
        REACT_APP_APP_ID: string
        REACT_APP_MEASUREMENT_ID: string
    }
}

export type AppConfig = {
  nodeEnv: string
  name: string
  port: number
  workingDirectory: string
  fontendDomain?: string
  backendDomain: string
  apiPrefix: string
  appApiVersion: string
  fallbackLanguage: string
  headerLanguage: string
}

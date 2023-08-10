export interface Billing {
  id: string
  customerId: string
  monthlyCredits: number
  usedCredits: number
  additionalCredits: number
  remainingCredits: number
  debtLimit: number
}

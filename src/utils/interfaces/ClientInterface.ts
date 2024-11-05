/* eslint-disable @typescript-eslint/no-explicit-any */
interface Item {
  id: string,
  name: string,
  quantity: number, 
}

interface Subscription {
  id_stripe_subscription: string,
  status: string,
  payment_status: string,
  collection_method: string,
  current_period_end: string,
  current_period_start: string,
  trial_start: number,
  trial_end: number,
  created: number,
  collection_metod: string,
  days_until_due: any,
  items: Item[],
  payment_method_type: string,
  default_payment_method: string,
  latest_invoice: string,
  start_date: number,
  latest_payment_status: string,
  total_spent: number,
}

interface Client {
  id_client: string,
  id_stripe_customer: string,
  name: string,
  email: string,
  rfce: string,
  address: string,
  status: boolean,
  company_name: string,
  units: any[],
  billing_ammount: number,
  subscription: Subscription,
}

interface ClientResponse {
  data: Client[],
  meta: {
    total_records: number,
    current_page: number, 
    total_pages: number,
  }
}


export type { Client, ClientResponse }
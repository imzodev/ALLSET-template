import type { SupabaseClient } from '@supabase/supabase-js'
import { IEmailModel } from '../../models/email'
import { EMAILS_TABLE } from '../../constants'
import type { Email } from '../../models/email'

export class SupabaseEmailModel implements IEmailModel {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async getAll(): Promise<Email[]> {
    const { data, error } = await this.supabase
      .from(EMAILS_TABLE)
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Supabase getAll error:', error)
      throw error
    }
    console.log('Supabase getAll data:', data)
    return data || []
  }

  async insert(email: string): Promise<void> {
    const { error, data } = await this.supabase.from(EMAILS_TABLE).insert([{ email }])
    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }
    console.log('Supabase insert data:', data)
  }

  async getCount(): Promise<number> {
    console.log('Supabase getCount')
    const { count, error, data } = await this.supabase
      .from(EMAILS_TABLE)
      .select('*', { count: 'exact', head: true })
    if (error) {
      console.error('Supabase getCount error:', error)
      throw error
    }
    console.log('Supabase getCount:', { count, data })
    return count || 0
  }

  async deleteEmail(id: number): Promise<void> {
    const { error } = await this.supabase.from(EMAILS_TABLE).delete().eq('id', id)
    if (error) {
      console.error('Supabase deleteEmail error:', error)
      throw error
    }
    console.log(`Supabase email with ID ${id} deleted successfully`)
  }
}

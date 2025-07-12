import type Database from 'better-sqlite3'
import { EMAILS_TABLE } from '../../constants'
import type { Email, IEmailModel } from '../../models/email'

export class SQLiteEmailModel implements IEmailModel {
  constructor(private db: Database) {}

  async getAll(): Promise<Email[]> {
    return this.db
      .prepare(`SELECT id, email, created_at FROM ${EMAILS_TABLE} ORDER BY created_at DESC`)
      .all()
  }
  async insert(email: string): Promise<void> {
    this.db.prepare(`INSERT INTO ${EMAILS_TABLE} (email) VALUES (?)`).run(email)
  }
  async getCount(): Promise<number> {
    const row = this.db.prepare(`SELECT COUNT(*) as count FROM ${EMAILS_TABLE}`).get()
    return typeof row.count === 'number' ? row.count : 0
  }

  async deleteEmail(id: number): Promise<void> {
    this.db.prepare(`DELETE FROM ${EMAILS_TABLE} WHERE id = ?`).run(id)
  }
}

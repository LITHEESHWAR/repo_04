const db = require('../config/db');

class FAQ {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM faqs');
    return rows;
  }

  static async create(question, answer, question_hi, question_bn) {
    const sql = 'INSERT INTO faqs (question, answer, question_hi, question_bn) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [question, answer, question_hi, question_bn]);
  }
}

module.exports = FAQ;

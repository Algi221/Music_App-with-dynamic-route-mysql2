import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'music_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Get all artists
export async function getAllArtists() {
  try {
    const [rows] = await pool.execute('SELECT * FROM artists ORDER BY name');
    return rows;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
}

// Get artist by slug
export async function getArtistBySlug(slug) {
  try {
    const [rows] = await pool.execute('SELECT * FROM artists WHERE slug = ?', [slug]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching artist:', error);
    throw error;
  }
}

// Get songs by artist slug
export async function getSongsByArtist(artistSlug) {
  try {
    const [rows] = await pool.execute(`
      SELECT s.*, a.name as artist_name, a.slug as artist_slug 
      FROM songs s 
      JOIN artists a ON s.artist_id = a.id 
      WHERE a.slug = ? 
      ORDER BY s.title
    `, [artistSlug]);
    return rows;
  } catch (error) {
    console.error('Error fetching songs by artist:', error);
    throw error;
  }
}

// Get song by slug
export async function getSongBySlug(slug) {
  try {
    const [rows] = await pool.execute(`
      SELECT s.*, a.name as artist_name, a.slug as artist_slug 
      FROM songs s 
      JOIN artists a ON s.artist_id = a.id 
      WHERE s.slug = ?
    `, [slug]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching song:', error);
    throw error;
  }
}

// Get all songs
export async function getAllSongs() {
  try {
    const [rows] = await pool.execute(`
      SELECT s.*, a.name as artist_name, a.slug as artist_slug 
      FROM songs s 
      JOIN artists a ON s.artist_id = a.id 
      ORDER BY s.title
    `);
    return rows;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
}

// Get random songs (for homepage)
export async function getRandomSongs(limit = 10) {
  try {
    const [rows] = await pool.execute(`
      SELECT s.*, a.name as artist_name, a.slug as artist_slug 
      FROM songs s 
      JOIN artists a ON s.artist_id = a.id 
      ORDER BY RAND() 
      LIMIT ?
    `, [limit]);
    return rows;
  } catch (error) {
    console.error('Error fetching random songs:', error);
    throw error;
  }
}

export default pool;

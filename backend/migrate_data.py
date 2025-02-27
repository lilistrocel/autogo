import sqlite3
import os

def migrate_data():
    # Connect to both databases
    old_conn = sqlite3.connect('sql_app.db.backup')
    new_conn = sqlite3.connect('sql_app.db')
    
    old_cur = old_conn.cursor()
    new_cur = new_conn.cursor()
    
    try:
        # Migrate users
        old_cur.execute('SELECT * FROM users')
        users = old_cur.fetchall()
        for user in users:
            new_cur.execute(
                'INSERT INTO users (id, email, hashed_password, is_active, is_superuser) VALUES (?, ?, ?, ?, ?)',
                user
            )
        
        # Migrate shops
        old_cur.execute('SELECT id, name, description, logo_url, owner_id, created_at, updated_at FROM shops')
        shops = old_cur.fetchall()
        for shop in shops:
            new_cur.execute(
                'INSERT INTO shops (id, name, description, logoUrl, ownerId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                shop
            )
        
        # Migrate products
        old_cur.execute('SELECT id, name, description, price, image_url, shop_id, created_at, updated_at FROM products')
        products = old_cur.fetchall()
        for product in products:
            new_cur.execute(
                'INSERT INTO products (id, name, description, price, imageUrl, shopId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                product
            )
        
        # Commit the changes
        new_conn.commit()
        print("Data migration completed successfully!")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        new_conn.rollback()
    
    finally:
        old_conn.close()
        new_conn.close()

if __name__ == '__main__':
    migrate_data() 
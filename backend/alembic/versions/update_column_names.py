"""update column names to camelcase

Revision ID: update_column_names
Revises: e0184480d3a0
Create Date: 2024-02-27

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'update_column_names'
down_revision = 'e0184480d3a0'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Rename columns in shops table
    op.alter_column('shops', 'logo_url', new_column_name='logoUrl')
    op.alter_column('shops', 'owner_id', new_column_name='ownerId')
    op.alter_column('shops', 'created_at', new_column_name='createdAt')
    op.alter_column('shops', 'updated_at', new_column_name='updatedAt')

    # Rename columns in products table
    op.alter_column('products', 'image_url', new_column_name='imageUrl')
    op.alter_column('products', 'shop_id', new_column_name='shopId')
    op.alter_column('products', 'created_at', new_column_name='createdAt')
    op.alter_column('products', 'updated_at', new_column_name='updatedAt')

def downgrade() -> None:
    # Revert columns in shops table
    op.alter_column('shops', 'logoUrl', new_column_name='logo_url')
    op.alter_column('shops', 'ownerId', new_column_name='owner_id')
    op.alter_column('shops', 'createdAt', new_column_name='created_at')
    op.alter_column('shops', 'updatedAt', new_column_name='updated_at')

    # Revert columns in products table
    op.alter_column('products', 'imageUrl', new_column_name='image_url')
    op.alter_column('products', 'shopId', new_column_name='shop_id')
    op.alter_column('products', 'createdAt', new_column_name='created_at')
    op.alter_column('products', 'updatedAt', new_column_name='updated_at') 
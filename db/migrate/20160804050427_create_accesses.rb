class CreateAccesses < ActiveRecord::Migration
  def change
    create_table :accesses do |t|
      t.integer :user_id
      t.integer :to_user_id
      t.datetime :last_access

      t.timestamps null: false
    end
  end
end

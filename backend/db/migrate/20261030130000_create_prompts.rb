class CreatePrompts < ActiveRecord::Migration[8.1]
  def change
    create_table :prompts do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :pinned, default: false, null: false
      t.boolean :is_public, default: true, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end

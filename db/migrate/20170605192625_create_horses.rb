class CreateHorses < ActiveRecord::Migration[5.1]
  def change
    create_table :horses do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.date :date, null: false
      t.string :image_url, null: false
      t.string :race

      t.timestamps
    end
  end
end

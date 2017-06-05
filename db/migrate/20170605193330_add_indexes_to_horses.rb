class AddIndexesToHorses < ActiveRecord::Migration[5.1]
  def change
    add_index :horses, :name
    add_index :horses, :date
    add_index :horses, :race
  end
end

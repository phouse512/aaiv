class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :focus_id
      t.date :focus_date
      t.string :topic
      t.integer :person_id
      t.integer :attendance

      t.timestamps
    end
  end
end

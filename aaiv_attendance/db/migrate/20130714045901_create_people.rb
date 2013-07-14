class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.integer :person_id
      t.string :firstname
      t.string :lastname
      t.string :dorm
      t.string :year
      t.date :focus_date

      t.timestamps
    end
  end
end

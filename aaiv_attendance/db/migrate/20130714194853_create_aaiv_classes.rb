class CreateAaivClasses < ActiveRecord::Migration
  def change
    create_table :aaiv_classes do |t|
      t.integer :graduationYear
      t.integer :person_id

      t.timestamps
    end
  end
end

class AddPhoneNoToPerson < ActiveRecord::Migration
  def change
    add_column :people, :phoneNo, :string
  end
end

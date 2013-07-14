class Person < ActiveRecord::Base
	has_one :aaiv_class
	has_many :events
end

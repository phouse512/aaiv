json.array!(@people) do |person|
  json.extract! person, :id, :firstname, :lastname, :dorm, :year, :focus_date
  json.url person_url(person, format: :json)
end

json.array!(@events) do |event|
  json.extract! event, :focus_id, :focus_date, :topic, :person_id, :attendance
  json.url event_url(event, format: :json)
end

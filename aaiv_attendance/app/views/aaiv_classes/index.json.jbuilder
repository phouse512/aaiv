json.array!(@aaiv_classes) do |aaiv_class|
  json.extract! aaiv_class, :graduationYear, :person
  json.url aaiv_class_url(aaiv_class, format: :json)
end

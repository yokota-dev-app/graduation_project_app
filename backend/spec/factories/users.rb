FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |number| "user#{number}@example.com" }
    password { "password123" }
  end
end

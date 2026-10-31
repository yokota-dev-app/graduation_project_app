FactoryBot.define do
  factory :prompt do
    association :user
    title { Faker::Lorem.sentence(word_count: 3) }
    description { Faker::Lorem.sentence }
    is_public { true }

    transient do
      content { Faker::Lorem.paragraph }
    end

    after(:build) do |prompt, evaluator|
      prompt.prompt_versions.build(version_number: 1, content: evaluator.content) if prompt.prompt_versions.empty?
    end
  end
end

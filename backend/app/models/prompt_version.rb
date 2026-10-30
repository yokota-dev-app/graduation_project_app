class PromptVersion < ApplicationRecord
  belongs_to :prompt

  validates :version_number, presence: true,
                             numericality: { only_integer: true, greater_than: 0 },
                             uniqueness: { scope: :prompt_id }
  validates :content, presence: true
end

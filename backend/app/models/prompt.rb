class Prompt < ApplicationRecord
  belongs_to :user
  has_many :prompt_versions, dependent: :destroy

  validates :title, presence: true
end

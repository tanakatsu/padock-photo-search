class Horse < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :date }
  validates :url, presence: true
  validates :date, presence: true
  validates :image_url, presence: true
  validates :race, presence: true
end

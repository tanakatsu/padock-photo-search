class Horse < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: [:date, :race] }
  validates :url, presence: true
  validates :date, presence: true
  validates :image_url, presence: true
  validates :race, presence: true

  paginates_per 20
end

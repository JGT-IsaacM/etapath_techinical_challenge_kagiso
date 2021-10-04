class Package < ApplicationRecord
  validates :reference_number, :location, :destination, presence: true
  belongs_to :user, optional: true
end

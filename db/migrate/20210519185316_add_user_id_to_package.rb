class AddUserIdToPackage < ActiveRecord::Migration[6.1]
  def change
    add_reference :packages, :user, foreign_key: true
    add_foreign_key :packages, :users
  end
end

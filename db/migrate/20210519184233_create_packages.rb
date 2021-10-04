class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.string :reference_number
      t.string :location
      t.string :destination
      t.date :date
      t.time :timeslot

      t.timestamps
    end
  end
end

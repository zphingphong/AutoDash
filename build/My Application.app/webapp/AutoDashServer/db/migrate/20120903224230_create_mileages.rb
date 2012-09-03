class CreateMileages < ActiveRecord::Migration
  def change
    create_table :mileages do |t|
      t.integer :start
      t.integer :end
      t.datetime :date

      t.timestamps
    end
  end
end

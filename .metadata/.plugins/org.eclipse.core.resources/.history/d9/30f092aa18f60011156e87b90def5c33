class Mileage < ActiveRecord::Base
  attr_accessible :date, :end, :start
  
  validates_presence_of :start
  validates_presence_of :end
  validates_presence_of :date
  validates_numericality_of :start
  validates_numericality_of :end
end

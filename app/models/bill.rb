class Bill < ActiveRecord::Base
  private
  def self.category
    order(:category).order(:created_at)
  end
  def self.created
    order(:created_at)
  end
end

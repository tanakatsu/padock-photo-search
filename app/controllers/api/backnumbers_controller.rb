module Api
  class BacknumbersController < ApplicationController
    def index
      year = params[:year].to_i
      limit = params[:limit].to_i

      horses = Horse.order("date DESC")
      backnumbers = horses.pluck(:date).uniq
      backnumbers = backnumbers.slice(0, limit) if limit > 0
      backnumbers = backnumbers.select { |bn| bn.year == year }

      render json: backnumbers.map { |bn| bn.strftime("%y%m%d") }
    end
  end
end

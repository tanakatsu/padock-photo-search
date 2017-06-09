module Api
  class HorsesController < ApplicationController
    def index
      name = params[:name]

      horses = if name.blank?
                 []
               else
                 Horse.where("name like ?", "%#{name}%").order("name, date DESC")
               end

      render json: horses
    end
  end
end

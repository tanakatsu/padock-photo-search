class SearchController < ApplicationController
  def index
  end

  def show_results
    @q = params[:q]
    @horses = if @q.blank?
      []
    else
      Horse.where("name like ?", "%#{@q}%").order("name, date DESC")
    end
  end
end

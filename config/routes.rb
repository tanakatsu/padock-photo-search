Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resource :search, only: [], controller: :search do
    collection do
      get :index
      get :show_results
    end
  end

  root to: 'search#index'
end

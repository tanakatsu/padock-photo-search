Rails.application.routes.draw do
  get 'react_app/index'
  get 'react_app/search' => 'react_app#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resource :search, only: [], controller: :search do
    collection do
      get :index
      get :show_results
    end
  end

  namespace 'api' do
    resources :horses, only: [:index]
    resources :backnumbers, only: [:index]
  end

  root to: 'search#index'
end

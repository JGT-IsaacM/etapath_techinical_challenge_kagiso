Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      #post 'user_token' => 'user_token#create'
      #devise_for :users
      resources :users
      resources :packages
      resources :sessions, only: [:create,:destroy]
      post '/profile', to: 'users#create'
      delete '/profile', to: "users#destroy"

      post '/sessions', to: 'sessions#create'
      delete '/sessions', to: 'sessions#destroy'

      post '/packages', to: "packages#create"
      put '/packages', to: 'packages#update'
    end
  end
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    #root to: "packages#index"
    
end

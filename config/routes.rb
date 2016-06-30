Rails.application.routes.draw do
  # 基本ルーティング
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    omniauth: 'users/omniauth',
    passwords: 'users/passwords',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
  }
  resources :users, only: [:show] do
    collection do
      get '/search', to: 'users#search'
    end
  end
  root 'messages#index'
  resources :messages, only: [:create]

  # APIルーティング
  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:index, :create]
    resources :users, only: [] do
      collection do
        get :search
      end
    end
  end
end

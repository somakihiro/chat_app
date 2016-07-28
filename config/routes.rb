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
  resources :friendships, only: [:create, :destroy]

  # APIルーティング
  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:index, :create] do
      collection do
        post :upload_image
      end
    end
    resources :users, only: [:index, :show] do
      collection do
        get :search
        # get :me
        # get :all
        # get :message
      end
    end
    # resources :friendships, only: [:index, :create]
    resources :current_user, only: [:index]
  end
end

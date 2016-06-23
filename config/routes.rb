Rails.application.routes.draw do
  # 基本ルーティング
  root 'messages#index'
  resources :messages, only: [:create]

  # APIルーティング
  namespace :api, defaults: { format: :json } do
    resources :messages, only: [:index, :create]
  end
end

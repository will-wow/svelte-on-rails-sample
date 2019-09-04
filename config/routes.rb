Rails.application.routes.draw do
  root to: "pages#root"
  get "/counter", to: "pages#counter"

  resources :contacts

  namespace :api do
    resources :contacts
  end
end

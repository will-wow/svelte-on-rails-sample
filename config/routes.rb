Rails.application.routes.draw do
  root to: "contacts#index"
  resources :contacts

  namespace :api do
    resources :contacts
  end
end

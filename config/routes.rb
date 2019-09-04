Rails.application.routes.draw do
  resources :contacts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "pages#root"
  get "/counter", to: "pages#counter"

  resources :contacts
end

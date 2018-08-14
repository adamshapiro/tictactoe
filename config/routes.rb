Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'board#index'
  match "*path", to: 'board#index', via: :all
end

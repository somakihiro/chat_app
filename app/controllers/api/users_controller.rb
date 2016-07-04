class Api::UsersController < ApplicationController
  def search
    @users = User.all
    render json: @users
  end
end